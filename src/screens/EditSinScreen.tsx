import { useState, useRef, useEffect } from 'preact/hooks';
import { navigateTo, getNavigationState } from '../utils/router';
import { getSins, updateSin } from '../services/storage';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function EditSinScreen() {
    const [text, setText] = useState('');
    const [sinId, setSinId] = useState<string | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Get Sin ID from navigation state
        const navState = getNavigationState();
        if (navState && navState.sinId) {
            setSinId(navState.sinId);
            const sins = getSins();
            const sin = sins.find(s => s.id === navState.sinId);
            if (sin) {
                setText(sin.text);
            } else {
                // ID not found? Go home
                navigateTo('home');
            }
        } else {
            // No ID passed? Go home
            navigateTo('home');
        }
    }, []);

    useEffect(() => {
        // Focus after text is loaded
        if (text) {
            textareaRef.current?.focus();
        }
    }, [text]);

    const handleSave = () => {
        if (text.trim() && sinId) {
            updateSin(sinId, { text });
            // TODO: Toast
            navigateTo('home');
        } else if (!text.trim()) {
            textareaRef.current?.focus();
        }
    };

    const handleBack = () => {
        navigateTo('home');
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSave();
        }
    };

    return (
        <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-background text-foreground animate-in slide-in-from-right-4 duration-300">

            {/* Header */}
            <header className="flex items-center px-4 py-4 border-b border-border">
                <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-2">Edit Entry</h1>
            </header>

            {/* Content */}
            <main className="flex-1 p-4">
                <textarea
                    ref={textareaRef}
                    className="w-full h-full min-h-[50vh] bg-transparent resize-none text-lg placeholder:text-muted-foreground focus:outline-none p-2 leading-relaxed"
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
