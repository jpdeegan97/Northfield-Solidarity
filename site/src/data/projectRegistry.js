export const NS_PROJECTS = [
    {
        code: "FRMT",
        name: "FIRMAMENT",
        category: "Project",
        description: "3D Operations Globe for real-time visualization of NS operations.",
        status: "Draft",
        charterContent: "FIRMAMENT_CHARTER",
        timeline: { category: "Firmament Web App", start: 1, duration: 3, color: "#3b82f6" }
    },
    // Removed MT (Manifold Tracer), FL (Fantasy Land), RELAY -> Moved to Engine Registry
    {
        code: "AEGIS",
        name: "AEGIS",
        category: "Project",
        description: "Dependency Management Product (DMP) and Graph.",
        status: "Draft",
        charterContent: "AEGIS_CHARTER",
        documents: [
            { id: 'charter', title: 'Project Charter', contentKey: 'AEGIS_CHARTER' },
            { id: 'runbook', title: 'Runbook', contentKey: 'AEGIS_RUNBOOK' },
            { id: 'dataref', title: 'Data Reference', contentKey: 'AEGIS_DATAREF' }
        ],
        timeline: { category: "Engineering Ops", start: 0, duration: 6, color: "#10b981" }
    },

    {
        code: "BOOM",
        name: "BOOMERANG",
        category: "Project",
        description: "Reciprocal value flow system.",
        status: "Draft",
        charterContent: "BOOMERANG_CHARTER",
        timeline: { category: "Experimental", start: 7, duration: 3 }
    },
    {
        code: "CRN",
        name: "CHRONICLE",
        category: "Project",
        description: "Daily capture and decision journaling.",
        status: "Active",
        charterContent: "CHRONICLE_CHARTER",
        timeline: { category: "Core Systems", start: 0, duration: 12, color: "#f59e0b" }
    },
    {
        code: "DT",
        name: "DUCT TAPE",
        category: "Project",
        description: "Intimate idea rambling sessions.",
        status: "Active",
        charterContent: "DUCT_TAPE_CHARTER",
        timeline: { category: "Experimental", start: 0, duration: 12 }
    },
    {
        code: "TINE",
        name: "TINE",
        category: "Project",
        description: "Culinary & Cuisine Project - Exploring culture through food.",
        status: "Active",
        charterContent: "NS_TINE_000_CHARTER",
        timeline: { category: "Core Systems", start: 0, duration: 12, color: "#f59e0b" }
    },
    {
        code: "INC",
        name: "INCUBATOR",
        category: "Project",
        description: "Venture hatching and early-stage maturity.",
        status: "Active",
        charterContent: "INCUBATOR_CHARTER",
        timeline: { category: "Core Systems", start: 0, duration: 12, color: "#f59e0b" }
    },
    {
        code: "INCP",
        name: "INCEPTION",
        category: "Project",
        description: "Origin point project.",
        status: "Draft",
        charterContent: "INCEPTION_CHARTER",
        timeline: { category: "Experimental", start: 0, duration: 1 }
    },
    {
        code: "INV",
        name: "INVERSE",
        category: "Project",
        description: "Inverse value models.",
        status: "Draft",
        charterContent: "INVERSE_CHARTER",
        timeline: { category: "Experimental", start: 8, duration: 3 }
    },
    {
        code: "MINT",
        name: "MINT",
        category: "Project",
        description: "Entity / IP Formation Engine.",
        status: "Incubator",
        charterContent: "MINT_CHARTER",
        timeline: { category: "Internal Tools", start: 4, duration: 4 }
    },
    {
        code: "NUM",
        name: "NUMBEROLOGY",
        category: "Project",
        description: "Quantitative analysis and patterns.",
        status: "Draft",
        charterContent: "NUMBEROLOGY_CHARTER",
        timeline: { category: "Experimental", start: 5, duration: 3 }
    },
    {
        code: "ATL",
        name: "ATLANTIS",
        category: "Project",
        description: "Global Capital Deployment Registry & Analytics.",
        status: "Draft",
        charterContent: "DEAL_ATLAS_CHARTER",
        documents: [
            { id: 'charter', title: 'Project Charter', contentKey: 'DEAL_ATLAS_CHARTER' },
            { id: 'dataref', title: 'Data Reference', contentKey: 'DEAL_ATLAS_DATAREF' }
        ],
        timeline: { category: "Core Systems", start: 8, duration: 4, color: "#2563eb" }
    },
    {
        code: "HP",
        name: "HOT POTATO",
        category: "Project",
        description: "Lead Intelligence Dashboard and Conversion Workflow Playbook.",
        status: "Active",
        charterContent: "HP_CHARTER",
        timeline: { category: "Core Systems", start: 6, duration: 6, color: "#ef4444" }
    },
    {
        code: "VC",
        name: "VANTAGE CAPITAL",
        category: "Project",
        description: "Impartial Business Capital Comparison Engine.",
        status: "Active",
        charterContent: "VC_CHARTER",
        timeline: { category: "Commercial Apps", start: 9, duration: 3, color: "#10b981" }
    },
];
