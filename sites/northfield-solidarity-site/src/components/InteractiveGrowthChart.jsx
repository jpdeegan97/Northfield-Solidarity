import React, { useState, useMemo } from 'react';
import { FinancialModel, SCENARIOS } from '../logic/FinancialModel';

export default function InteractiveGrowthChart() {
    // 0 = Conservative, 1 = Base, 2 = Aggressive
    const [scenarioIndex, setScenarioIndex] = useState(1);

    // Map slider index to Scenario Keys
    const SCENARIO_KEYS = ['CONSERVATIVE', 'BASE', 'AGGRESSIVE'];

    // Generate Data Dynamically
    const modelData = useMemo(() => {
        const key = SCENARIO_KEYS[scenarioIndex];
        const model = new FinancialModel(key);
        return model.runProjection();
    }, [scenarioIndex]);

    // Normalize data for visualization (height %)
    const vizData = useMemo(() => {
        const maxRev = Math.max(...modelData.timeline.map(t => t.metrics.totalRevenue));
        // We filter to show roughly 10-12 points so chart isn't crowded, or just show all if css handles it.
        // Let's take every 2nd month to fit the 24 month projection into ~12 bars
        return modelData.timeline.filter((_, i) => i % 2 === 0).map(point => ({
            ...point,
            heightPct: (point.metrics.totalRevenue / maxRev) * 100
        }));
    }, [modelData]);

    const activeConfig = SCENARIOS[SCENARIO_KEYS[scenarioIndex]];

    return (
        <div className="interactive-chart-wrapper">
            <div className="chart-controls">
                <div className="control-header">
                    <span className="control-label">Growth Scenario</span>
                    <span className={`scenario-badge scenario-${scenarioIndex}`}>{modelData.scenario}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={scenarioIndex}
                    onChange={(e) => setScenarioIndex(parseInt(e.target.value))}
                    className="slider"
                />
                <div className="slider-labels">
                    <span>Conservative</span>
                    <span>Base Case</span>
                    <span>Aggressive</span>
                </div>
            </div>

            {/* Model Assumptions Readout */}
            <div className="model-assumptions">
                <div className="assumption-item">
                    <span className="lbl">MoM Growth</span>
                    <span className="val">{(activeConfig.growthRate * 100).toFixed(0)}%</span>
                </div>
                <div className="assumption-item">
                    <span className="lbl">Exp. ARPU</span>
                    <span className="val">${activeConfig.arpu}</span>
                </div>
                <div className="assumption-item">
                    <span className="lbl">Churn</span>
                    <span className="val">{(activeConfig.churn * 100).toFixed(1)}%</span>
                </div>
            </div>

            <div className="chart-visualization">
                {/* Y-axis Label */}
                <div className="y-axis-label">Monthly Revenue (USD)</div>

                {/* Bars */}
                <div className="bars-container">
                    {vizData.map((point, index) => (
                        <div key={index} className="chart-bar-group">
                            <div className="chart-bar-track">
                                <div
                                    className={`chart-bar-fill scenario-${scenarioIndex}`}
                                    style={{ height: `${Math.max(4, point.heightPct)}%` }} // Min height 4% for visibility
                                >
                                    <div className="tooltip">
                                        <div className="tt-header">{point.label}</div>
                                        <div className="tt-row">Rev: ${(point.metrics.totalRevenue / 1000).toFixed(1)}k</div>
                                        <div className="tt-row">Users: {point.metrics.activeUsers}</div>
                                        <div className="tt-row dim">MRR: ${(point.metrics.mrr / 1000).toFixed(1)}k</div>
                                    </div>
                                </div>
                            </div>
                            <div className="chart-bar-label">{point.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .interactive-chart-wrapper {
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    border-radius: var(--radius-lg);
                    padding: var(--space-6);
                    margin-top: var(--space-4);
                }

                .chart-controls {
                    margin-bottom: var(--space-6);
                    border-bottom: 1px solid var(--c-border);
                    padding-bottom: var(--space-6);
                }

                .model-assumptions {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                    background: rgba(0,0,0,0.2);
                    padding: 1rem;
                    border-radius: 8px;
                    border: 1px solid var(--c-border);
                }

                .assumption-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }

                .assumption-item .lbl {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    color: var(--c-text-sub);
                    margin-bottom: 4px;
                }

                .assumption-item .val {
                    font-family: monospace;
                    font-size: 1.1rem;
                    font-weight: 700;
                    color: var(--c-brand);
                }

                .control-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: var(--space-4);
                }

                .control-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--c-text-sub);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                .scenario-badge {
                    font-size: 0.8rem;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-weight: 600;
                    color: #fff;
                    transition: background 0.3s ease;
                }
                .scenario-0 { background: #64748b; } /* Conservative */
                .scenario-1 { background: var(--c-brand); } /* Base */
                .scenario-2 { background: #10b981; } /* Aggressive */

                .slider {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    border-radius: 5px;
                    background: var(--c-border);
                    outline: none;
                    margin-bottom: var(--space-2);
                }
                .slider::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    appearance: none;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: var(--c-text);
                    cursor: pointer;
                    border: 2px solid var(--c-bg);
                    box-shadow: 0 0 0 2px var(--c-border);
                }

                .slider-labels {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.75rem;
                    color: var(--c-text-sub);
                }

                .chart-visualization {
                    position: relative;
                    height: 300px;
                    padding-left: 20px;
                }

                .y-axis-label {
                    position: absolute;
                    left: -40px;
                    top: 50%;
                    transform: rotate(-90deg);
                    font-size: 0.75rem;
                    color: var(--c-text-sub);
                    letter-spacing: 0.1em;
                    width: 150px;
                    text-align: center;
                }

                .bars-container {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    height: 100%;
                    gap: 8px;
                }

                .chart-bar-group {
                    flex: 1;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    align-items: center;
                }

                .chart-bar-track {
                    width: 100%;
                    height: 90%;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    border-bottom: 1px solid var(--c-border);
                }

                .chart-bar-fill {
                    width: 60%;
                    background: var(--c-brand);
                    border-radius: 4px 4px 0 0;
                    transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease;
                    position: relative;
                }
                .chart-bar-fill:hover .tooltip {
                    opacity: 1;
                    transform: translate(-50%, -10px);
                    pointer-events: auto;
                }

                .chart-bar-fill.scenario-0 { background: #94a3b8; }
                .chart-bar-fill.scenario-1 { background: var(--c-brand); }
                .chart-bar-fill.scenario-2 { background: #34d399; }

                .tooltip {
                    position: absolute;
                    top: -90px;
                    left: 50%;
                    transform: translate(-50%, 0);
                    background: rgba(15, 23, 42, 0.95);
                    border: 1px solid var(--c-border);
                    padding: 8px 12px;
                    border-radius: 6px;
                    font-size: 0.75rem;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.2s ease;
                    z-index: 20;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
                    min-width: 120px;
                }

                .tt-header {
                    font-weight: 700;
                    color: #fff;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                    padding-bottom: 4px;
                    margin-bottom: 4px;
                    text-align: center;
                }

                .tt-row {
                    display: flex;
                    justify-content: space-between;
                    color: var(--c-text);
                    margin-bottom: 2px;
                }
                .tt-row.dim {
                    color: var(--c-text-sub);
                    font-size: 0.7rem;
                }

                .chart-bar-label {
                    margin-top: 10px;
                    font-size: 0.65rem;
                    color: var(--c-text-sub);
                    transform: rotate(-45deg);
                    transform-origin: top left;
                    width: 100%;
                    text-align: center;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}
