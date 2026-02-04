import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { getAuthSettings, verifyPin } from '../services/storage';
import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LockScreen() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [dots, setDots] = useState<number[]>([0, 1, 2, 3]);

    // Check if PIN is set on mount
    useEffect(() => {
        const settings = getAuthSettings();
        if (!settings.isPinSet) {
            navigateTo('setup-pin');
        }
    }, []);

    // Validate PIN when length reaches 4
    useEffect(() => {
        if (pin.length === 4) {
            const timer = setTimeout(() => {
                if (verifyPin(pin)) {
                    navigateTo('privacy-check');
                } else {
                    setError('Incorrect PIN. Try again.');
                    setPin('');
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [pin]);

    const handlePress = (key: string | number) => {
        setError('');
        if (key === 'backspace') {
            setPin(prev => prev.slice(0, -1));
        } else {
            setPin(prev => {
                if (prev.length < 4) {
                    return prev + key;
                }
                return prev;
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-background text-foreground animate-in fade-in duration-500">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Kneel</h1>
                    <p className="text-muted-foreground">Enter your 4-digit PIN</p>
                </div>

                {/* PIN Display */}
                <div className="flex gap-4 my-8">
                    {dots.map((index) => (
                        <div
                            key={index}
                            className={cn(
                                "w-4 h-4 rounded-full border-2 border-primary transition-all duration-300",
                                index < pin.length ? "bg-primary scale-110" : "bg-transparent scale-100",
                                error && "border-destructive"
                            )}
                        />
                    ))}
                </div>

                {/* Error Message */}
                <div className="h-6 text-sm font-medium text-destructive text-center">
                    {error}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-4 w-full px-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                        <Button
                            key={num}
                            variant="outline"
                            className="h-16 text-2xl font-light rounded-full hover:bg-muted/50 transition-colors"
                            onClick={() => handlePress(num)}
                        >
                            {num}
                        </Button>
                    ))}
                    <div /> {/* Empty slot */}
                    <Button
                        variant="outline"
                        className="h-16 text-2xl font-light rounded-full hover:bg-muted/50 transition-colors"
                        onClick={() => handlePress(0)}
                    >
                        0
                    </Button>
                    <Button
                        variant="ghost"
                        className="h-16 rounded-full hover:bg-muted/50 text-muted-foreground"
                        onClick={() => handlePress('backspace')}
                        disabled={pin.length === 0}
                    >
                        <Delete className="w-8 h-8" />
                    </Button>
                </div>

                {/* Forgot PIN */}
                <Button
                    variant="link"
                    className="text-muted-foreground mt-4"
                    onClick={() => navigateTo('recover-pin')}
                >
                    Forgot PIN?
                </Button>
            </div>
        </div>
    );
}
