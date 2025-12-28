import { Outlet } from "react-router-dom";
import ChatWidget from "../components/ChatWidget.jsx";
import ActivePersonnelWidget from "../components/ActivePersonnelWidget.jsx";
import { SecurityProvider } from "../context/SecurityContext.jsx";

export default function AppShell() {
    return (
        <SecurityProvider>
            <div className="app-shell">
                <Outlet />
                <ChatWidget />
                <ActivePersonnelWidget />
            </div>
        </SecurityProvider>
    );
}
