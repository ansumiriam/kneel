import { useState } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { getLanguage, getShowPrayers } from '../services/storage';
import { CONTENT } from '../content/prayers';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Info, FileText, Heart, BookOpen, Hand } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PrepareScreen() {
    const language = getLanguage();
    const content = CONTENT[language];
    const [showAbout, setShowAbout] = useState(false);

    const showPrayers = getShowPrayers();

    const handleBack = () => {
        navigateTo('home');
    };

    const menuItems = [
        {
            id: 'prayer-before',
            title: 'Prayer Before Confession',
            desc: 'Tap to read',
            icon: Hand,
            action: () => navigateTo('prayer', { type: 'before' })
        },
        {
            id: 'act-contrition',
            title: 'Act of Contrition',
            desc: 'Tap to read',
            icon: Heart,
            action: () => navigateTo('prayer', { type: 'contrition' })
        },
        {
            id: 'prep-guide',
            title: 'Preparation Guide',
            desc: 'Swipe to read · Self-examination',
            icon: BookOpen,
            action: () => navigateTo('guide')
        },
        {
            id: 'source-pdf',
            title: 'View Source PDF',
            desc: `Based on '${content.attribution.source}'`,
            icon: FileText,
            action: () => window.open(content.attribution.url, '_blank')
        }
    ].filter(item => {
        if (item.id === 'prayer-before' || item.id === 'act-contrition') return showPrayers;
        return true;
    });

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground animate-in slide-in-from-right-4 duration-300 relative">

            {/* Header */}
            <header className="flex items-center px-4 py-4 border-b border-border">
                <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-xl font-semibold ml-2">Prepare</h1>
            </header>

            {/* Content */}
            <main className="flex-1 p-4 overflow-y-auto space-y-4">
                {menuItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-center p-4 bg-card rounded-xl border border-border shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
                        onClick={item.action}
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                            <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-base">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                    </div>
                ))}

                {/* About App */}
                <div
                    className="flex items-center p-4 bg-muted/30 rounded-xl border border-dashed border-border mt-8 cursor-pointer active:scale-[0.98] transition-transform"
                    onClick={() => setShowAbout(true)}
                >
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mr-4">
                        <Info className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-base">About This App</h3>
                        <p className="text-sm text-muted-foreground">Tap to learn more</p>
                    </div>
                </div>
            </main>

            {/* About Panel (Overlay) */}
            {showAbout && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card w-full max-w-sm rounded-xl border border-border shadow-lg p-6 space-y-4 max-h-[85vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold">About Kneel</h2>

                        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                            <p>
                                <strong className="text-foreground">Kneel</strong> is a simple, private space to prepare for confession.
                                Your entries stay on your device — no accounts, no sync, no cloud.
                            </p>
                            <p>
                                On a daily basis, I realize and regret certain things I’ve done. But if I don’t write them down,
                                I often forget them by the time I prepare for confession.
                            </p>
                            <p>
                                God, in His mercy, has given us the beautiful opportunity to confess, be forgiven, and grow in purity.
                            </p>
                            <p>
                                That’s why I created this app—to note down what I want to confess.
                                I truly hope it helps you as much as it has helped me.
                            </p>
                            <p className="text-xs pt-4 italic">
                                Built with love for the faithful. Privacy is sacred.
                            </p>
                        </div>

                        <Button className="w-full mt-4" onClick={() => setShowAbout(false)}>
                            Close
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
