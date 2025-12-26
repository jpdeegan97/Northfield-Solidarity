import React from "react";
import Layout from "../components/Layout.jsx";
import Section from "../components/Section.jsx";
import EngineGrid from "../components/EngineGrid.jsx";
import { ALL_ENGINES } from "../data/engineRegistry.js";

export default function EnginesIndex() {
    return (
        <div data-theme="water">
            <Layout
                brand={{
                    title: "Northfield Solidarity",
                    tagline: "Engine Index",
                    footerLine: "NS core engines + SL real-estate engines (domain-pure)",
                    footerNote: "One registry. Many surfaces.",
                }}
                nav={[
                    { label: "Northfield", to: "/" },
                    { label: "Engines", to: "/engines" },
                    { label: "South Lawn", to: "/southlawn" },
                ]}
            >
                <Section
                    eyebrow="Index"
                    title="All Engines"
                    subtitle="Search and filter across the full ecosystem. Click any engine to open its detail page."
                >
                    <EngineGrid engines={ALL_ENGINES} linkToDetails />
                </Section>
            </Layout>
        </div>
    );
}