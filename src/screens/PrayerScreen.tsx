import { useState, useEffect } from 'preact/hooks';
import { navigateTo, getNavigationState } from '../utils/router';
import { getLanguage } from '../services/storage';
import { CONTENT, Prayer } from '../content/prayers';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

export function PrayerScreen() {
    const [content, setContent] = useState<Prayer | null>(null);
    const [formattedHtml, setFormattedHtml] = useState('');

    // Initial load
    useEffect(() => {
        const navState = getNavigationState();
        const type = navState?.type || 'before';
        const lang = getLanguage();
        const data = CONTENT[lang];
        const prayer = type === 'before' ? data.prayerBefore : data.actOfContrition;

        setContent(prayer);

        // Format text
        const rawParts = Array.isArray(prayer.content) ? prayer.content : [prayer.content];
        const fullText = rawParts.join('\n\n');
        setFormattedHtml(formatPrayerText(fullText));
    }, []);

    if (!content) return null;

    return (
        <div className="flex flex-col h-full max-w-md mx-auto bg-background text-foreground animate-in slide-in-from-right-4 duration-300">

            {/* Header */}
            <header className="flex items-center px-4 py-4 border-b border-border z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0">
                <Button variant="ghost" size="icon" onClick={() => navigateTo('prepare')} className="-ml-2">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <span className="text-sm font-medium ml-2 text-muted-foreground">Prayer</span>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 min-h-0 overflow-y-auto p-6 scroll-smooth">
                <div className="max-w-none pb-12">
                    <h1 className="text-2xl font-bold mb-8 text-center">{content.title}</h1>
                    <div
                        className="text-lg leading-relaxed space-y-4 text-foreground/90"
                        dangerouslySetInnerHTML={{ __html: formattedHtml }}
                    />
                </div>
            </main>

        </div>
    );
}

// Reuse the formatter logic
function formatPrayerText(text: string): string {
    if (!text) return '<p>No content available.</p>';
    const paragraphs = text.replace(/\r\n/g, '\n').split(/\n\s*\n/);

    return paragraphs.map(para => {
        const trimmed = para.trim();
        if (!trimmed) return '';

        if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
            return `<h3 class="text-xl font-semibold mt-6 mb-3 text-primary">${trimmed.replace(/\*\*/g, '')}</h3>`;
        }

        let content = trimmed.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\*(.+?)\*/g, '<em>$1</em>');

        if (content.startsWith('• ') || content.includes('\n• ')) {
            const items = content.split('\n').filter(l => l.trim().startsWith('• '));
            if (items.length > 0) {
                const listItems = items.map(item => `<li class="ml-4">${item.replace('• ', '')}</li>`).join('');
                return `<ul class="list-disc pl-4 space-y-2 my-4 marker:text-primary">${listItems}</ul>`;
            }
        }

        content = content.replace(/\n/g, '<br>');
        return `<p class="mb-4 text-justify">${content}</p>`;
    }).join('');
}
