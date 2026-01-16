export function formatDate(dateStr: string | null): string {
    if (!dateStr) return 'Tap to set';

    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch {
        return 'Invalid date';
    }
}

export function getTodayISO(): string {
    return new Date().toISOString().split('T')[0];
}

export function getDaysSinceConfession(dateStr: string | null): number | null {
    if (!dateStr) return null;

    const confessionDate = new Date(dateStr);
    const today = new Date();
    const diffTime = today.getTime() - confessionDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}
