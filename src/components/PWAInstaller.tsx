import { useState, useEffect } from 'preact/hooks';
import { Button } from './ui/button';
import { Download, X } from 'lucide-react';

export function PWAInstaller() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showBanner, setShowBanner] = useState(false);
    const [isStandalone, setIsStandalone] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        setIsIOS(isIOSDevice);

        // Check if already installed
        const isStandaloneActive = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
        setIsStandalone(isStandaloneActive);

        if (isStandaloneActive) return;

        const handler = (e: any) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setDeferredPrompt(e);
            // Show the banner
            setShowBanner(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        // For iOS, we can't detect "installable", so we show instructions after a delay
        if (isIOSDevice && !isStandaloneActive) {
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 8000); // Show after 8 seconds
            return () => clearTimeout(timer);
        }

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        // Show the install prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);

        // We've used the prompt, and can't use it again, throw it away
        setDeferredPrompt(null);
        setShowBanner(false);
    };

    const handleDismiss = () => {
        setShowBanner(false);
        // Save to local storage to not show again for 3 days
        localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    };

    // Don't show if already installed or banner dismissed recently
    if (isStandalone || !showBanner) return null;

    // Check if dismissed in the last 3 days
    const lastDismissed = localStorage.getItem('pwa-prompt-dismissed');
    if (lastDismissed && Date.now() - parseInt(lastDismissed) < 3 * 24 * 60 * 60 * 1000) {
        return null;
    }

    // iOS Specific Instructions
    if (isIOS && !deferredPrompt) {
        return (
            <div className="fixed bottom-6 left-4 right-4 z-50 animate-in slide-in-from-bottom-8 duration-500">
                <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 space-y-3">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                                <Download className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Install Kneel</h3>
                                <p className="text-xs text-muted-foreground">Add to home screen for the full experience</p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-1 text-muted-foreground" onClick={handleDismiss}>
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                    <div className="text-[11px] bg-muted/40 p-3 rounded-lg leading-relaxed text-muted-foreground border border-border/50">
                        To install: tap the <span className="font-bold text-foreground inline-flex items-center gap-1">Share icon <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" x2="12" y1="2" y2="15" /></svg></span> below and select <span className="font-bold text-foreground">"Add to Home Screen"</span>.
                    </div>
                </div>
            </div>
        );
    }

    // Android/Chrome Banner
    return (
        <div className="fixed bottom-6 left-4 right-4 z-50 animate-in slide-in-from-bottom-8 duration-500">
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">Install Kneel</h3>
                        <p className="text-xs text-muted-foreground line-clamp-1">Fast access & offline support</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="h-9 px-3 text-muted-foreground" onClick={handleDismiss}>
                        Later
                    </Button>
                    <Button size="sm" className="rounded-full px-4 h-9 shadow-lg shadow-primary/20" onClick={handleInstallClick}>
                        Install
                    </Button>
                </div>
            </div>
        </div>
    );
}
