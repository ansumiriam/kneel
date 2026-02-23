import { navigateTo } from '../utils/router';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

export function PrivacyCheckScreen() {
    return (
        <div className="flex flex-col h-full max-w-md mx-auto items-center justify-center p-8 bg-background text-foreground text-center animate-in fade-in duration-500">

            <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                <h1 className="text-4xl font-serif font-bold tracking-tight text-primary">
                    This is a private moment.
                </h1>
                <p className="text-xl text-muted-foreground">
                    Are you in a place where you can reflect freely?
                </p>
            </div>

            <div className="w-full space-y-4 mb-12">
                <Button
                    size="lg"
                    className="w-full h-14 text-lg font-semibold rounded-2xl"
                    onClick={() => navigateTo('home')}
                >
                    <Check className="mr-2 h-5 w-5" /> Yes, I am
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="w-full h-14 text-lg font-medium rounded-2xl"
                    onClick={() => navigateTo('lock')}
                >
                    <X className="mr-2 h-5 w-5" /> Later
                </Button>
            </div>
        </div>
    );
}
