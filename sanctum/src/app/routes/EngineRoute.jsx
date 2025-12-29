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
import FRKView from "../engines/FRKView";
import INCView from "../engines/INCView";
import CRNView from "../engines/CRNView";
import IDEView from "../engines/IDEView";
import FirmamentCockpit from "../engines/FirmamentCockpit";
import MINTView from "../engines/MINTView";
import ManifoldView from "../engines/ManifoldView";
import APMView from "../engines/APMView";
import EngineOverlay from "../../components/EngineOverlay";

import { ALL_ENGINES } from "../../data/engineRegistry";

export default function EngineRoute() {
    const { code } = useParams();
    const upperCode = code?.toUpperCase();

    useEffect(() => {
        document.title = `NS | ${upperCode}`;
    }, [upperCode]);

    const engineData = ALL_ENGINES.find(e => e.code === upperCode) || { name: upperCode, code: upperCode };

    // Common props for full-screen view
    const props = { engine: engineData };

    // Firmament State Management
    const [firmamentLayers, setFirmamentLayers] = useState({
        entities: true,
        sectors: true,
        risks: true,
        events: true,
        manifold: true, // Enable Manifold Trace by default
        apm: true // Enable APM by default
    });

    const toggleFirmamentLayer = (id) => {
        setFirmamentLayers(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const renderEngine = () => {
        switch (upperCode) {
            case 'FIRMAMENT': return <FirmamentCockpit
                {...props}
                activeLayers={firmamentLayers}
                onToggleLayer={toggleFirmamentLayer}
            />;
            case 'PIE': return <PIEView {...props} />;
            case 'DAT': return <DATView {...props} />;
            case 'APM': return <APMView {...props} />;
            case 'MUX': return <MUXView {...props} />;
            case 'SIG': return <SIGView {...props} />;
            case 'SIM': return <SIMView {...props} />;
            case 'GGP': return <GGPView {...props} />;
            case 'IDN': return <IDNView {...props} />;
            case 'FLO': return <FLOView {...props} />;
            case 'DRE': return <DREView {...props} />;
            case 'INT': return <INTView {...props} />;
            case 'CWP': return <CWPView {...props} />;
            case 'BCP': return <BCPView {...props} />;
            case 'LUM': return <LUMView {...props} />;
            case 'PTE': return <PTEView {...props} />;
            case 'MRFPE': return <MRFPEView {...props} />;
            case 'PECA': return <PECAView {...props} />;
            case 'FRK': return <FRKView {...props} />;
            case 'INC': return <INCView {...props} />;
            case 'CRN': return <CRNView {...props} />;
            case 'IDE': return <IDEView {...props} />;
            case 'MINT': return <MINTView {...props} />;
            case 'MTR': return <ManifoldView {...props} />;
            default: return <EngineOverlay {...props} />;
        }
    };

    return (
        <div className="w-full h-screen bg-[#1e1e1e] overflow-hidden">
            {renderEngine()}
        </div>
    );
}
