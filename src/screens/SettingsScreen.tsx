import { useState, useEffect } from 'preact/hooks';
import { navigateTo } from '../utils/router';
import { getTheme, setTheme, getShowReminder, setShowReminder, getLanguage, setLanguage, getShowPrayerBefore, setShowPrayerBefore, getShowActOfContrition, setShowActOfContrition } from '../services/storage';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Moon, Sun, Bell, Globe, Lock, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SettingsScreen() {
    const [theme, setAppTheme] = useState<'light' | 'dark'>('dark');
    const [showReminder, setAppShowReminder] = useState(true);
    const [language, setAppLanguage] = useState<'en' | 'ml'>('en');
    const [showPrayerBefore, setAppShowPrayerBefore] = useState(true);
    const [showActOfContrition, setAppShowActOfContrition] = useState(true);

    useEffect(() => {
        setAppTheme(getTheme());
        setAppShowReminder(getShowReminder());
        setAppLanguage(getLanguage());
        setAppShowPrayerBefore(getShowPrayerBefore());
        setAppShowActOfContrition(getShowActOfContrition());
    }, []);

    const handleThemeToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setAppTheme(newTheme);
        setTheme(newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');
    };

    const handleReminderToggle = () => {
        const newVal = !showReminder;
        setAppShowReminder(newVal);
        setShowReminder(newVal);
    };

    const handlePrayerBeforeToggle = () => {
        const newVal = !showPrayerBefore;
        setAppShowPrayerBefore(newVal);
        setShowPrayerBefore(newVal);
    };

    const handleActOfContritionToggle = () => {
        const newVal = !showActOfContrition;
        setAppShowActOfContrition(newVal);
        setShowActOfContrition(newVal);
    };

    const handleLanguageChange = (lang: 'en' | 'ml') => {
        setAppLanguage(lang);
        setLanguage(lang);
    };

    return (
        <div className="flex flex-col h-screen max-w-md mx-auto bg-background text-foreground animate-in slide-in-from-right-4 duration-300">

            {/* Header */}
            <header className="flex items-center px-4 py-4 border-b border-border">
                <Button variant="ghost" size="icon" onClick={() => navigateTo('home')} className="-ml-2">
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <span className="text-sm font-medium ml-2 text-muted-foreground">Settings</span>
            </header>

            {/* Content */}
            <main className="flex-1 p-4 space-y-8">

                {/* General Section */}
                <section className="space-y-4">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">General</h2>

                    {/* Theme */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                            <div>
                                <div className="font-medium">Dark Mode</div>
                                <div className="text-xs text-muted-foreground">Use dark color theme</div>
                            </div>
                        </div>
                        <Switch checked={theme === 'dark'} onChange={handleThemeToggle} />
                    </div>

                    {/* Reminder */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5" />
                            <div>
                                <div className="font-medium">Gentle Reminder</div>
                                <div className="text-xs text-muted-foreground">Show days since confession</div>
                            </div>
                        </div>
                        <Switch checked={showReminder} onChange={handleReminderToggle} />
                    </div>

                    {/* Prayer Visibility */}
                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5" />
                            <div>
                                <div className="font-medium">Prayer Before Confession</div>
                                <div className="text-xs text-muted-foreground">Show in Prepare list</div>
                            </div>
                        </div>
                        <Switch checked={showPrayerBefore} onChange={handlePrayerBeforeToggle} />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            <BookOpen className="w-5 h-5" />
                            <div>
                                <div className="font-medium">Act of Contrition</div>
                                <div className="text-xs text-muted-foreground">Show in Prepare list</div>
                            </div>
                        </div>
                        <Switch checked={showActOfContrition} onChange={handleActOfContritionToggle} />
                    </div>

                    {/* Language */}
                    <div className="flex flex-col gap-3 p-4 bg-card rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            <Globe className="w-5 h-5" />
                            <div className="font-medium">Prayer Language</div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 mt-2">
                            <Button
                                variant={language === 'en' ? 'default' : 'outline'}
                                onClick={() => handleLanguageChange('en')}
                                className="w-full"
                            >
                                English
                            </Button>
                            <Button
                                variant={language === 'ml' ? 'default' : 'outline'}
                                onClick={() => handleLanguageChange('ml')}
                                className="w-full font-serif"
                            >
                                മലയാളം
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Security Section */}
                <section className="space-y-4">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Security</h2>

                    <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                        <div className="flex items-center gap-3">
                            <Lock className="w-5 h-5" />
                            <div>
                                <div className="font-medium">Change PIN</div>
                                <div className="text-xs text-muted-foreground">Update your security code</div>
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => navigateTo('setup-pin')}>
                            Update
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}

// Simple Switch Component logic
function Switch({ checked, onChange }: { checked: boolean; onChange: () => void }) {
    return (
        <button
            className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background",
                checked ? "bg-primary" : "bg-input"
            )}
            onClick={onChange}
        >
            <span
                className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
                    checked ? "translate-x-6" : "translate-x-1"
                )}
            />
        </button>
    );
}

// Export initTheme function needed by app.tsx
export function initTheme(): void {
    const theme = getTheme();
    document.documentElement.classList.toggle('dark', theme === 'dark');
}
