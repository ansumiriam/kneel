import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { getAuthSettings, verifySecurityAnswer, setPin } from '../services/storage';
import { PinKeypad } from '@/components/PinKeypad';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RecoverPinScreen() {
    const [step, setStep] = useState(1); // 1: verify, 2: new pin, 3: confirm pin
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPin, setNewPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const settings = getAuthSettings();
        setQuestion(settings.question || 'Security Question');
    }, []);

    const handleVerify = () => {
        if (verifySecurityAnswer(answer)) {
            setStep(2);
            setError('');
        } else {
            setError('Incorrect answer');
        }
    };

    // Validation Effect
    useEffect(() => {
        if (step === 2 && newPin.length === 4) {
            const timer = setTimeout(() => {
                setStep(3);
            }, 200);
            return () => clearTimeout(timer);
        }

        if (step === 3 && confirmPin.length === 4) {
            const timer = setTimeout(() => {
                if (confirmPin === newPin) {
                    setPin(newPin);
                    navigateTo('lock');
                } else {
                    setError('PINs do not match. Try again.');
                    setNewPin('');
                    setConfirmPin('');
                    setStep(2);
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [step, newPin, confirmPin]);

    const handlePress = (key: string | number) => {
        setError('');
        const setVal = step === 3 ? setConfirmPin : setNewPin;

        if (key === 'backspace') {
            setVal(prev => prev.slice(0, -1));
        } else {
            setVal(prev => {
                if (prev.length < 4) return prev + key;
                return prev;
            });
        }
    };

    // Step 1: Security Question Form
    if (step === 1) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 bg-background text-foreground animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="w-full max-w-sm space-y-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                            <LockKeyhole className="w-8 h-8 text-primary" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold tracking-tight">Recover PIN</h1>
                        <p className="text-muted-foreground">Answer your security question to reset</p>
                    </div>

                    <div className="bg-card p-6 rounded-xl border border-border shadow-sm text-left space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                Question
                            </label>
                            <p className="font-medium text-lg">{question}</p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
                                Your Answer
                            </label>
                            <input
                                type="text"
                                className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                placeholder="Enter answer"
                                value={answer}
                                onInput={(e) => setAnswer((e.target as HTMLInputElement).value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                            />
                        </div>

                        {error && (
                            <p className="text-sm font-medium text-destructive">{error}</p>
                        )}

                        <Button className="w-full mt-2" size="lg" onClick={handleVerify}>
                            Verify Answer
                        </Button>
                    </div>

                    <Button variant="link" onClick={() => navigateTo('lock')}>
                        Back to Lock Screen
                    </Button>
                </div>
            </div>
        );
    }

    // Step 2 & 3: PIN Entry (Reused UI)
    const currentPin = step === 2 ? newPin : confirmPin;
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-background text-foreground animate-in fade-in duration-300">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight text-primary">
                        {step === 2 ? 'New PIN' : 'Confirm PIN'}
                    </h1>
                    <p className="text-muted-foreground">
                        {step === 2 ? 'Set a new 4-digit PIN' : 'Please re-enter your new PIN'}
                    </p>
                </div>

                <PinKeypad
                    pin={currentPin}
                    error={error}
                    onPress={handlePress}
                    showForgot={false}
                />

                <Button variant="link" onClick={() => navigateTo('lock')}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
