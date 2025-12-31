import React from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import { getEngineByCode } from "@shared/data/engineRegistry";

export default function EngineDetail() {
    const { code } = useParams();
    const engine = getEngineByCode(code);

    if (!engine) {
        return (
            <div data-theme="water">
                <Layout
                    brand={{
                        title: "Northfield Solidarity",
                        tagline: "Engine Detail",
                        footerLine: "Engine not found",
                        footerNote: "Check the code and try again.",
                    }}
                    nav={[
                        { label: "Northfield", to: "/" },
                        { label: "Engines", to: "/engines" },
                        { label: "South Lawn", to: "/southlawn" },
                    ]}
                >
                    <Section title="Engine not found" subtitle={`No engine found for code: ${String(code)}`}>
                        <Link className="btn" to="/engines">Back to Engines</Link>
                    </Section>
                </Layout>
            </div>
        );
    }

    // Theme follows org: NS -> water, SL -> green
    const theme = engine.org === "SL" ? "green" : "water";
    const orgLabel = engine.org === "SL" ? "South Lawn RE Holdings" : "Northfield Solidarity";

    return (
        <div data-theme={theme}>
            <Layout
                brand={{
                    title: orgLabel,
                    tagline: `${engine.code} — ${engine.name}`,
                    footerLine: `${engine.category} • ${engine.org} • ${engine.status}`,
                    footerNote: "Contracts over conventions.",
                }}
                nav={[
                    { label: "Northfield", to: "/" },
                    { label: "Engines", to: "/engines" },
                    { label: "South Lawn", to: "/southlawn" },
                ]}
            >
                <section className="hero">
                    <div className="heroInner">
                        <div className="heroCopy">
                            <div className="kicker">{engine.org} • {engine.category}</div>
                            <h1 className="h1">{engine.code} — {engine.name}</h1>
                            <p className="lead">{engine.oneLiner}</p>

                            <div className="ctaRow">
                                <Link className="btn" to="/engines">Back to Engines</Link>
                                {engine.org === "SL" ? (
                                    <Link className="btn ghost" to="/southlawn">South Lawn Landing</Link>
                                ) : (
                                    <Link className="btn ghost" to="/">Northfield Landing</Link>
                                )}
                            </div>
                        </div>

                        <div className="heroPanel" aria-hidden="true">
                            <div className="heroPanelTitle">Status</div>
                            <div className="heroPanelBig">{engine.status}</div>
                            <div className="heroPanelSub">Org: {engine.org}</div>
                            <div className="heroPanelLine">Category: {engine.category}</div>
                        </div>
                    </div>
                    <div className="heroFade" aria-hidden="true" />
                </section>

                <Section eyebrow="Description" title="What it is">
                    <div className="callout">
                        <p className="p" style={{ marginBottom: 0 }}>{engine.description}</p>
                    </div>
                </Section>

                <Section eyebrow="Responsibilities" title="What it does">
                    <div className="callout">
                        <ul className="list">
                            {engine.responsibilities?.map((x) => <li key={x}>{x}</li>)}
                        </ul>
                    </div>
                </Section>

                <Section eyebrow="Interfaces" title="Inputs and outputs">
                    <div className="twoCol">
                        <div className="callout">
                            <h3 className="h3">Inputs</h3>
                            <ul className="list">
                                {(engine.inputs || []).map((x) => <li key={x}>{x}</li>)}
                            </ul>
                        </div>
                        <div className="callout">
                            <h3 className="h3">Outputs</h3>
                            <ul className="list">
                                {(engine.outputs || []).map((x) => <li key={x}>{x}</li>)}
                            </ul>
                        </div>
                    </div>
                </Section>

                <Section eyebrow="Connections" title="Integrations">
                    <div className="grid docsGrid">
                        {(engine.integrations || []).map((x) => (
                            <div key={x} className="docCard">{x}</div>
                        ))}
                    </div>
                </Section>
            </Layout>
        </div>
    );
}