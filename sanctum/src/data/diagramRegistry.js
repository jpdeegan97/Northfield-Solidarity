import { NS_MASTER_DETAILED } from "./diagrams/master_detailed.js";
import { NS_MASTER_ABSTRACTED } from "./diagrams/master_abstracted.js";
import {
    NS_GGP_FLOW, NS_PIE_FLOW, NS_DAT_FLOW, NS_FLO_FLOW,
    NS_MUX_FLOW, NS_SIG_FLOW, NS_SIM_FLOW
} from "./diagrams/engines_1.js";
import {
    NS_DRE_FLOW, NS_IDN_FLOW, NS_CDE_FLOW, NS_INT_FLOW,
    NS_LUM_FLOW, NS_CWP_FLOW, NS_BCP_FLOW
} from "./diagrams/engines_2.js";

export const DIAGRAMS = {
    "MASTER_DETAILED": NS_MASTER_DETAILED,
    "MASTER_ABSTRACTED": NS_MASTER_ABSTRACTED,
    "GGP": NS_GGP_FLOW,
    "PIE": NS_PIE_FLOW,
    "DAT": NS_DAT_FLOW,
    "FLO": NS_FLO_FLOW,
    "MUX": NS_MUX_FLOW,
    "SIG": NS_SIG_FLOW,
    "SIM": NS_SIM_FLOW,
    "DRE": NS_DRE_FLOW,
    "IDN": NS_IDN_FLOW,
    "CDE": NS_CDE_FLOW,
    "INT": NS_INT_FLOW,
    "LUM": NS_LUM_FLOW,
    "CWP": NS_CWP_FLOW,
    "BCP": NS_BCP_FLOW
};

export const getDiagram = (id) => {
    if (!id) return NS_MASTER_DETAILED;
    const key = id.toUpperCase();
    return DIAGRAMS[key] || NS_MASTER_DETAILED;
};
