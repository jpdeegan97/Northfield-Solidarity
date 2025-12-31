import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Import all engine views
import GGPView from "../engines/GGPView";
import IDNView from "../engines/IDNView";
import PIEView from "../engines/PIEView";
import DATView from "../engines/DATView";
import MUXView from "../engines/MUXView";
import SIGView from "../engines/SIGView";
import SIMView from "../engines/SIMView";
import FLOView from "../engines/FLOView";
import DREView from "../engines/DREView";
import INTView from "../engines/INTView";
import CWPView from "../engines/CWPView";
import BCPView from "../engines/BCPView";
import LUMView from "../engines/LUMView";
import PTEView from "../engines/PTEView";
import MRFPEView from "../engines/MRFPEView";
import PECAView from "../engines/PECAView";
import DEPView from "../engines/DEPView";
import INCView from "../engines/INCView";
import CRNView from "../engines/CRNView";
import DTView from "../engines/DTView";
import IDEView from "../engines/IDEView";
import FirmamentCockpit from "../engines/FirmamentCockpit";
import MINTView from "../engines/MINTView";
import ManifoldView from "../engines/ManifoldView";
import APMView from "../engines/APMView";
import AegisView from "../engines/AegisView";
import RelayView from "../engines/RelayView";
import BoomView from "../engines/BoomView";
import TineView from "../engines/TineView";
import FLView from "../engines/FLView";
import HPView from "../engines/HPView";
import ASCView from "../engines/ASCView";
import EngineOverlay from "../../components/EngineOverlay";

import { ALL_ENGINES } from "../../data/engineRegistry";
import { X } from "lucide-react";

export default function EngineRoute() {
    const { code } = useParams();
    const upperCode = code?.toUpperCase();

    useEffect(() => {
        document.title = `NS | ${upperCode}`;
    }, [upperCode]);

    const engineData = ALL_ENGINES.find(e => e.code === upperCode) || { name: upperCode, code: upperCode };
    const props = { engine: engineData };

    // Firmament State Management
    const [firmamentLayers, setFirmamentLayers] = useState({
        entities: true,
        sectors: true,
        risks: true,
        events: true,
        manifold: true,
        apm: true
    });

    // Window Management (2D Grid)
    const [activeWindows, setActiveWindows] = useState([]);

    const toggleFirmamentLayer = (id) => {
        setFirmamentLayers(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const launchWindow = (engineCode) => {
        setActiveWindows(prev => [...prev, { code: engineCode, id: Date.now() }]);
    };

    const closeWindow = (index) => {
        setActiveWindows(prev => prev.filter((_, i) => i !== index));
    };

    // Helper to get component by code
    const getEngineComponent = (code, extraProps = {}) => {
        const eData = ALL_ENGINES.find(e => e.code === code) || { name: code, code };
        const p = { engine: eData, ...extraProps };

        switch (code) {
            case 'FIRMAMENT': return <FirmamentCockpit {...p} activeLayers={firmamentLayers} onToggleLayer={toggleFirmamentLayer} onLaunch={launchWindow} />;
            case 'PIE': return <PIEView {...p} />;
            case 'DAT': return <DATView {...p} />;
            case 'APM': return <APMView {...p} />;
            case 'MUX': return <MUXView {...p} />;
            case 'SIG': return <SIGView {...p} />;
            case 'SIM': return <SIMView {...p} />;
            case 'GGP': return <GGPView {...p} />;
            case 'IDN': return <IDNView {...p} />;
            case 'FLO': return <FLOView {...p} />;
            case 'DRE': return <DREView {...p} />;
            case 'INT': return <INTView {...p} />;
            case 'CWP': return <CWPView {...p} />;
            case 'BCP': return <BCPView {...p} />;
            case 'LUM': return <LUMView {...p} />;
            case 'PTE': return <PTEView {...p} />;
            case 'MRFPE': return <MRFPEView {...p} />;
            case 'PECA': return <PECAView {...p} />;
            case 'DEP': return <DEPView {...p} />;
            case 'INC': return <INCView {...p} />;
            case 'CRN': return <CRNView {...p} />;
            case 'DT': return <DTView {...p} />;
            case 'IDE': return <IDEView {...p} />;
            case 'MINT': return <MINTView {...p} />;
            case 'MTR': return <ManifoldView {...p} />;
            case 'MT': return <ManifoldView {...p} />;

            // POC Implementations
            case 'AEGIS': return <AegisView {...p} />;
            case 'RELAY': return <RelayView {...p} />;
            case 'BOOM': return <BoomView {...p} />;
            case 'TINE': return <TineView {...p} />;
            case 'FL': return <FLView {...p} />;
            case 'HP': return <HPView {...p} />;
            case 'ASC': return <ASCView {...p} />;

            default: return <EngineOverlay {...p} />;
        }
    };

    if (upperCode === 'FIRMAMENT') {
        // If windows are active, show the 2D Grid
        if (activeWindows.length > 0) {
            return (
                <div className="w-full h-screen bg-[#111] p-4 overflow-hidden flex flex-col">
                    {/* Grid Layout - Auto Sizing */}
                    <div className="flex-1 grid gap-4 place-items-stretch" style={{
                        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(activeWindows.length))}, 1fr)`,
                        gridTemplateRows: `repeat(${Math.ceil(activeWindows.length / Math.ceil(Math.sqrt(activeWindows.length)))}, 1fr)`
                    }}>
                        {activeWindows.map((win, idx) => (
                            <div key={win.id} className="relative bg-[#1e1e1e] border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
                                {/* Header */}
                                <div className="h-8 bg-black/40 border-b border-white/5 flex items-center justify-between px-3 shrink-0">
                                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                                        {win.code}
                                    </span>
                                    <button
                                        onClick={() => closeWindow(idx)}
                                        className="text-white/20 hover:text-red-400 transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                                {/* Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    {getEngineComponent(win.code, { isWindow: true })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Otherwise, show standard Firmament
        return (
            <div className="w-full h-screen bg-[#1e1e1e] overflow-hidden">
                <FirmamentCockpit
                    {...props}
                    activeLayers={firmamentLayers}
                    onToggleLayer={toggleFirmamentLayer}
                    onLaunch={launchWindow}
                />
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-[#1e1e1e] overflow-hidden">
            {getEngineComponent(upperCode)}
        </div>
    );
}
