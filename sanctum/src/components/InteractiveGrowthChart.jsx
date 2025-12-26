import React, { useState } from 'react';

export default function InteractiveGrowthChart() {
    // 0 = Conservative, 1 = Base, 2 = Aggressive
    const [scenario, setScenario] = useState(1);

    const handleSliderChange = (e) => {
        setScenario(parseInt(e.target.value));
    };

    const getScenarioLabel = () => {
        if (scenario === 0) return "Conservative";
        if (scenario === 1) return "Base Case";
        if (scenario === 2) return "Aggressive";
        return "Base Case";
    };

    // Data points approximating the curve (simplified for implementation)
    // Each scenario has a set of heights (percentages relative to max container height)
    /* 
       Conservative: Slower exponential growth
       Base: Moderate exponential growth
       Aggressive: Rapid exponential growth
    */
    const scenarios = {
        0: [5, 7, 10, 15, 22, 30, 40, 52, 65, 80],
        1: [5, 8, 14, 25, 38, 55, 75, 85, 92, 100],
        2: [5, 12, 25, 45, 70, 95, 100, 100, 100, 100]
    };

    // Labels for X-axis (Months/Quarters)
    const labels = ["Q1'25", "Q2'25", "Q3'25", "Q4'25", "Q1'26", "Q2'26", "Q3'26", "Q4'26", "Q1'27", "Q2'27"];

    const currentData = scenarios[scenario];

    return (
        <div className="interactive-chart-wrapper">
            <div className="chart-controls">
                <div className="control-header">
                    <span className="control-label">Growth Scenario</span>
                    <span className={`scenario-badge scenario-${scenario}`}>{getScenarioLabel()}</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    value={scenario}
                    onChange={handleSliderChange}
                    className="slider"
                />
                <div className="slider-labels">
                    <span>Low</span>
                    <span>Base</span>
                    <span>High</span>
                </div>
            </div>

            <div className="chart-visualization">
                {/* Y-axis Label */}
                <div className="y-axis-label">User Count / MRR</div>

                {/* Bars */}
                <div className="bars-container">
                    {currentData.map((height, index) => (
                        <div key={index} className="chart-bar-group">
                            <div className="chart-bar-track">
                                <div
                                    className={`chart-bar-fill scenario-${scenario}`}
                                    style={{ height: `${height}%` }}
                                >
                                    <div className="tooltip">
                                        {scenario === 0 ? `$${(30 + height * 2)}k` :
                                            scenario === 1 ? `$${(35 + height * 4)}k` :
                                                `$${(40 + height * 7)}k`}
                                    </div>
                                </div>
                            </div>
                            <div className="chart-bar-label">{labels[index]}</div>
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
                    margin-bottom: var(--space-8);
                    border-bottom: 1px solid var(--c-border);
                    padding-bottom: var(--space-6);
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
                .scenario-0 { background: #64748b; } /* Conservative - Slate */
                .scenario-1 { background: var(--c-brand); } /* Base - Brand Color */
                .scenario-2 { background: #10b981; } /* Aggressive - Emerald */

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
                    padding-left: 20px; /* Space for Y-axis label */
                }

                .y-axis-label {
                    position: absolute;
                    left: -30px;
                    top: 50%;
                    transform: rotate(-90deg);
                    font-size: 0.75rem;
                    color: var(--c-text-sub);
                    letter-spacing: 0.1em;
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
                    height: 90%; /* Max bar height area */
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
                }

                .chart-bar-fill.scenario-0 { background: #94a3b8; }
                .chart-bar-fill.scenario-1 { background: var(--c-brand); }
                .chart-bar-fill.scenario-2 { background: #34d399; }

                .tooltip {
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translate(-50%, 0);
                    background: var(--c-surface);
                    border: 1px solid var(--c-border);
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.7rem;
                    font-weight: 600;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.2s ease;
                    z-index: 10;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                }

                .chart-bar-label {
                    margin-top: 10px;
                    font-size: 0.65rem;
                    color: var(--c-text-sub);
                    transform: rotate(-45deg); /* Optional for tight labels */
                    transform-origin: top left;
                    width: 100%;
                    text-align: center;
                    white-space: nowrap;
                }
            `}</style>
        </div>
    );
}
