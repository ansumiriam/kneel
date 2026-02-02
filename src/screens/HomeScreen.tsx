import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { Button } from '@/components/ui/button';
import {
    Plus,
    Check,
    BookOpen,
    Settings as SettingsIcon,
    RotateCcw,
    Trash2,
    CalendarIcon
} from 'lucide-react';
import {
    getSins,
    getLastConfessionDate,
    setLastConfessionDate,
    getDaysSinceConfession,
    getShowReminder,
    deleteSin,
    incrementSinCount,
    resetSinCount,
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

    const toggleRepeat = (e: Event, id: string, count: number | undefined) => {
        e.stopPropagation();
        if (count) {
            resetSinCount(id);
        } else {
            incrementSinCount(id);
        }
        setSins(getSins()); // Refresh list
        if (navigator.vibrate) navigator.vibrate(50);
    };

    const handleDelete = (id: string) => {
        const deleted = deleteSin(id);
        if (deleted) {
            setSins(getSins());
            // TODO: Toast with undo
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground animate-in fade-in duration-300">

            {/* Header */}
            <header className="px-6 py-6 pb-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="ghost"
                            className={cn("w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent -ml-1 pl-1")}
                        >
                            <div className="flex flex-col space-y-1 cursor-pointer">
                                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                                    Last Confession
                                </span>
                                <div className="flex items-baseline space-x-2 text-foreground">
                                    <span className="text-2xl font-semibold">
                                        {formatDate(lastDate) || "Tap to set date"}
                                    </span>
                                    {showReminder && daysSince !== null && daysSince > 0 && (
                                        <span className="text-sm text-primary">
                                            ({daysSince} day{daysSince !== 1 ? 's' : ''} ago)
                                        </span>
                                    )}
                                    <CalendarIcon className="h-5 w-5 opacity-50 text-foreground" />
                                </div>
                            </div>
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={lastDate ? new Date(lastDate) : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    handleDateChange(format(date, 'yyyy-MM-dd'));
                                }
                            }}
                            disabled={(date) => date > new Date()}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto px-4 py-2 space-y-3 hide-scrollbar">
                {sins.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center space-y-4 opacity-50">
                        <p className="text-lg">No entries yet. Take your time.</p>
                    </div>
                ) : (
                    <ul className="space-y-3 pb-20">
                        {sins.map((sin) => (
                            <li
                                key={sin.id}
                                className="group relative flex items-start gap-3 p-4 bg-card rounded-xl border border-border shadow-sm active:scale-[0.99] transition-transform duration-100"
                                onClick={() => navigateTo('edit-sin', { sinId: sin.id })}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-base leading-relaxed break-words whitespace-pre-wrap">
                                        {sin.text}
                                    </p>
                                </div>

                                {/* Actions Container */}
                                <div className="flex flex-col gap-2 shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className={cn(
                                            "w-10 h-10 rounded-full transition-colors",
                                            sin.count ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-muted-foreground hover:bg-muted"
                                        )}
                                        onClick={(e: any) => toggleRepeat(e, sin.id, sin.count)}
                                    >
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="w-10 h-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                        onClick={(e: any) => {
                                            e.stopPropagation();
                                            handleDelete(sin.id);
                                        }}
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            {/* Footer Navigation */}
            <footer className="p-4 grid grid-cols-2 gap-3 bg-background border-t border-border shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-10">
                <Button
                    variant="default"
                    size="lg"
                    className="col-span-1 rounded-2xl h-14 text-base font-semibold shadow-md"
                    onClick={() => navigateTo('add-sin')}
                >
                    <Plus className="mr-2 h-5 w-5" /> Add Entry
                </Button>

                <Button
                    variant="secondary"
                    size="lg"
                    className="col-span-1 rounded-2xl h-14 text-base font-medium"
                    onClick={() => navigateTo('confirm-clear')}
                    disabled={sins.length === 0}
                >
                    <Check className="mr-2 h-5 w-5" /> Confessed
                </Button>

                <div className="col-span-2 grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        className="rounded-xl h-12"
                        onClick={() => navigateTo('prepare')}
                    >
                        <BookOpen className="mr-2 h-4 w-4" /> Prepare
                    </Button>
                    <Button
                        variant="ghost"
                        className="rounded-xl h-12"
                        onClick={() => navigateTo('settings')}
                    >
                        <SettingsIcon className="mr-2 h-4 w-4" /> Settings
                    </Button>
                </div>
            </footer>
        </div>
    );
}
