import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Activity } from "lucide-react";

export default function EngineGrid({ engines = [] }) {
    const [query, setQuery] = useState("");
    const [filter, setFilter] = useState("All");

    // Safety check for null/undefined engines
    const safeEngines = engines || [];

    const categories = useMemo(() => {
        const set = new Set(["All"]);
        safeEngines.forEach((e) => set.add(e.category));
        return Array.from(set);
    }, [safeEngines]);

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return safeEngines.filter((e) => {
            const matchesFilter = filter === "All" || e.category === filter;
            const summaryText = e.summary || e.oneLiner || "";
            const matchesQuery =
                !q ||
                e.code.toLowerCase().includes(q) ||
                e.name.toLowerCase().includes(q) ||
                summaryText.toLowerCase().includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [safeEngines, query, filter]);

    return (
        <div className="engineWrap">
            <div className="engineControls">
                <div className="pillRow">
                    {categories.map((c) => (
                        <button
                            key={c}
                            className={`pill ${filter === c ? "active" : ""}`}
                            onClick={() => setFilter(c)}
                            type="button"
                        >
                            {c}
                        </button>
                    ))}
                </div>

                <input
                    className="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search engines…"
                    aria-label="Search engines"
                />
            </div>

            <div className="grid">
                {visible.map((e) => (
                    <article key={e.code} className="card" style={{ position: 'relative' }}>
                        <div className="cardTop">
                            <div className="engineCode">{e.code}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div className="badge" style={{ marginRight: '4px' }}>{e.category}</div>
                                <Link
                                    to={`/docs/${e.code.toLowerCase()}-overview`}
                                    className="icon-link"
                                    title="View Documentation"
                                    style={{ color: 'var(--c-text-muted)', display: 'flex' }}
                                >
                                    <BookOpen size={16} />
                                </Link>
                                <Link
                                    to={`/system?engine=${e.code}`}
                                    className="icon-link"
                                    title="View in System Topology"
                                    style={{ color: 'var(--c-text-muted)', display: 'flex' }}
                                >
                                    <Activity size={16} />
                                </Link>
                            </div>
                        </div>
                        <div className="cardTitle">{e.name}</div>
                        <p className="cardBody">{e.summary || e.oneLiner}</p>
                    </article>
                ))}
            </div>
        </div>
    );
}