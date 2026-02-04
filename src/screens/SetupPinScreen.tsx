import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { setPin, setSecurityQuestion } from '../services/storage';
import { PinKeypad } from '@/components/PinKeypad';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function SetupPinScreen() {
    const [step, setStep] = useState(1); // 1: set, 2: confirm, 3: question
    const [firstPin, setFirstPin] = useState('');
    const [currentPin, setCurrentPin] = useState('');
    const [error, setError] = useState('');

    // Security Question state
    const [question, setQuestion] = useState('In what city were you born?');
    const [customQuestion, setCustomQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    // Validate Steps 1 & 2
    useEffect(() => {
        if (currentPin.length === 4) {
            const timer = setTimeout(() => {
                if (step === 1) {
                    setFirstPin(currentPin);
                    setCurrentPin('');
                    setStep(2);
                } else if (step === 2) {
                    if (currentPin === firstPin) {
                        setStep(3);
                    } else {
                        setError('PINs do not match. Try again.');
                        setCurrentPin('');
                        setFirstPin('');
                        setStep(1);
                    }
                }
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [currentPin, step, firstPin]);

    const handlePress = (key: string | number) => {
        setError('');

        if (key === 'backspace') {
            setCurrentPin(prev => prev.slice(0, -1));
        } else {
            setCurrentPin(prev => {
                if (prev.length < 4) return prev + key;
                return prev;
            });
        }
    };

    const handleSave = () => {
        const finalQuestion = question === 'custom' ? customQuestion : question;

        if (question === 'custom' && !customQuestion.trim()) {
            setError('Please enter your custom question');
            return;
        }

        if (!answer.trim()) {
            setError('Please provide an answer');
            return;
        }

        setPin(firstPin);
        setSecurityQuestion(finalQuestion, answer);
        navigateTo('privacy-check');
    };

    if (step === 3) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[100dvh] p-6 bg-background text-foreground animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="w-full max-w-sm space-y-6">
                    <div className="text-center space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Security Question</h1>
                        <p className="text-muted-foreground">Used to recover your PIN if forgotten</p>
                    </div>

                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Question
                            </label>
                            <select
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-2"
                                value={question}
                                onChange={(e) => {
                                    const val = (e.target as HTMLSelectElement).value;
                                    setQuestion(val);
                                    if (val === 'custom') {
                                        setCustomQuestion('');
                                    }
                                }}
                            >
                                <option value="In what city were you born?">In what city were you born?</option>
                                <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
                                <option value="What was the name of your first pet?">What was the name of your first pet?</option>
                                <option value="What was your first car?">What was your first car?</option>
                                <option value="What is your favorite book?">What is your favorite book?</option>
                                <option value="custom">Add Custom Question...</option>
                            </select>

                            {question === 'custom' && (
                                <input
                                    type="text"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 animate-in fade-in slide-in-from-top-2"
                                    placeholder="Type your question here"
                                    value={customQuestion}
                                    onInput={(e) => setCustomQuestion((e.target as HTMLInputElement).value)}
                                    autoFocus
                                />
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Answer
                            </label>
                            <input
                                type="text"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Your answer"
                                value={answer}
                                onInput={(e) => setAnswer((e.target as HTMLInputElement).value)}
                            />
                        </div>

                        {error && (
                            <p className="text-sm font-medium text-destructive text-center">{error}</p>
                        )}

                        <Button
                            className="w-full"
                            size="lg"
                            onClick={handleSave}
                        >
                            Complete Setup
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // PIN Entry Steps (1 & 2)
    return (
        <div className="flex flex-col items-center justify-center min-h-[100dvh] p-4 bg-background text-foreground animate-in fade-in duration-300">
            <div className="w-full max-w-sm flex flex-col items-center space-y-8">

                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold tracking-tight text-primary">
                        {step === 1 ? 'Create PIN' : 'Confirm PIN'}
                    </h1>
                    <p className="text-muted-foreground">
                        {step === 1 ? 'Set a 4-digit PIN to secure your data' : 'Please re-enter your 4-digit PIN'}
                    </p>
                </div>

                <PinKeypad
                    pin={currentPin}
                    error={error}
                    onPress={handlePress}
                    showForgot={false}
                />
            </div>
        </div>

    );
}
