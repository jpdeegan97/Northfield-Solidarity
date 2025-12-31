import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

// Import all engine views
import GGPView from "../engines/GGPView";
import IDNView from "../engines/IDNView";
import PIEView from "../engines/PIEView";
import ATLView from "../engines/ATLView";
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
import FRKView from "../engines/FRKView";
import INCView from "../engines/INCView";
import CRNView from "../engines/CRNView";
import IDEView from "../engines/IDEView";
import FirmamentCockpit from "../engines/FirmamentCockpit";
import HPView from "../engines/HPView";
import ASCView from "../engines/ASCView";
import ManifoldView from "../engines/ManifoldView";
import FLView from "../engines/FLView";
import RELAYView from "../engines/RELAYView";
import AEGISView from "../engines/AEGISView";
import BOOMERANGView from "../engines/BOOMERANGView";
import DTView from "../engines/DTView";
import TineView from "../engines/TineView";
import VantageCapitalView from "../engines/VantageCapitalView";
import EngineOverlay from "../../components/EngineOverlay";

import { ALL_ENGINES } from "@shared/data/engineRegistry";

export default function EngineRoute() {
    const { code } = useParams();
    const upperCode = code?.toUpperCase();

    useEffect(() => {
        document.title = `NS | ${upperCode}`;
    }, [upperCode]);



    // Common props logic moved into renderEngine function
    // const props = { engine: engineData }; // Unused

    // State for managing active windows (Desktop Metaphor)
    const [activeWindows, setActiveWindows] = React.useState([]);

    const launchWindow = (engineCode) => {
        setActiveWindows(prev => [...prev, { code: engineCode, id: Date.now() }]);
    };

    const closeWindow = (index) => {
        setActiveWindows(prev => prev.filter((_, i) => i !== index));
    };

    const renderEngine = (code, extraProps = {}) => {
        const eData = ALL_ENGINES.find(e => e.code === code) || { name: code, code };
        const p = { engine: eData, ...extraProps };

        switch (code) {
            case 'FIRMAMENT': return (
                <FirmamentCockpit
                    {...p}
                    activeLayers={{ entities: true, sectors: true, risks: true, events: true }}
                    onOpenWindow={launchWindow}
                />
            );
            case 'PIE': return <PIEView {...p} />;
            case 'ATL': return <ATLView {...p} />;
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
            case 'FRK': return <FRKView {...p} />;
            case 'INC': return <INCView {...p} />;
            case 'CRN': return <CRNView {...p} />;
            case 'IDE': return <IDEView {...p} />;
            case 'HP': return <HPView {...p} />;
            case 'ASC': return <ASCView {...p} />;
            case 'MT': return <ManifoldView {...p} />;
            case 'FL': return <FLView {...p} />;
            case 'RL': return <RELAYView {...p} />;
            case 'AEGIS': return <AEGISView {...p} />;
            case 'BOOM': return <BOOMERANGView {...p} />;
            case 'DT': return <DTView {...p} />;
            case 'TINE': return <TineView {...p} />;
            case 'VC': return <VantageCapitalView {...p} />;
            default: return <EngineOverlay {...p} />;
        }
    };

    // If viewing Firmament, we handle the Window Overlay logic
    if (upperCode === 'FIRMAMENT') {
        if (activeWindows.length > 0) {
            return (
                <div className="w-full h-screen bg-[#111] p-4 overflow-hidden flex flex-col">
                    {/* Grid Layout for Windows */}
                    <div className="flex-1 grid gap-4 place-items-stretch" style={{
                        gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(activeWindows.length))}, 1fr)`,
                        gridTemplateRows: `repeat(${Math.ceil(activeWindows.length / Math.ceil(Math.sqrt(activeWindows.length)))}, 1fr)`
                    }}>
                        {activeWindows.map((win, idx) => (
                            <div key={win.id} className="relative bg-[#1e1e1e] border border-white/10 rounded-lg overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-300">
                                {/* Window Header */}
                                <div className="h-8 bg-black/40 border-b border-white/5 flex items-center justify-between px-3 shrink-0">
                                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                                        {win.code}
                                    </span>
                                    <button
                                        onClick={() => closeWindow(idx)}
                                        className="text-white/20 hover:text-red-400 transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                                {/* Window Content */}
                                <div className="flex-1 overflow-hidden relative">
                                    {renderEngine(win.code, { isWindow: true })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }

        // Standard Desktop View (No windows open)
        return (
            <div className="w-full h-screen bg-[#1e1e1e] overflow-hidden">
                {renderEngine('FIRMAMENT')}
            </div>
        );
    }

    return (
        <div className="w-full h-screen bg-[#1e1e1e] overflow-hidden">
            {renderEngine(upperCode)}
        </div>
    );
}
