
const MASTER_PLAN_INDUSTRIES = [
    {
        category: "Agriculture and Natural Resources",
        items: [
            "Crop farming",
            "Livestock",
            "Ag services",
            "Forestry",
            "Fishing"
        ]
    },
    {
        category: "Mining, Materials, and Extraction",
        items: [
            "Metals mining",
            "Industrial minerals",
            "Coal fuels",
            "Quarrying",
            "Mining services"
        ]
    },
    {
        category: "Oil, Gas, and Petrochemicals",
        items: [
            "Upstream exploration",
            "Midstream pipelines",
            "Downstream refining",
            "Petrochemicals",
            "Oilfield services"
        ]
    },
    {
        category: "Utilities and Power",
        items: [
            "Electric utilities",
            "Water utilities",
            "Gas utilities",
            "Grid operators",
            "Independent power"
        ]
    },
    {
        category: "Construction",
        items: [
            "Residential construction",
            "Commercial construction",
            "Heavy civil",
            "Specialty trades",
            "Building products"
        ]
    },
    {
        category: "Manufacturing",
        items: [
            "Aerospace defense",
            "Automotive",
            "Electronics",
            "Industrial machinery",
            "Chemicals",
            "Metals fabrication",
            "Plastics rubber",
            "Medical devices",
            "Consumer goods",
            "Textiles apparel",
            "Paper packaging",
            "Food manufacturing"
        ]
    },
    {
        category: "Wholesale",
        items: [
            "General wholesalers",
            "Industrial supply",
            "Foodservice dist",
            "Pharma dist",
            "Electronics dist"
        ]
    },
    {
        category: "Retail",
        items: [
            "Grocery",
            "Specialty retail",
            "Convenience fuel",
            "Marketplace ecommerce",
            "DTC brands"
        ]
    },
    {
        category: "Logistics",
        items: [
            "Parcel delivery",
            "Freight brokerage",
            "Trucking",
            "Rail freight",
            "Ocean shipping",
            "Air cargo",
            "Warehousing",
            "Cold chain"
        ]
    },
    {
        category: "Hospitality and Travel",
        items: [
            "Hotels resorts",
            "Airlines",
            "Cruises",
            "Theme parks",
            "Short term rentals",
            "Business travel"
        ]
    },
    {
        category: "Food and Beverage",
        items: [
            "Restaurants",
            "Delivery platforms",
            "Beverage",
            "Coffee chains",
            "Catering"
        ]
    },
    {
        category: "Media and Entertainment",
        items: [
            "Streaming",
            "Film TV",
            "Music",
            "Gaming",
            "Sports",
            "Publishing"
        ]
    },
    {
        category: "Telecoms",
        items: [
            "Mobile operators",
            "Fixed broadband",
            "Fiber networks",
            "Satellite",
            "Network infra",
            "Managed services"
        ]
    },
    {
        category: "Software and IT",
        items: [
            "Enterprise SaaS",
            "DevTools",
            "Cloud infra",
            "Cybersecurity",
            "Data analytics",
            "AI ML",
            "IT services",
            "Consumer apps"
        ]
    },
    {
        category: "Internet Platforms",
        items: [
            "Search ads",
            "Social networks",
            "Marketplaces",
            "Payments",
            "Creator economy",
            "App stores"
        ]
    },
    {
        category: "Financial Services",
        items: [
            "Retail banking",
            "Commercial banking",
            "Investment banking",
            "Asset management",
            "Brokerage",
            "Payments acquiring",
            "Lending",
            "Fintech infra"
        ]
    },
    {
        category: "Insurance",
        items: [
            "Life insurance",
            "PC insurance",
            "Health insurance",
            "Reinsurance",
            "Insurtech"
        ]
    },
    {
        category: "Real Estate",
        items: [
            "Residential RE",
            "Commercial RE",
            "Property management",
            "REITs",
            "Proptech"
        ]
    },
    {
        category: "Healthcare",
        items: [
            "Hospitals",
            "Payers",
            "Pharma biotech",
            "Clinical trials",
            "Diagnostics",
            "Pharmacy",
            "Digital health"
        ]
    },
    {
        category: "Education",
        items: [
            "K12 systems",
            "Higher ed",
            "EdTech",
            "Corporate training",
            "Credentialing"
        ]
    },
    {
        category: "Government",
        items: [
            "Municipal ops",
            "Federal agencies",
            "Public safety",
            "Courts",
            "Benefits admin",
            "Transportation dept"
        ]
    },
    {
        category: "Defense",
        items: [
            "Defense contractors",
            "Physical security",
            "Safety tech",
            "Infra protection",
            "Risk compliance"
        ]
    },
    {
        category: "Professional Services",
        items: [
            "Consulting",
            "Legal services",
            "Accounting",
            "Marketing",
            "Staffing"
        ]
    },
    {
        category: "Consumer Services",
        items: [
            "Personal care",
            "Home services",
            "Fitness",
            "Childcare",
            "Subscriptions"
        ]
    },
    {
        category: "Industrial Ops",
        items: [
            "Procurement",
            "Supply chain",
            "Quality mgmt",
            "Maintenance",
            "ESG",
            "Compliance ops"
        ]
    },
    {
        category: "Climate",
        items: [
            "Renewables",
            "Energy storage",
            "EV charging",
            "Carbon accounting",
            "Recycling",
            "Water tech"
        ]
    },
    {
        category: "Social Sector",
        items: [
            "NGOs",
            "Food banks",
            "Community health",
            "Housing shelters",
            "Disaster response"
        ]
    }
];

function getCode(category, item) {
    const catPrefix = category.slice(0, 3).toUpperCase();
    const itemPrefix = item.split(' ')[0].slice(0, 4).toUpperCase();

    // Ensure uniqueness if needed by adding random char or index? 
    // For now deterministic is better.
    return `${catPrefix}-${itemPrefix}`;
}

const newProjects = [];
const seenCodes = new Set();

MASTER_PLAN_INDUSTRIES.forEach(ind => {
    ind.items.forEach(item => {
        let code = getCode(ind.category, item);

        // Handle code collision
        let suffix = 1;
        let originalCode = code;
        while (seenCodes.has(code)) {
            code = `${originalCode}${suffix}`;
            suffix++;
        }
        seenCodes.add(code);

        const project = {
            code: code,
            name: item.toUpperCase(),
            category: ind.category,
            description: `Strategic initiative for ${item}.`,
            status: "Concept",
            fundingGoal: 0,
            raised: 0,
            backers: 0,
            pitch: `Disrupting the ${item} space.`,
            themeColor: "#888888",
            features: [
                { title: "Project Initiation", desc: "Phase 1 planning and resource allocation." }
            ]
        };
        newProjects.push(project);
    });
});

console.log(JSON.stringify(newProjects, null, 4));
