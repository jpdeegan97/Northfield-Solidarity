import React, { useEffect } from "react";
import IDEView from "../engines/IDEView.jsx";

export default function IdeRoute() {
    useEffect(() => {
        document.title = "Northfield IDE";
    }, []);

    return <IDEView />;
}
