import React, { useState } from 'react';
import Section from '../../components/Section';
import EngineOverlay from '../../components/EngineOverlay';
import { Hexagon, Plus, Layers, ShieldCheck, Share2, DollarSign } from 'lucide-react';

export default function MINTView({ engine }) {
    const [entities, setEntities] = useState([]);

    // Mock Entity Creation for Demo
    const createEntity = () => {
        const newEntity = {
            id: `ENT-${entities.length + 1}`,
            name: 'New Entity',
            type: 'LLC',
            jurisdiction: 'Delaware',
            status: 'Forming',
            shares: 1000000
        };
        setEntities([...entities, newEntity]);
    };

    return (
        <EngineOverlay engine={engine}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full p-4 overflow-y-auto custom-scrollbar">

                {/* Control Panel */}
                <Section title="Formation Controls" icon={Hexagon}>
                    <div className="space-y-4">
                        <button
                            onClick={createEntity}
                            className="w-full py-4 bg-[#00ff9d]/20 border border-[#00ff9d] text-[#00ff9d] font-bold tracking-widest hover:bg-[#00ff9d]/30 transition-all flex items-center justify-center gap-2"
                        >
                            <Plus size={18} /> INITIATE FORMATION
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 border border-white/10 rounded">
                                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Standard</div>
                                <div className="text-white font-bold text-lg">Delaware LLC</div>
                            </div>
                            <div className="bg-white/5 p-4 border border-white/10 rounded">
                                <div className="text-white/40 text-xs uppercase tracking-widest mb-1">Cost</div>
                                <div className="text-[#00ff9d] font-bold text-lg">$450.00</div>
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Entity Ledger */}
                <Section title="Active Entities" icon={Layers}>
                    <div className="space-y-2">
                        {entities.length === 0 && (
                            <div className="text-white/20 text-center py-8 italic">No active entities in formation pipeline.</div>
                        )}
                        {entities.map(ent => (
                            <div key={ent.id} className="bg-black/40 border border-white/10 p-4 rounded flex items-center justify-between">
                                <div>
                                    <div className="font-bold text-white text-lg">{ent.name}</div>
                                    <div className="text-white/40 text-xs uppercase tracking-wider">{ent.type} • {ent.jurisdiction}</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-xs font-bold uppercase tracking-widest border border-yellow-400/30 bg-yellow-400/10 px-2 py-1 rounded">{ent.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* Cap Table Preview */}
                <Section title="Cap Table Structure" icon={Share2}>
                    <div className="h-64 flex items-center justify-center border border-white/10 bg-black/20 rounded">
                        <div className="text-white/30 text-xs uppercase tracking-widest">Cap Table Visualization Module</div>
                    </div>
                </Section>

                {/* Banking Integration */}
                <Section title="Banking & Treasury" icon={DollarSign}>
                    <div className="h-64 flex items-center justify-center border border-white/10 bg-black/20 rounded">
                        <div className="text-white/30 text-xs uppercase tracking-widest">Treasury API Disconnected</div>
                    </div>
                </Section>
            </div>
        </EngineOverlay>
    );
}
