import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { getAuthSettings, verifyPin, hasSeenWelcome } from '../services/storage';
import { setAuthenticated } from '../services/auth';
import { PinKeypad } from '@/components/PinKeypad';

export function LockScreen() {
    const [pin, setPin] = useState('');
    const [error, setError] = useState('');
    const [dots, setDots] = useState<number[]>([0, 1, 2, 3]);

    // On every mount: clear the session so navigating back here = logged out
    useEffect(() => {
        setAuthenticated(false);

        const settings = getAuthSettings();
        if (!settings.isPinSet) {
            navigateTo(hasSeenWelcome() ? 'setup-pin' : 'welcome');
        }
    }, []);

    // Validate PIN when length reaches 4
    useEffect(() => {
        if (pin.length === 4) {
            const timer = setTimeout(() => {
                if (verifyPin(pin)) {
                    setAuthenticated(true);
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
        <div className="flex flex-col items-center justify-center h-full p-4 bg-background text-foreground animate-in fade-in duration-500">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">Kneel</h1>
                    <p className="text-muted-foreground">Enter your 4-digit PIN</p>
                </div>

                <PinKeypad
                    pin={pin}
                    error={error}
                    onPress={handlePress}
                    showForgot={true}
                />
            </div>
        </div>
    );
}
