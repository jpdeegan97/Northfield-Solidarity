export const NS_PROJECTS = [
    {
        code: "FRMT",
        name: "FIRMAMENT",
        category: "OpsTech",
        description: "3D Operations Globe for real-time visualization of NS operations.",
        status: "Draft",
        charterContent: "FIRMAMENT_CHARTER",
        fundingGoal: 150000,
        raised: 45000,
        backers: 12,
        pitch: "A Minority Report-style command center for your entire business empire.",
        themeColor: "#06b6d4", // Cyan
        features: [
            { title: "Global Visualization", desc: "Real-time 3D earth rendering of all operational assets." },
            { title: "Layered Intelligence", desc: "Toggleable data layers for logistics, finance, and risk." },
            { title: "Command & Control", desc: "Direct execution of GGE governance actions from the map." }
        ]
    },
    {
        code: "MT",
        name: "MANIFOLD TRACER",
        category: "Analytics",
        description: "Business Graph Extraction & Topology Engine.",
        status: "Draft",
        charterContent: "MANIFOLD_TRACER_CHARTER",
        fundingGoal: 75000,
        raised: 12000,
        backers: 4,
        pitch: "The physics engine for your business graph.",
        themeColor: "#a855f7", // Purple
        features: [
            { title: "Graph Extraction", desc: "Pulls data to build complete business topology." },
            { title: "Node Resolution", desc: "Discovers hidden links and transitive dependencies." },
            { title: "Flow Tracing", desc: "Monitors the movement of value and work." }
        ]
    },
    {
        code: "OS",
        name: "FANTASY LAND",
        category: "Visualization",
        description: "Experiential Business Visualization & Flow Gamification Platform.",
        status: "Draft",
        charterContent: "FANTASY_LAND_CHARTER",
        fundingGoal: 50000,
        raised: 0,
        backers: 0,
        pitch: "Gamify your business workflows and visualize value streams in Unreal Engine.",
        themeColor: "#10b981", // Emerald
        features: [
            { title: "Process Gamification", desc: "Turn mundane workflows into engaging, visual quests." },
            { title: "3D World Building", desc: "Render your business as a living city or solar system." },
            { title: "Unreal Engine Core", desc: "High-fidelity visual experience for operations." }
        ]
    },
    {
        code: "RELAY",
        name: "RELAY",
        category: "Communications",
        description: "Project Relay.",
        status: "Draft",
        charterContent: "RELAY_CHARTER",
        fundingGoal: 100000,
        raised: 85000,
        backers: 24,
        pitch: "Next-gen secure communications for decentralized teams.",
        themeColor: "#3b82f6", // Blue
        features: [
            { title: "E2E Encryption", desc: "Military-grade encryption for all message payloads." },
            { title: "Decentralized Mesh", desc: "No central server failure points." },
            { title: "Low Latency", desc: "Optimized routing for real-time collaboration." }
        ]
    },
    {
        code: "AEGIS",
        name: "AEGIS",
        category: "Cybersecurity",
        description: "Dependency Management Product (DMP) and Graph.",
        status: "Draft",
        charterContent: "AEGIS_CHARTER",
        documents: [
            { id: 'charter', title: 'Project Charter', contentKey: 'AEGIS_CHARTER' },
            { id: 'runbook', title: 'Runbook', contentKey: 'AEGIS_RUNBOOK' },
            { id: 'dataref', title: 'Data Reference', contentKey: 'AEGIS_DATAREF' }
        ],
        fundingGoal: 200000,
        raised: 195000,
        backers: 45,
        pitch: "Autonomous cybersecurity defense graph.",
        themeColor: "#10b981", // Emerald/Green for Shield/Safe
        features: [
            { title: "Dependency Graph", desc: "Visual map of all software and vendor dependencies." },
            { title: "Vulnerability Scanning", desc: "Real-time CVE matching and blast radius calculation." },
            { title: "Policy Enforcement", desc: "Automated governance gates for new dependencies." }
        ]
    },
    {
        code: "WSP",
        name: "WALL STREET PRO",
        category: "FinTech",
        description: "Wall Street Pro financial tools.",
        status: "Draft",
        charterContent: "WALL_STREET_PRO_CHARTER",
        fundingGoal: 500000,
        raised: 0,
        backers: 0,
        pitch: "Institutional-grade financial analytics for the masses.",
        themeColor: "#f59e0b", // Gold
        features: [
            { title: "Market Analytics", desc: "Real-time processing of global market feeds." },
            { title: "High Freq Execution", desc: "Microsecond latency order routing." },
            { title: "Institutional Data", desc: "Access to dark pool liquidity and order flow." }
        ]
    },
    {
        code: "BOOM",
        name: "BOOMERANG",
        category: "Economics",
        description: "Reciprocal value flow system.",
        status: "Draft",
        fundingGoal: 25000,
        raised: 5000,
        backers: 2,
        pitch: "Economic models that reward reciprocity.",
        themeColor: "#db2777", // Pink/Fuchsia
        features: [
            { title: "Circular Economy", desc: "Value loops that reward return customers and referrers." },
            { title: "Reciprocity Score", desc: "Quantifiable metric for ecosystem contribution." },
            { title: "Value Bridging", desc: "Connecting distinct value pools for mutual liquidity." }
        ]
    },
    {
        code: "CRN",
        name: "CHRONICLE",
        category: "Productivity",
        description: "Daily capture and decision journaling.",
        status: "Active",
        fundingGoal: 10000,
        raised: 2500,
        backers: 15,
        pitch: "The ultimate decision journal for high-performers.",
        themeColor: "#64748b", // Slate
        features: [
            { title: "Decision Logs", desc: "Immutable record of decision context and outcomes." },
            { title: "Daily Capture", desc: "Frictionless entry for thoughts, tasks, and ideas." },
            { title: "Review Cycles", desc: "Automated prompts for weekly and monthly reviews." }
        ]
    },
    {
        code: "DT",
        name: "DUCT TAPE",
        category: "Venture",
        description: "Intimate idea rambling sessions.",
        status: "Ideation",
        fundingGoal: 5000,
        raised: 5000,
        backers: 50,
        pitch: "Raw, unfiltered idea generation.",
        themeColor: "#facc15", // Duct Tape Yellow
        features: [
            { title: "Rapid Prototyping", desc: "Quick and dirty validation of new concepts." },
            { title: "Idea Junkyard", desc: "Non-destructive repository for discarded fragments." },
            { title: "Patchwork Framework", desc: "Connecting disparate systems loosely but effectively." }
        ]
    },
    {
        code: "FRK",
        name: "FORK",
        category: "Hospitality",
        description: "Food systems, culinary exploration, and dining experiences.",
        status: "Concept",
        fundingGoal: 120000,
        raised: 0,
        backers: 0,
        pitch: "Reinventing the culinary experience.",
        themeColor: "#e11d48", // Rose/Red
        features: [
            { title: "Flavor Graph", desc: "Data-driven pairing and menu generation." },
            { title: "Supply Chain", desc: "Farm-to-table tracking and provenance." },
            { title: "Dining OS", desc: "Integrated management for front and back of house." }
        ]
    },
    {
        code: "INC",
        name: "INCUBATOR",
        category: "Venture",
        description: "Venture hatching and early-stage maturity.",
        status: "Active",
        fundingGoal: 50000,
        raised: 50000,
        backers: 5,
        pitch: "The machine that builds machines.",
        themeColor: "#22c55e", // Green
        features: [
            { title: "Venture Validation", desc: "Systematic stage-gating for new projects." },
            { title: "Resource Injection", desc: "Automated allocation of capital and talent." },
            { title: "Growth Tracks", desc: "Standardized paths from zero to one." }
        ]
    },
    {
        code: "INCP",
        name: "INCEPTION",
        category: "Venture",
        description: "Origin point project.",
        status: "Draft",
        fundingGoal: 10000,
        raised: 0,
        backers: 0,
        pitch: "Where it all begins.",
        themeColor: "#f97316", // Orange Spark
        features: [
            { title: "Origin Stories", desc: "Capturing the genesis moment of every project." },
            { title: "Founder Matching", desc: "Aligning visionaries with operators." },
            { title: "Vision Boarding", desc: "Collaborative canvas for the big picture." }
        ]
    },
    {
        code: "INV",
        name: "INVERSE",
        category: "Economics",
        description: "Inverse value models.",
        status: "Draft",
        fundingGoal: 30000,
        raised: 0,
        backers: 0,
        pitch: "Flipping the economic script.",
        themeColor: "#8b5cf6", // Violet
        features: [
            { title: "Short Selling", desc: "Mechanisms for profiting from decline." },
            { title: "Contrarian Indicators", desc: "Signals that defy herd mentality." },
            { title: "Hedge Strategies", desc: "Automated protection against downside risk." }
        ]
    },
    {
        code: "MMX",
        name: "MIND MIX",
        category: "Experimental",
        description: "Mind Mix Project.",
        status: "Draft",
        charterContent: "MINDMIX_CHARTER",
        documents: [
            { id: 'charter', title: 'Charter', contentKey: 'MINDMIX_CHARTER' },
            { id: 'overview', title: 'Overview', contentKey: 'MINDMIX_OVERVIEW' },
            { id: 'taxonomy', title: 'Taxonomy', contentKey: 'MINDMIX_TAXONOMY' },
            { id: 'architecture', title: 'Architecture', contentKey: 'MINDMIX_ARCHITECTURE' },
            { id: 'lifecycle', title: 'Lifecycle', contentKey: 'MINDMIX_LIFECYCLE' },
            { id: 'decision', title: 'Decision Records', contentKey: 'MINDMIX_DECISION_RECORDS' },
            { id: 'compliance', title: 'Compliance', contentKey: 'MINDMIX_COMPLIANCE' },
            { id: 'datamodel', title: 'Data Model', contentKey: 'MINDMIX_DATA_MODEL' },
            { id: 'apimap', title: 'API Map', contentKey: 'MINDMIX_API_MAP' },
            { id: 'impl', title: 'Implementation', contentKey: 'MINDMIX_IMPLEMENTATION' },
            { id: 'fe', title: 'FE Spec', contentKey: 'MINDMIX_FE_SPEC' },
            { id: 'runbook', title: 'Runbook', contentKey: 'MINDMIX_RUNBOOK' },
            { id: 'demo', title: 'Demo Scenarios', contentKey: 'MINDMIX_DEMO_SCENARIOS' },
            { id: 'roadmap', title: 'Roadmap', contentKey: 'MINDMIX_ROADMAP' },
            { id: 'refs', title: 'References', contentKey: 'MINDMIX_REFERENCES' },
        ],
        fundingGoal: 1000000,
        raised: 150000,
        backers: 3,
        pitch: "The ultimate cognitive synthesis engine.",
        themeColor: "#6366f1", // Indigo
        features: [
            { title: "Neural Linking", desc: "Associative mapping of complex concepts." },
            { title: "Synthesis Core", desc: "Merging disparate data streams into new insights." },
            { title: "Cognitive Load", desc: "Optimizing information flow for human processing." }
        ]
    },
    {
        code: "MINT",
        name: "MINT",
        category: "LegalTech",
        description: "Entity / IP Formation Engine.",
        status: "Incubator",
        fundingGoal: 20000,
        raised: 5000,
        backers: 1,
        pitch: "Automated legal entity formation.",
        themeColor: "#00ff9d", // Mint
        features: [
            { title: "Instant Incorporation", desc: "One-click LLC formation and registration." },
            { title: "IP Assignment", desc: "Automated transfer of intellectual property." },
            { title: "Legal Templates", desc: "Standardized contracts for all operating needs." }
        ]
    },
    {
        code: "NUM",
        name: "NUMBEROLOGY",
        category: "Data Science",
        description: "Quantitative analysis and patterns.",
        status: "Draft",
        fundingGoal: 15000,
        raised: 0,
        backers: 0,
        pitch: "Finding meaning in the patterns.",
        themeColor: "#0ea5e9", // Sky Blue
        features: [
            { title: "Pattern Recognition", desc: "Algorithmic detection of hidden trends." },
            { title: "Quant Analysis", desc: "Rigorous statistical validation of hypotheses." },
            { title: "Predictive Models", desc: "Forecasting future states based on historical data." }
        ]
    },
    {
        code: "JRNL",
        name: "JOURNAL",
        category: "Productivity",
        description: "Deep reflective writing and decision logs (Sanctum Module).",
        status: "Active",
        fundingGoal: 5000,
        raised: 5000,
        backers: 10,
        pitch: "Your personal decision black box.",
        themeColor: "#a8a29e", // Stone
        features: [
            { title: "Private Logging", desc: "Encrypted local-first storage for sensitive notes." },
            { title: "Reflection Mode", desc: "Distraction-free environment for deep thought." },
            { title: "Search & Recall", desc: "Semantic search across your entire thought history." }
        ]
    }
];
