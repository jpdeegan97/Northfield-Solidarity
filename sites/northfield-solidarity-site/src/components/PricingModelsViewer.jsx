import React, { useState } from 'react';

// --- Local UI Components ---

const Card = ({ children, className = '' }) => (
    <div className={`bg-[var(--c-surface)] border border-[var(--c-border)] rounded-xl overflow-hidden ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ children, className = '' }) => (
    <div className={`p-6 pb-2 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-lg font-semibold text-[var(--c-brand)] ${className}`}>{children}</h3>
);

const CardContent = ({ children, className = '' }) => (
    <div className={`p-6 pt-2 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = 'default', className = '' }) => {
    const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none";
    const variants = {
        default: "bg-[var(--c-brand)] text-black hover:bg-[var(--c-brand)]/80",
        secondary: "bg-[rgba(255,255,255,0.1)] text-[var(--c-text-sub)] hover:bg-[rgba(255,255,255,0.2)]",
        outline: "text-[var(--c-text)] border border-[var(--c-border)]"
    };
    return (
        <div className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}>
            {children}
        </div>
    );
};

const Separator = ({ className = '' }) => (
    <div className={`h-[1px] w-full bg-[var(--c-border)] my-4 ${className}`} />
);

// Simple Accordion implementation
const Accordion = ({ type, collapsible, className, children }) => {
    const [openItem, setOpenItem] = useState(null);

    const handleToggle = (value) => {
        if (openItem === value && collapsible) {
            setOpenItem(null);
        } else {
            setOpenItem(value);
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {React.Children.map(children, child =>
                React.cloneElement(child, {
                    isOpen: openItem === child.props.value,
                    onToggle: () => handleToggle(child.props.value)
                })
            )}
        </div>
    );
};

const AccordionItem = ({ value, children, isOpen, onToggle }) => {
    return (
        <div className="border border-[var(--c-border)] rounded-lg">
            {React.Children.map(children, child =>
                React.cloneElement(child, { isOpen, onToggle })
            )}
        </div>
    );
};

const AccordionTrigger = ({ children, isOpen, onToggle }) => (
    <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 font-medium transition-all hover:bg-[rgba(255,255,255,0.02)] text-[var(--c-text)]"
    >
        {children}
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
    </button>
);

const AccordionContent = ({ children, isOpen }) => {
    if (!isOpen) return null;
    return <div className="p-4 pt-0 text-sm text-[var(--c-text-sub)]">{children}</div>;
};

// Simple Table
const Table = ({ children }) => <table className="w-full caption-bottom text-sm">{children}</table>;
const TableHeader = ({ children }) => <thead className="[&_tr]:border-b [&_tr]:border-[var(--c-border)]">{children}</thead>;
const TableBody = ({ children }) => <tbody className="[&_tr:last-child]:border-0">{children}</tbody>;
const TableRow = ({ children }) => <tr className="border-b border-[var(--c-border)] transition-colors hover:bg-[rgba(255,255,255,0.02)] data-[state=selected]:bg-muted">{children}</tr>;
const TableHead = ({ children }) => <th className="h-10 px-2 text-left align-middle font-medium text-[var(--c-text-sub)]">{children}</th>;
const TableCell = ({ children, className = '' }) => <td className={`p-2 align-middle text-[var(--c-text)] ${className}`}>{children}</td>;


// --- Content Data ---

const moderateBundleTiers = [
    { plan: "Free", priceMonthly: "$0", seats: "1", credits: "Small", bestFor: "Solo builders trying it" },
    { plan: "Starter", priceMonthly: "$29", seats: "1", credits: "Medium", bestFor: "Serious solo dev" },
    { plan: "Pro", priceMonthly: "$79", seats: "3", credits: "Medium+", bestFor: "Tiny team" },
    { plan: "Team", priceMonthly: "$199", seats: "10", credits: "Large", bestFor: "Small company" },
    { plan: "Business", priceMonthly: "$499", seats: "25", credits: "Very large", bestFor: "Growing org" },
    { plan: "Enterprise", priceMonthly: "Custom", seats: "Unlimited", credits: "Custom", bestFor: "Security + compliance" },
];

const greedyPlatformTiers = [
    { plan: "Free", priceMonthly: "$0", seats: "1", credits: "N/A", bestFor: "Read-only / limited creation; no exports" },
    { plan: "Solo", priceMonthly: "$49", seats: "1", credits: "N/A", bestFor: "Basic creation; limited integrations" },
    { plan: "Pro", priceMonthly: "$199", seats: "3", credits: "N/A", bestFor: "Collab, limited API, basic automations" },
    { plan: "Team", priceMonthly: "$499", seats: "10", credits: "N/A", bestFor: "Workspaces, RBAC-lite, advanced automations" },
    { plan: "Business", priceMonthly: "$1,499", seats: "25", credits: "N/A", bestFor: "RBAC, audit logs, policy controls, premium support" },
    { plan: "Enterprise", priceMonthly: "$4,999+", seats: "50+", credits: "N/A", bestFor: "SSO/SCIM, DLP hooks, SLAs, compliance packs" },
];

const moderateCreditPacks = [
    { pack: "$10", note: "Small pack" },
    { pack: "$50", note: "Medium pack" },
    { pack: "$200", note: "Large pack" },
    { pack: "$500", note: "Org pack" },
];

const greedyCreditPacks = [
    { pack: "$50", note: "Small pack" },
    { pack: "$250", note: "Medium pack" },
    { pack: "$1,000", note: "Large pack" },
    { pack: "$5,000", note: "Org pack" },
];

// Third strategy: Outcome + Marketplace + Rev-Share (Aligned Incentives)
const alignedBundleTiers = [
    { plan: "Free", priceMonthly: "$0", seats: "1", credits: "Tiny", bestFor: "Explore + read-only insights" },
    { plan: "Builder", priceMonthly: "$19", seats: "1", credits: "Small", bestFor: "Low-friction real use" },
    { plan: "Team", priceMonthly: "$99", seats: "10", credits: "Medium", bestFor: "Collaboration + light outcomes" },
    { plan: "Org", priceMonthly: "$399", seats: "50", credits: "Large", bestFor: "Serious org usage" },
    { plan: "Enterprise", priceMonthly: "Custom", seats: "Custom", credits: "Custom", bestFor: "Compliance + SLA" },
];

const alignedRevenueStreams = [
    { title: "Base platform fee", desc: "Low subscription to reduce friction and land quickly." },
    { title: "Outcome pricing", desc: "Success fees tied to measurable wins (opt-in, capped)." },
    { title: "Marketplace take-rate", desc: "Commission on connectors/templates/packs + your own high-margin packs." },
    { title: "Credits for real costs", desc: "Compute/data/storage where cost scales (runs, ingest, retention, runners)." },
];

const alignedOutcomeExamples = [
    {
        engine: "NS-AEGIS",
        examples: [
            "Risk reduction fee based on protected surface area (repos/deps/scan frequency/policy enforcement)",
            "Prevention bonus per prevented high-severity issue before prod (tiered; capped)",
        ],
    },
    {
        engine: "LUM",
        examples: [
            "Incident savings share based on MTTR improvement (percentage; capped)",
            "SLO compliance bonus for sustained target SLO across services (service-count tiered)",
        ],
    },
    {
        engine: "DRE / Rendezvous",
        examples: [
            "Qualified lead fee per verified lead delivered (segment-tiered)",
            "Pipeline success share on closed/won sourced deals (percentage; capped)",
        ],
    },
    {
        engine: "NS-ROAM",
        examples: [
            "Delivery acceleration fee tied to build/release speed uplift (usage-derived; capped)",
            "Optional premium runner priority as credits",
        ],
    },
];

const alignedMarketplace = {
    takeRateRange: "15%–30%",
    items: [
        "Connectors (GitHub/GitLab/Jira/Slack/Notion/cloud)",
        "Compliance packs (SOC2 evidence templates, audit exporters)",
        "Baseline deploy kits (k3s, Caddy, GitOps templates)",
        "Domain-specific DRE packs (vertical radar/briefing bundles)",
        "Automation recipes (GGE/quickscope workflows)",
    ],
};

const greedyFeaturePacks = [
    { name: "Exports Pack", price: "$79/mo", desc: "PDF/CSV/Notion/Confluence/GitHub issues" },
    { name: "API Pack", price: "$99–$299/mo", desc: "Higher limits, webhooks, API access tiers" },
    { name: "Automation Pack", price: "$149/mo", desc: "Workflows + scheduled jobs" },
    { name: "RBAC Pack", price: "$199/mo", desc: "Roles + permissions" },
    { name: "Audit Pack", price: "$199/mo", desc: "Audit logs + retention" },
    { name: "SSO Pack", price: "$499/mo", desc: "SAML + SCIM" },
    { name: "Data Residency Pack", price: "$999/mo", desc: "Regional data controls" },
    { name: "Compliance Pack", price: "$1,999/mo", desc: "SOC2 support artifacts + reporting" },
];

const greedyModules = [
    {
        name: "NS-AEGIS",
        tiers: [
            { label: "Starter", price: "$99/mo", detail: "Up to 10 repos" },
            { label: "Growth", price: "$299/mo", detail: "Up to 50 repos" },
            { label: "Scale", price: "$799/mo", detail: "Up to 250 repos" },
            { label: "Enterprise", price: "Custom", detail: "Policy + compliance + large org" },
        ],
        addons: [
            { label: "SBOM export pack", price: "$79/mo" },
            { label: "Release Radar", price: "$99/mo" },
            { label: "Policy-as-code enforcement", price: "$149/mo" },
        ],
    },
    {
        name: "DRE",
        tiers: [
            { label: "Starter", price: "$149/mo", detail: "Limited briefs + runs" },
            { label: "Pro", price: "$399/mo", detail: "More runs + capabilities" },
            { label: "Team", price: "$999/mo", detail: "Shared workspace + API" },
        ],
        addons: [
            { label: "Alerts + watchlists pack", price: "$49/mo" },
            { label: "Export pack", price: "$79/mo" },
            { label: "Contact finder + outreach drafts", price: "$199/mo" },
        ],
    },
    {
        name: "NS-ROAM",
        tiers: [{ label: "Baseline", price: "$39/seat/mo", detail: "Mobile dev + remote workflow" }],
        addons: [
            { label: "Secure tunnel + device lab", price: "$99/mo" },
            { label: "Priority builds", price: "$79/mo" },
            { label: "Remote build runners", price: "Metered (credits)" },
        ],
    },
    {
        name: "LUM",
        tiers: [
            { label: "Starter", price: "$199/mo", detail: "Minimal ingest included" },
            { label: "Team", price: "$599/mo", detail: "Higher ingest + collab" },
            { label: "Business", price: "$1,499/mo", detail: "Advanced features + governance" },
        ],
        addons: [
            { label: "Retention tiers", price: "Metered (credits)" },
            { label: "Incident timeline + change correlation", price: "$99/mo" },
            { label: "Compliance export pack", price: "$149/mo" },
        ],
    },
];

function PricingTable({ rows }) {
    return (
        <div className="w-full overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Plan</TableHead>
                        <TableHead>Price (mo)</TableHead>
                        <TableHead>Seats</TableHead>
                        <TableHead>Included Credits</TableHead>
                        <TableHead>Best For</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((r) => (
                        <TableRow key={r.plan}>
                            <TableCell className="font-medium text-[var(--c-brand)]">{r.plan}</TableCell>
                            <TableCell>{r.priceMonthly}</TableCell>
                            <TableCell>{r.seats}</TableCell>
                            <TableCell>{r.credits}</TableCell>
                            <TableCell>{r.bestFor}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function Bullets({ items }) {
    return (
        <ul className="list-disc pl-6 space-y-1">
            {items.map((it, idx) => (
                <li key={idx} className="text-sm leading-relaxed text-[var(--c-text-sub)]">
                    {it}
                </li>
            ))}
        </ul>
    );
}

// ... (previous imports)

const SimulationControls = ({ model, users, setUsers, onRun }) => (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 mb-6 bg-[rgb(var(--c-surface))] border border-[rgb(var(--c-brand))] rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.1)]">
        <div className="flex items-center gap-4">
            <div className="text-sm font-semibold text-[rgb(var(--c-text))]">
                Simulate {model.charAt(0).toUpperCase() + model.slice(1)} Model:
            </div>
            <div className="flex items-center gap-2">
                <label className="text-xs text-[rgb(var(--c-text-sub))]">Users:</label>
                <select
                    value={users}
                    onChange={(e) => setUsers(Number(e.target.value))}
                    className="bg-[rgb(var(--c-bg))] border border-[rgb(var(--c-border))] text-[rgb(var(--c-text))] text-sm rounded px-2 py-1 focus:ring-1 focus:ring-[rgb(var(--c-brand))]"
                >
                    <option value="10">10 (Seed)</option>
                    <option value="50">50 (Early)</option>
                    <option value="100">100 (Growth)</option>
                    <option value="500">500 (Scale)</option>
                    <option value="1000">1,000 (Series A)</option>
                    <option value="5000">5,000 (Series B+)</option>
                </select>
            </div>
        </div>
        <button
            onClick={onRun}
            className="w-full sm:w-auto px-6 py-2 bg-[rgb(var(--c-brand))] text-black font-bold rounded-lg shadow hover:bg-[rgb(var(--c-brand-light))] transition-colors flex items-center justify-center gap-2"
        >
            <span>View Projections</span>
            <span className="text-lg">→</span>
        </button>
    </div>
);

export default function PricingModelsViewer({ onRunProjection }) {
    const [activeModel, setActiveModel] = useState('moderate');
    const [simulationUsers, setSimulationUsers] = useState(100);

    const tabs = [
        { id: 'moderate', label: 'Moderate / Bundle-First' },
        { id: 'aggressive', label: 'Aggressive / Max-ARPU' },
        { id: 'aligned', label: 'Aligned / Outcome + Marketplace' },
    ];

    const handleSimulate = () => {
        if (onRunProjection) {
            onRunProjection({
                model: activeModel,
                users: simulationUsers
            });
        }
    };

    return (
        <div className="space-y-6 tab-content fade-in p-4 border border-[var(--c-border)] rounded-xl bg-[var(--c-bg)]/50 mt-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-semibold text-[var(--c-text)]">Economic Architectures</h2>
                    <p className="text-sm text-[var(--c-text-sub)]">Model your business on top of the Solidarity OS.</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex p-1 bg-[rgb(var(--c-surface))] border border-[rgb(var(--c-border))] rounded-lg">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveModel(tab.id)}
                            className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${activeModel === tab.id
                                ? 'bg-[rgb(var(--c-brand))] text-white shadow-md'
                                : 'text-[rgb(var(--c-text-sub))] hover:text-[rgb(var(--c-text))] hover:bg-[rgba(255,255,255,0.05)]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Simulation Bar */}
            <SimulationControls
                model={activeModel}
                users={simulationUsers}
                setUsers={setSimulationUsers}
                onRun={handleSimulate}
            />

            {/* MODERATE */}
            {activeModel === 'moderate' && (
                <Card className="rounded-2xl fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Moderate / “Make Everyone Happy"
                            <Badge variant="outline">Bundle-first</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Bullets
                            items={[
                                <span key="p1"><b>Two knobs only:</b> seats + usage credits (everything else is packaging).</span>,
                                <span key="p2"><b>Free is useful:</b> not just a demo.</span>,
                                <span key="p3"><b>Predictable bills:</b> credits roll over for 1 month.</span>,
                                <span key="p4"><b>Trust policies:</b> cost certainty and grandfathering.</span>,
                            ]}
                        />

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[var(--c-text)]">Standard Bundle (Flagship)</h3>
                                <Badge variant="secondary">Recommended</Badge>
                            </div>
                            <PricingTable rows={moderateBundleTiers} />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-[var(--c-text)]">Credits (Add-ons)</h3>
                            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                                {moderateCreditPacks.map((p) => (
                                    <Card key={p.pack} className="rounded-2xl border-[var(--c-border)]">
                                        <CardContent className="p-4">
                                            <div className="text-base font-semibold text-[var(--c-text)]">{p.pack}</div>
                                            <div className="text-sm text-[var(--c-text-sub)]">{p.note}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* AGGRESSIVE */}
            {activeModel === 'aggressive' && (
                <Card className="rounded-2xl fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Aggressive / Max-ARPU (Defensible)
                            <Badge variant="outline">Expansion revenue</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Bullets
                            items={[
                                <span key="a1"><b>Stacked levers:</b> platform fee + seats + per-module licensing + usage meters + feature packs.</span>,
                                <span key="a2"><b>Feature gates:</b> exports, API, automations, SSO/SCIM, audit, retention.</span>,
                                <span key="a3"><b>Usage metering everywhere:</b> separate credits for compute/data/storage/runs.</span>,
                            ]}
                        />

                        <Separator />

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-[var(--c-text)]">Platform Access (Base Studio)</h3>
                            <PricingTable rows={greedyPlatformTiers} />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-[var(--c-text)]">Module Licensing (A la carte)</h3>
                            <div className="grid gap-3 lg:grid-cols-2">
                                {greedyModules.map((m) => (
                                    <Card key={m.name} className="rounded-2xl">
                                        <CardHeader className="pb-2">
                                            <CardTitle className="text-base">{m.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-3">
                                            <div className="space-y-2">
                                                <div className="text-sm font-semibold text-[var(--c-text)]">Tiers</div>
                                                <div className="space-y-1">
                                                    {m.tiers.map((t) => (
                                                        <div key={t.label} className="flex items-center justify-between text-sm text-[var(--c-text-sub)]">
                                                            <span className="font-medium text-[var(--c-text)]">{t.label}</span>
                                                            <span>{t.price} · {t.detail}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <Separator />

                                            <div className="space-y-2">
                                                <div className="text-sm font-semibold text-[var(--c-text)]">Add-ons</div>
                                                <div className="space-y-1">
                                                    {m.addons.map((a) => (
                                                        <div key={a.label} className="flex items-center justify-between text-sm text-[var(--c-text-sub)]">
                                                            <span>{a.label}</span>
                                                            <span>{a.price}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="feature-gates">
                                <AccordionTrigger>Feature Packs (Expansion Revenue)</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-3 md:grid-cols-2">
                                        {greedyFeaturePacks.map((p) => (
                                            <Card key={p.name} className="rounded-2xl">
                                                <CardContent className="p-4 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <div className="font-semibold text-[var(--c-text)]">{p.name}</div>
                                                        <div className="text-sm text-[var(--c-text-sub)]">{p.price}</div>
                                                    </div>
                                                    <div className="text-sm text-[var(--c-text-sub)]">{p.desc}</div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            )}

            {/* ALIGNED INCENTIVES */}
            {activeModel === 'aligned' && (
                <Card className="rounded-2xl fade-in">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            Aligned Incentives / Outcome + Marketplace
                            <Badge variant="outline">Low base, upside capture</Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Bullets
                            items={[
                                <span key="x1"><b>Positioning:</b> unfairly cheap to start, monetize when customers win.</span>,
                                <span key="x2"><b>Best when:</b> you can instrument outcomes (deployments, incidents, leads).</span>,
                                <span key="x3"><b>Guardrails:</b> opt-in outcome contracts + attribution rules + caps.</span>,
                            ]}
                        />

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold text-[var(--c-text)]">Base Plans (Low friction)</h3>
                                <Badge variant="secondary">Land & expand</Badge>
                            </div>
                            <PricingTable rows={alignedBundleTiers} />
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold text-[var(--c-text)]">Revenue Streams (Stacked, aligned)</h3>
                            <div className="grid gap-3 md:grid-cols-2">
                                {alignedRevenueStreams.map((s) => (
                                    <Card key={s.title} className="rounded-2xl">
                                        <CardContent className="p-4 space-y-1">
                                            <div className="font-semibold text-[var(--c-text)]">{s.title}</div>
                                            <div className="text-sm text-[var(--c-text-sub)]">{s.desc}</div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <Separator />

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="outcomes">
                                <AccordionTrigger>Outcome Pricing Examples (by engine)</AccordionTrigger>
                                <AccordionContent>
                                    <div className="grid gap-3 lg:grid-cols-2">
                                        {alignedOutcomeExamples.map((o) => (
                                            <Card key={o.engine} className="rounded-2xl">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="text-base">{o.engine}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <ul className="list-disc pl-6 space-y-1">
                                                        {o.examples.map((ex) => (
                                                            <li key={ex} className="text-sm text-[var(--c-text-sub)]">{ex}</li>
                                                        ))}
                                                    </ul>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="marketplace">
                                <AccordionTrigger>Marketplace Strategy</AccordionTrigger>
                                <AccordionContent>
                                    <Bullets
                                        items={[
                                            <span key="mp1">Take-rate target: <b>{alignedMarketplace.takeRateRange}</b> on third-party packs.</span>,
                                            <span key="mp2">Your own packs are high-margin and drive outcome adoption.</span>,
                                        ]}
                                    />
                                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                                        {alignedMarketplace.items.map((it) => (
                                            <Card key={it} className="rounded-2xl">
                                                <CardContent className="p-4 text-sm text-[var(--c-text-sub)]">{it}</CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
