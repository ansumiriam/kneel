import { Router, Route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { initTheme } from './screens/SettingsScreen';

// Screens
import { LockScreen } from './screens/LockScreen';
import { PrivacyCheckScreen } from './screens/PrivacyCheckScreen';
import { HomeScreen } from './screens/HomeScreen';
import { SetupPinScreen } from './screens/SetupPinScreen';
import { AddSinScreen } from './screens/AddSinScreen';
import { EditSinScreen } from './screens/EditSinScreen';
import { ConfirmClearScreen } from './screens/ConfirmClearScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { PrepareScreen } from './screens/PrepareScreen';
import { RecoverPinScreen } from './screens/RecoverPinScreen';
import { GuideScreen } from './screens/GuideScreen';
import { PrayerScreen } from './screens/PrayerScreen';

export function App() {
    useEffect(() => {
        // Initialize theme
        initTheme();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground antialiased font-sans select-none">
            <Router>
                <Route path="/" component={LockScreen} />
                <Route path="/privacy-check" component={PrivacyCheckScreen} />
                <Route path="/home" component={HomeScreen} />
                <Route path="/setup-pin" component={SetupPinScreen} />

                <Route path="/add-sin" component={AddSinScreen} />
                <Route path="/edit-sin" component={EditSinScreen} />
                <Route path="/confirm-clear" component={ConfirmClearScreen} />
                <Route path="/settings" component={SettingsScreen} />
                <Route path="/prepare" component={PrepareScreen} />
                <Route path="/recover-pin" component={RecoverPinScreen} />

                <Route path="/guide" component={GuideScreen} />
                <Route path="/prayer" component={PrayerScreen} />
            </Router>
        </div>
    );
}
