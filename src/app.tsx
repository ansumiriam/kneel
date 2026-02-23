import { Router, Route } from 'preact-router';
import { useEffect } from 'preact/hooks';
import { initTheme } from './screens/SettingsScreen';

// Screens
import { LockScreen } from './screens/LockScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
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

import { PWAInstaller } from './components/PWAInstaller';

export function App() {
    useEffect(() => {
        // Initialize theme
        initTheme();
    }, []);

    const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL.slice(0, -1) : import.meta.env.BASE_URL;

    return (
        <div className="relative w-full h-[100dvh] overflow-hidden bg-background text-foreground antialiased font-sans select-none">
            <Router>
                <Route path={`${base}/`} component={LockScreen} />
                <Route path={`${base}/welcome`} component={WelcomeScreen} />
                <Route path={`${base}/privacy-check`} component={PrivacyCheckScreen} />
                <Route path={`${base}/home`} component={HomeScreen} />
                <Route path={`${base}/setup-pin`} component={SetupPinScreen} />

                <Route path={`${base}/add-sin`} component={AddSinScreen} />
                <Route path={`${base}/edit-sin`} component={EditSinScreen} />
                <Route path={`${base}/confirm-clear`} component={ConfirmClearScreen} />
                <Route path={`${base}/settings`} component={SettingsScreen} />
                <Route path={`${base}/prepare`} component={PrepareScreen} />
                <Route path={`${base}/recover-pin`} component={RecoverPinScreen} />

                <Route path={`${base}/guide`} component={GuideScreen} />
                <Route path={`${base}/prayer`} component={PrayerScreen} />
            </Router>
            <PWAInstaller />
        </div>
    );
}
