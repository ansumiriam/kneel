import { useState } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { clearSins, setLastConfessionDate } from '../services/storage';
import { getTodayISO } from '../utils/date';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertTriangle, CalendarIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function ConfirmClearScreen() {
    const today = getTodayISO();
    const [date, setDate] = useState(today);
    const [calendarOpen, setCalendarOpen] = useState(false);

    const handleConfirm = () => {
        clearSins();
        setLastConfessionDate(date);
        // TODO: Toast
        navigateTo('home');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-background text-foreground animate-in fade-in zoom-in-95 duration-300">

            <div className="flex flex-col items-center max-w-sm text-center space-y-6">
                <CheckCircle2 className="w-20 h-20 text-primary" />

                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Ready for a fresh start?</h1>
                    <p className="text-lg text-muted-foreground">
                        Have you completed your confession?
                    </p>
                </div>

                <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg text-left">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">
                        This will <strong className="text-foreground">permanently delete</strong> all entries from your device. This cannot be undone.
                    </p>
                </div>

                <div className="w-full space-y-2 text-left bg-card p-4 rounded-lg border border-border">
                    <label htmlFor="date" className="text-sm font-medium">
                        Date of Confession
                    </label>
                    <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date ? new Date(date) : undefined}
                                onSelect={(d) => {
                                    if (d) {
                                        setDate(format(d, 'yyyy-MM-dd'));
                                        setCalendarOpen(false);
                                    }
                                }}
                                disabled={(date) => date > new Date()}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="w-full grid grid-cols-2 gap-4 pt-4">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => navigateTo('home')}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        size="lg"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}
