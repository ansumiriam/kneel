import { navigateTo } from '../utils/router';
import { markWelcomeSeen } from '../services/storage';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';

export function WelcomeScreen() {
    const handleGetStarted = () => {
        markWelcomeSeen();
        navigateTo('setup-pin');
    };

    return (
        <div className="flex flex-col items-center justify-between h-full p-8 bg-background text-foreground animate-in fade-in duration-700">

            {/* Top spacer */}
            <div />

            {/* Main content */}
            <div className="w-full max-w-sm flex flex-col items-center space-y-8 text-center">

                {/* App name */}
                <div className="space-y-2">
                    <h1 className="text-5xl font-bold tracking-tight text-primary">Kneel</h1>
                    <p className="text-lg text-muted-foreground italic">
                        A private space for your conscience.
                    </p>
                </div>

                {/* Privacy promise */}
                <div className="flex flex-col items-center space-y-3 px-4">
                    <ShieldCheck className="w-10 h-10 text-primary opacity-80" />
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        Everything you write stays <span className="text-foreground font-medium">only on this device</span>.
                        Nothing is ever sent to a server or shared.
                    </p>
                </div>

                {/* PIN callout */}
                <div className="w-full rounded-xl border border-border bg-muted/40 px-5 py-4 space-y-1">
                    <p className="text-sm font-semibold text-foreground">First, set your PIN</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        You'll create a 4-digit PIN to lock the app.
                        Only you will be able to open it.
                    </p>
                </div>
            </div>

            {/* CTA footer */}
            <div className="w-full max-w-sm space-y-3">
                <Button
                    className="w-full"
                    size="lg"
                    onClick={handleGetStarted}
                >
                    Set My PIN
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                    You can change your PIN anytime in Settings.
                </p>
            </div>

        </div>
    );
}
