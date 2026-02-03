import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Check,
    BookOpen,
    Settings as SettingsIcon,
    Layers,
    Pencil,
    Trash2,
    CalendarIcon,
    Info
} from 'lucide-react';
import {
    getSins,
    getLastConfessionDate,
    setLastConfessionDate,
    getDaysSinceConfession,
    getShowReminder,
    deleteSin,
    restoreSin,
    toggleSinRepeated,
} from '../services/storage';
import { formatDate } from '../utils/date';
import { cn } from '@/lib/utils';
import type { Sin } from '../types';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

export function HomeScreen() {
    const [sins, setSins] = useState<Sin[]>([]);
    const [lastDate, setLastDate] = useState<string | null>(null);
    const [daysSince, setDaysSince] = useState<number | null>(null);
    const [showReminder, setShowReminder] = useState(true);
    const [calendarOpen, setCalendarOpen] = useState(false);
    const [lastDeleted, setLastDeleted] = useState<Sin | null>(null);
    const [showUndo, setShowUndo] = useState(false);
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
    const [showAbout, setShowAbout] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Load data on mount and focus
    const loadData = () => {
        setSins(getSins());
        setLastDate(getLastConfessionDate());
        setDaysSince(getDaysSinceConfession());
        setShowReminder(getShowReminder());
    };

    useEffect(() => {
        loadData();

        // Refresh when returning to screen
        const handleFocus = () => loadData();
        window.addEventListener('focus', handleFocus);
        return () => window.removeEventListener('focus', handleFocus);
    }, []);

    const handleDateChange = (newDate: string) => {
        if (newDate) {
            setLastConfessionDate(newDate);
            setLastDate(newDate);
            setDaysSince(getDaysSinceConfession());
        }
    };

    const handleToggleRepeated = (e: Event, id: string) => {
        e.stopPropagation();
        toggleSinRepeated(id);
        setSins(getSins());
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    };

    const handleDelete = (id: string, e: Event) => {
        e.stopPropagation();
        const deleted = deleteSin(id);
        if (deleted) {
            setLastDeleted(deleted);
            setShowUndo(true);
            setSins(getSins());

            // Auto-hide undo after 5 seconds
            const timer = setTimeout(() => {
                setShowUndo(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    };

    const handleUndo = () => {
        if (lastDeleted) {
            restoreSin(lastDeleted);
            setSins(getSins());
            setLastDeleted(null);
            setShowUndo(false);
        }
    };

    const handleScroll = (e: any) => {
        setIsScrolled(e.target.scrollTop > 20);
    };

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground animate-in fade-in duration-300">

            {/* Header */}
            <header className={cn(
                "px-6 pt-8 pb-4 transition-all duration-300 border-b border-transparent",
                isScrolled && "pt-4 pb-2 bg-background/80 backdrop-blur-md border-border sticky top-0 z-30"
            )}>
                <div className="flex items-start justify-between">
                    <div className="flex flex-col">
                        <h1 className={cn(
                            "font-bold transition-all duration-300 tracking-tight",
                            isScrolled ? "text-xl" : "text-3xl"
                        )}>
                            Kneel
                        </h1>
                        {!isScrolled && (
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-[0.15em] mt-1 animate-in fade-in slide-in-from-left-2 duration-500">
                                A confession assistant
                            </p>
                        )}

                        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                            <PopoverTrigger asChild>
                                <button className={cn(
                                    "flex items-center gap-2 mt-2 text-left group transition-all duration-300",
                                    isScrolled ? "opacity-0 h-0 pointer-events-none overflow-hidden" : "opacity-100"
                                )}>
                                    <span className="text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
                                        Last confession: {formatDate(lastDate) || "Tap to set"}
                                    </span>
                                    {showReminder && daysSince !== null && daysSince > 0 && (
                                        <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-bold">
                                            {daysSince}D
                                        </span>
                                    )}
                                    <CalendarIcon className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={lastDate ? new Date(lastDate) : undefined}
                                    onSelect={(date) => {
                                        if (date) {
                                            handleDateChange(format(date, 'yyyy-MM-dd'));
                                            setCalendarOpen(false);
                                        }
                                    }}
                                    disabled={(date) => date > new Date()}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-10 h-10 rounded-full text-muted-foreground hover:text-foreground"
                            onClick={() => setShowAbout(true)}
                        >
                            <Info className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-10 h-10 rounded-full text-muted-foreground hover:text-foreground"
                            onClick={() => navigateTo('settings')}
                        >
                            <SettingsIcon className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main
                className="flex-1 overflow-y-auto px-4 py-2 hide-scrollbar"
                onScroll={handleScroll}
            >
                {sins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-50">
                        <p className="text-lg">No entries yet. Take your time.</p>
                    </div>
                ) : (
                    <div className="space-y-6 pb-20">
                        {/* Recurring Section */}
                        {sins.some(s => s.isRepeated) && (
                            <section className="space-y-3">
                                <h2 className="text-[11px] font-bold text-primary/60 uppercase tracking-[0.2em] px-2">Recurring Patterns</h2>
                                <ul className="space-y-3">
                                    {sins.filter(s => s.isRepeated).map(sin => (
                                        <SinCard
                                            key={sin.id}
                                            sin={sin}
                                            isExpanded={expandedIds.has(sin.id)}
                                            onToggleExpand={() => toggleExpand(sin.id)}
                                            onToggleRepeated={(e) => handleToggleRepeated(e, sin.id)}
                                            onDelete={(e) => handleDelete(sin.id, e)}
                                        />
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* General Section */}
                        <section className="space-y-3">
                            {sins.some(s => s.isRepeated) && (
                                <h2 className="text-[11px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em] px-2">General</h2>
                            )}
                            <ul className="space-y-3">
                                {sins.filter(s => !s.isRepeated).map(sin => (
                                    <SinCard
                                        key={sin.id}
                                        sin={sin}
                                        isExpanded={expandedIds.has(sin.id)}
                                        onToggleExpand={() => toggleExpand(sin.id)}
                                        onToggleRepeated={(e) => handleToggleRepeated(e, sin.id)}
                                        onDelete={(e) => handleDelete(sin.id, e)}
                                    />
                                ))}
                            </ul>
                        </section>
                    </div>
                )}
            </main>

            {/* Footer Navigation */}
            <footer className="p-4 flex flex-col gap-3 bg-background border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10 transition-all duration-300">
                <div className="grid grid-cols-2 gap-3">
                    <Button
                        variant="default"
                        className="rounded-2xl h-14 text-base font-semibold shadow-md pr-6 hover:scale-[1.02] active:scale-[0.98] transition-all"
                        onClick={() => navigateTo('add-sin')}
                    >
                        <Plus className="mr-2 h-5 w-5" /> Add Entry
                    </Button>

                    <Button
                        variant="secondary"
                        className="rounded-2xl h-14 text-base font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
                        onClick={() => navigateTo('confirm-clear')}
                        disabled={sins.length === 0}
                    >
                        <Check className="mr-2 h-5 w-5" /> Confessed
                    </Button>
                </div>

                <Button
                    variant="ghost"
                    className="w-full rounded-3xl h-16 text-lg font-bold bg-secondary/30 border border-border/50 hover:bg-secondary/50 hover:border-border transition-all duration-300 group active:scale-[0.98]"
                    onClick={() => navigateTo('prepare')}
                >
                    <div className="flex items-center justify-center gap-3">
                        <BookOpen className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        <span className="tracking-tight text-foreground">Prepare</span>
                    </div>
                </Button>
            </footer>
            {/* Undo Toast */}
            {showUndo && (
                <div className="fixed bottom-36 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-foreground text-background rounded-xl shadow-lg p-3 px-4 flex items-center justify-between gap-4">
                        <span className="text-sm font-medium">Deleted</span>
                        <Button
                            variant="link"
                            size="sm"
                            className="h-auto p-0 text-background font-bold underline"
                            onClick={handleUndo}
                        >
                            UNDO
                        </Button>
                    </div>
                </div>
            )}
            {/* About Panel (Overlay) */}
            {showAbout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-card w-full max-w-sm rounded-2xl border border-border shadow-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold tracking-tight">About Kneel</h2>
                            <Info className="w-5 h-5 text-primary" />
                        </div>

                        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                            <p>
                                <strong className="text-foreground">Kneel</strong> is a simple, private space to prepare for confession.
                                Your entries stay on your device — no accounts, no sync, no cloud.
                            </p>
                            <p>
                                I created this app for a simple reason: I often forget specific details by the time I prepare for confession. This tool helps me note them down as they happen.
                            </p>
                            <p>
                                God, in His mercy, has given us the beautiful opportunity to confess, be forgiven, and grow in purity. I truly hope this app helps you on that journey.
                            </p>
                            <p className="text-xs pt-4 italic border-t border-border/50">
                                Built with love for the faithful. Privacy is sacred.
                            </p>
                        </div>

                        <Button className="w-full mt-6 rounded-xl h-12 font-semibold" onClick={() => setShowAbout(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function SinCard({
    sin,
    isExpanded,
    onToggleExpand,
    onToggleRepeated,
    onDelete
}: {
    sin: Sin,
    isExpanded: boolean,
    onToggleExpand: () => void,
    onToggleRepeated: (e: Event) => void,
    onDelete: (e: Event) => void
}) {
    const isLongText = sin.text.length > 100; // Rough estimate for line clamping

    return (
        <li
            className={cn(
                "group relative flex items-start gap-3 p-4 bg-card rounded-xl border border-border transition-all duration-300",
                isExpanded ? "shadow-md ring-1 ring-primary/5" : "shadow-sm active:scale-[0.99]"
            )}
        >
            <div
                className="flex-1 min-w-0 cursor-pointer py-1"
                onClick={onToggleExpand}
            >
                <div className="relative">
                    <p className={cn(
                        "text-base leading-relaxed break-words whitespace-pre-wrap transition-all duration-300 select-none",
                        !isExpanded && "line-clamp-2"
                    )}>
                        {sin.text}
                    </p>

                    {/* Gradient Fade for Long Text */}
                    {!isExpanded && isLongText && (
                        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                    )}
                </div>
            </div>

            {/* Actions Container */}
            <div className="flex flex-col gap-2 shrink-0 border-l border-border/50 pl-3">
                <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10"
                    onClick={() => navigateTo('edit-sin', { sinId: sin.id })}
                >
                    <Pencil className="w-4 h-4" />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        "w-9 h-9 rounded-xl transition-all duration-300",
                        sin.isRepeated
                            ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                            : "text-muted-foreground/50 hover:text-primary hover:bg-muted"
                    )}
                    onClick={onToggleRepeated}
                    title={sin.isRepeated ? "Marked as recurring" : "Mark as recurring"}
                >
                    <Layers className={cn("w-4.5 h-4.5 transition-transform", sin.isRepeated && "scale-110")} />
                </Button>

                <Button
                    variant="ghost"
                    size="icon"
                    className="w-9 h-9 rounded-full text-muted-foreground/50 hover:text-destructive hover:bg-destructive/10"
                    onClick={onDelete}
                >
                    <Trash2 className="w-4.5 h-4.5" />
                </Button>
            </div>
        </li>
    );
}
