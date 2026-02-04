import { useState, useEffect, useRef } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { getLanguage } from '../services/storage';
import { CONTENT, GuidePage } from '../content/prayers';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus } from 'lucide-react';

export function GuideScreen() {
    const [sections, setSections] = useState<GuidePage[]>([]);
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lang = getLanguage();
        setSections(CONTENT[lang].guide);

        // Restore scroll position if returning
        const savedScroll = sessionStorage.getItem('guide-scroll');
        if (savedScroll && mainRef.current) {
            // Tiny delay to ensure content is rendered
            setTimeout(() => {
                if (mainRef.current) {
                    mainRef.current.scrollTop = parseInt(savedScroll, 10);
                }
            }, 50);
        }
    }, [sections]); // Re-run when sections load

    const handleBack = () => {
        sessionStorage.removeItem('guide-scroll'); // Clear when exiting
        navigateTo('prepare');
    };

    const handleAddEntry = () => {
        if (mainRef.current) {
            sessionStorage.setItem('guide-scroll', mainRef.current.scrollTop.toString());
        }
        navigateTo('add-sin', { from: 'guide' });
    };

    return (
        <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-background text-foreground animate-in slide-in-from-right-4 duration-300 relative">

            {/* Header */}
            <header className="flex items-center px-4 py-4 border-b border-border bg-background z-10">
                <Button variant="ghost" size="icon" onClick={handleBack} className="-ml-2">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <span className="text-sm font-medium ml-2 text-muted-foreground">Preparation Guide</span>
            </header>

            {/* Scrollable Content */}
            <main
                ref={mainRef}
                className="flex-1 overflow-y-auto px-4 py-4 space-y-8 pb-24 text-lg"
            >
                {sections.map((section, idx) => (
                    <section key={idx} className="space-y-4">
                        <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
                        <div
                            className="space-y-4 leading-relaxed text-muted-foreground"
                            dangerouslySetInnerHTML={{ __html: formatGuideText(section.content) }}
                        />
                        {idx < sections.length - 1 && <hr className="my-8 border-border" />}
                    </section>
                ))}
            </main>

            {/* Footer Action */}
            <footer className="p-4 bg-background border-t border-border z-10">
                <Button
                    className="w-full rounded-2xl h-14 text-base font-semibold shadow-lg"
                    size="lg"
                    onClick={handleAddEntry}
                >
                    <Plus className="mr-2 h-5 w-5" /> Add to List
                </Button>
            </footer>

        </div>
    );
}

// Formatter
function formatGuideText(text: string): string {
    return text.split('\n\n').map(para => {
        if (para.startsWith('**') && para.endsWith('**')) {
            return `<h3 class="font-semibold text-foreground text-lg mt-4">${para.replace(/\*\*/g, '')}</h3>`;
        }

        let content = para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground">$1</strong>');
        content = content.replace(/\*(.+?)\*/g, '<em class="text-foreground">$1</em>');

        if (content.startsWith('• ')) {
            const items = content.split('\n').map(item => `<li>${item.replace('• ', '')}</li>`).join('');
            return `<ul class="list-disc pl-5 space-y-2 marker:text-primary">${items}</ul>`;
        }

        if (/^\d+\.\s/.test(content)) {
            const firstMatch = content.match(/^(\d+)\.\s/);
            const startNum = firstMatch ? firstMatch[1] : '1';
            const items = content.split('\n').map(item => `<li>${item.replace(/^\d+\.\s/, '')}</li>`).join('');
            return `<ol start="${startNum}" class="list-decimal pl-5 space-y-2 marker:text-primary">${items}</ol>`;
        }

        return `<p>${content}</p>`;
    }).join('');
}
