import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { cn } from '@/lib/utils';
import { navigateTo } from '../utils/router';

interface PinKeypadProps {
    pin: string;
    error?: string;
    onPress: (key: string | number) => void;
    showForgot?: boolean;
    maxLength?: number;
}

export function PinKeypad({
    pin,
    error,
    onPress,
    showForgot = false,
    maxLength = 4
}: PinKeypadProps) {
    return (
        <div className="w-full max-w-sm flex flex-col items-center">
            {/* PIN Display */}
            <div className="flex gap-4 my-8">
                {Array.from({ length: maxLength }).map((_, index) => (
                    <div
                        key={index}
                        className={cn(
                            "w-4 h-4 rounded-full border-2 border-primary transition-all duration-300",
                            index < pin.length ? "bg-primary scale-110" : "bg-transparent scale-100",
                            error && "border-destructive"
                        )}
                    />
                ))}
            </div>

            {/* Error Message */}
            <div className="h-6 text-sm font-medium text-destructive text-center mb-4">
                {error}
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-4 w-full px-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <Button
                        key={num}
                        variant="outline"
                        className="h-16 text-2xl font-light rounded-full hover:bg-muted/50 transition-colors"
                        onClick={() => onPress(num)}
                    >
                        {num}
                    </Button>
                ))}
                <div /> {/* Empty slot */}
                <Button
                    variant="outline"
                    className="h-16 text-2xl font-light rounded-full hover:bg-muted/50 transition-colors"
                    onClick={() => onPress(0)}
                >
                    0
                </Button>
                <Button
                    variant="ghost"
                    className="h-16 rounded-full hover:bg-muted/50 text-muted-foreground"
                    onClick={() => onPress('backspace')}
                    disabled={pin.length === 0}
                >
                    <Delete className="w-8 h-8" />
                </Button>
            </div>

            {/* Forgot PIN */}
            {showForgot && (
                <Button
                    variant="link"
                    className="text-muted-foreground mt-6"
                    onClick={() => navigateTo('recover-pin')}
                >
                    Forgot PIN?
                </Button>
            )}
        </div>
    );
}
