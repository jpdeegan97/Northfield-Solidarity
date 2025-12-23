
import { Outlet } from "react-router-dom";
import ChatWidget from "../components/ChatWidget.jsx";

export default function AppShell() {
    return (
        <div className="app-shell">
            <Outlet />
            <ChatWidget />
        </div>
    );
}
