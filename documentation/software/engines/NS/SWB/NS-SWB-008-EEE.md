# NS-SWB-008-EEE — Events, Entities, Edges

Events: request.received/classified/gated; route.planned; execution.step.started/failed/succeeded; route.fallback.used; request.succeeded/failed/blocked; policy.updated; model.profile.updated.

Edges: Request—USED_MODEL→ModelProfile; Request—USED_TOOL→ToolProfile; Policy—GOVERNED→Request; ModelProfile—PROVIDED_BY→Provider.
