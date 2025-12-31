import { Outlet } from "react-router-dom";
import ActivePersonnelWidget from "../components/ActivePersonnelWidget.jsx";
import { SecurityProvider } from "../context/SecurityContext.jsx";

export default function AppShell() {
    return (
        <SecurityProvider>
            <div className="app-shell">
                <Outlet />
                <ActivePersonnelWidget />
            </div>
        </SecurityProvider>
    );
}
