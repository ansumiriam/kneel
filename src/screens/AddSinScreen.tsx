import { useState, useRef, useEffect } from 'preact/hooks';
import { navigateTo, getNavigationState } from '../utils/router';
import { addSin } from '../services/storage';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function AddSinScreen() {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Auto focus on mount
        textareaRef.current?.focus();
    }, []);

    const handleSave = () => {
        if (text.trim()) {
            addSin(text);
            // TODO: Toast

            const navState = getNavigationState();
            const returnTo = navState?.from || 'home';
            navigateTo(returnTo);
        } else {
            textareaRef.current?.focus();
            // Simple shake animation could be added here
        }
    };

    const handleBack = () => {
        const navState = getNavigationState();
        const returnTo = navState?.from || 'home';
        navigateTo(returnTo);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSave();
        }
    };

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground animate-in slide-in-from-bottom-4 duration-300">

            {/* Header */}
            <header className="flex items-center px-4 py-4 border-b border-border">
                <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-2">Add Entry</h1>
            </header>

            {/* Content */}
            <main className="flex-1 p-4">
                <textarea
                    ref={textareaRef}
                    className="w-full h-full min-h-[50vh] bg-transparent resize-none text-lg placeholder:text-muted-foreground focus:outline-none p-2 leading-relaxed"
                    placeholder="What's on your mind?"
                    value={text}
                    onInput={(e) => setText((e.target as HTMLTextAreaElement).value)}
                    onKeyDown={handleKeyDown}
                />
            </main>

            {/* Footer */}
            <footer className="p-4 border-t border-border bg-background">
                <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="lg" onClick={handleBack}>
                        Cancel
                    </Button>
                    <Button variant="default" size="lg" onClick={handleSave}>
                        Save
                    </Button>
                </div>
            </footer>
        </div>
    );
}
