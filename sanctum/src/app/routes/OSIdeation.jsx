import React, { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Layout from "../../components/Layout.jsx";

const PROSPECTUS_CONTENT = [
    {
        id: 'charter',
        title: '000 - Charter',
        content: `**NS OS — Philosophy**

## 1. Why NS OS Exists

NS OS exists because modern operating systems were built for a world that no longer exists.

They assume:

- deterministic execution
- human-issued commands
- static files
- opaque computation
- after-the-fact intelligence

But the world now runs on:

- uncertainty
- probabilistic outcomes
- heterogeneous compute
- continuous optimization
- systems that act, not just respond

NS OS is not an upgrade to existing operating systems. It is a re-grounding of what an operating system is.

## 2. The Core Belief

Computation is no longer just about correctness. It is about navigating uncertainty responsibly.

Deterministic execution remains essential — but insufficient.

NS OS treats:

- uncertainty as a first-class concept
- probability as a native property
- optimization as an ongoing process
- context as durable, not ephemeral

## 3. Intelligence Is Not an Application

NS OS rejects the idea that “intelligence” is something bolted on at the application layer.

Intelligence, in NS OS, is:

- structural
- governed
- auditable
- bounded

This means:

- no hidden agents
- no opaque background actions
- no intelligence without provenance

If the system cannot explain why something happened, it does not count as intelligence.

## 4. Heterogeneous Compute Is the Default

NS OS assumes from first principles that computation will span:

- Deterministic control (CPU)
- Parallel numeric processing (GPU and accelerators)
- Probabilistic, thermodynamic sampling (TSUs and equivalents)

Each class of compute exists for a different purpose.

NS OS does not force one paradigm to imitate another. It routes problems to the kind of physics best suited to solve them.

## 5. Thermodynamic Sampling Is About Humility

Thermodynamic Sampling Units are not “thinking machines.”

They are an admission that:

- some problems are too complex to solve directly
- equilibrium is often more meaningful than precision
- exploration matters as much as optimization

NS OS uses sampling to:

- explore solution spaces
- estimate distributions
- minimize energy under constraints
- reason under uncertainty

Sampling is always bounded, declared, and observable.

## 6. Intent Is a First-Class Primitive

Traditional operating systems execute commands.

NS OS executes intent.

Intent is:

- a declared outcome
- with constraints
- under uncertainty
- subject to policy

This does not remove human agency — it amplifies it.

The system never decides *why* something should happen. It only helps decide *how*, *when*, and with *what tradeoffs*.

## 7. Provenance Is Non-Negotiable

Every meaningful action in NS OS has:

- an origin
- a justification
- a transformation history

Nothing important is allowed to be:

- anonymous
- unexplained
- irreproducible

This is not for surveillance. It is for trust, continuity, and accountability.

A system without provenance eventually becomes dangerous — even to its creators.

## 8. Fields Over Files

Files are an implementation detail.

NS OS treats the world as fields:

- continuous functions over space, time, or state
- derived from raw data
- governed, versioned, and composable

Files still exist — but they are no longer the highest abstraction.

This allows:

- maps instead of tables
- gradients instead of flags
- signals instead of snapshots

## 9. Governance Is a System Property

NS OS assumes that:

- power emerges naturally from computation
- optimization without constraint becomes exploitation
- scale amplifies mistakes faster than wisdom

Therefore:

- governance is built into the OS
- permissions are semantic, not just technical
- capabilities are scoped, revocable, and auditable

The system is designed to fail safely, not silently.

## 10. Continuity Over Sessions

Most operating systems forget everything between reboots.

NS OS treats continuity as fundamental:

- work has memory
- decisions have lineage
- context persists across time

This does not mean omniscience. It means respect for past effort.

A system that forgets too easily wastes human life.

## 11. Substitution Over Dependence

NS OS is designed to survive hardware shifts.

It does not depend on:

- TSUs being widely available
- any single accelerator
- a specific vendor or architecture

Everything works:

- on CPU alone
- better on GPU
- best with thermodynamic sampling

The abstractions come first. The hardware follows.

## 12. Calm Is a Design Goal

NS OS does not aim to:

- overwhelm
- automate recklessly
- maximize activity

It aims to:

- reduce unnecessary cognitive load
- surface tradeoffs clearly
- allow deliberate action

Speed without clarity is not progress.

## 13. What NS OS Refuses to Become

NS OS explicitly rejects:

- hidden autonomous agents
- unbounded optimization
- intelligence without consent
- performance at the cost of legibility

Power without understanding is not intelligence — it is entropy.

## 14. The Long View

NS OS is not designed for:

- the next release cycle
- the next funding round
- the next hype wave

It is designed for:

- decades of evolution
- unknown hardware
- increasing system complexity
- human trust over time

The goal is not to predict the future —
but to remain coherent as the future arrives.

**Closing Statement**

NS OS is an operating system for a world where uncertainty is real, power is subtle, and responsibility matters.

It does not promise certainty. It promises structure, humility, and continuity in the face of complexity.`
    },
    {
        id: 'nongoals',
        title: '001 - Non-Goals',
        content: `**NS OS — Prospectus**

## Non-Goals & Explicit Refusals

**Purpose**

This document defines what NS OS explicitly does not aim to be, solve, or optimize for.

In a long-horizon system, clarity of refusal is as important as clarity of intent. These non-goals are not temporary constraints — they are structural boundaries designed to preserve coherence over decades.

## 1. NS OS Is Not a Consumer Operating System

NS OS does not aim to:

- replace desktop or mobile operating systems
- compete for consumer market share
- optimize for entertainment, personalization, or mass usability

NS OS is not designed for casual use. It is designed for serious, long-lived work under uncertainty.

## 2. NS OS Is Not an "AI OS"

NS OS explicitly rejects the framing of being an "AI-first" or "AI-native" operating system.

It does not:

- embed opaque autonomous agents
- prioritize generative output over legibility
- treat intelligence as a magical capability layer

Any intelligence in NS OS must be:

- bounded
- explainable
- governed
- attributable

If a result cannot be traced back to declared intent, constraints, and computation, it is considered invalid.

## 3. NS OS Does Not Promise Optimality

NS OS does not promise:

- globally optimal solutions
- perfect predictions
- maximum efficiency at all times

Instead, NS OS prioritizes:

- robustness over optimality
- explainability over performance
- stability over novelty

Optimization without understanding is treated as a failure mode, not a success metric.

## 4. NS OS Is Not Hardware-Bound

NS OS does not:

- depend on the availability of TSUs
- require specialized accelerators to function
- tie its identity to any vendor or architecture

While NS OS is designed to benefit from heterogeneous compute, all abstractions must remain valid in their absence.

Hardware is a substrate — never the definition.

## 5. NS OS Does Not Centralize Power Invisibly

NS OS explicitly refuses:

- hidden automation
- background decision-making without disclosure
- silent policy enforcement

Any exercise of power within the system must be:

- visible
- attributable
- reversible

The system must never know more than it can justify knowing.

## 6. NS OS Is Not a Surveillance Platform

NS OS does not:

- collect data by default
- retain information without declared purpose
- treat provenance as a mechanism for monitoring people

Provenance exists to explain systems, not to police users.

Memory without restraint is not intelligence — it is accumulation.

## 7. NS OS Does Not Replace Human Judgment

NS OS refuses the goal of removing humans from decision-making loops.

It does not:

- act autonomously without consent
- finalize decisions without review
- substitute optimization for responsibility

The system may surface options, tradeoffs, and probabilities — but accountability always remains human.

## 8. NS OS Is Not a Universal Solution

NS OS does not attempt to:

- solve every class of problem
- unify all computation under a single paradigm
- erase the need for specialized systems

Some problems are better solved elsewhere. NS OS is designed to integrate — not dominate.

## 9. NS OS Does Not Optimize for Speed Alone

NS OS explicitly deprioritizes:

- raw throughput as a primary goal
- constant activity
- speed without comprehension

Latency is acceptable when it produces clarity.

## 10. NS OS Refuses Premature Commitment

During the Prospectus and Conception phases, NS OS will not:

- lock APIs
- promise compatibility
- declare timelines
- accept external dependencies

Stability is earned through understanding, not announcement.

**Closing Note**

These non-goals are not limitations.

They are load-bearing constraints that protect NS OS from becoming:

- incoherent
- extractive
- ungovernable
- or misaligned with its founding philosophy

Anything that violates these refusals is, by definition, not NS OS — regardless of how impressive it may appear.`
    },
    {
        id: 'primitives',
        title: '002 - Core Primitives',
        content: `**NS OS — Prospectus**

## Core Primitives

**Purpose**

This document defines the conceptual primitives of NS OS.

These primitives are not APIs, data structures, or implementation details. They are the irreducible ideas from which all future system design, architecture, and behavior must be derived.

If a concept cannot be expressed using these primitives, it does not belong in NS OS.

## 1. Intent

Intent is a declared desired outcome, expressed with constraints and tolerance for uncertainty.

Intent is:

- outcome-oriented, not procedural
- bounded by policy and context
- evaluated over time, not at a single instant

Intent does not specify how something must be done — only what must be achieved and under what conditions.

In NS OS, execution exists to serve intent, not the reverse.

## 2. Constraint

A Constraint is a non-negotiable boundary within which intent must be satisfied.

Constraints may include:

- resource limits
- policy rules
- ethical or governance requirements
- temporal or spatial bounds

Constraints are not failures of optimization. They are the structure that gives optimization meaning.

## 3. Uncertainty

Uncertainty represents what the system does not and cannot know deterministically.

NS OS treats uncertainty as:

- explicit
- measurable
- unavoidable

Rather than hiding uncertainty behind false precision, NS OS surfaces it as a first-class property of computation.

Uncertainty is not an error state. It is the normal operating condition of complex systems.

## 4. Field

A Field is a governed, versioned function over space, time, or state.

Fields:

- may be continuous or discrete
- may be derived or primitive
- always declare provenance

Fields replace static snapshots with living representations of reality.

Files may store fields, but fields are not files.

## 5. Provenance

Provenance is the complete lineage of how a result came to exist.

It includes:

- source origins
- transformations applied
- assumptions made
- constraints enforced

Provenance is required for trust, continuity, and accountability.

Without provenance, results are considered incomplete — regardless of accuracy.

## 6. Policy

Policy encodes what is permitted, forbidden, or required within the system.

Policy is:

- declarative
- enforceable
- inspectable
- revisable

Policy governs both human and non-human actors equally.

Optimization that violates policy is treated as invalid by definition.

## 7. Capability

A Capability is an explicitly granted scope of action.

Capabilities:

- are narrow by default
- may be revoked
- are auditable
- never implied

Possession of a capability is required to act.

Authority without capability does not exist in NS OS.

## 8. State

State represents the current condition of the system relative to declared intent.

State is:

- contextual
- versioned
- persistent across sessions

State exists to preserve continuity, not to accumulate history indiscriminately.

## 9. Continuity

Continuity is the principle that meaningful work should not be lost to time or interruption.

Continuity ensures:

- decisions have memory
- progress is preserved
- context survives across sessions

Continuity is distinct from surveillance. It exists to respect effort, not to monitor behavior.

## 10. Execution

Execution is the act of applying compute to advance intent under constraints and uncertainty.

Execution may be:

- deterministic
- parallel
- probabilistic

Execution is never autonomous in purpose. It is always subordinate to declared intent and policy.

**Closing Statement**

These primitives are intentionally minimal.

They are designed to:

- remain stable over decades
- survive hardware transitions
- prevent conceptual drift

Any future feature, subsystem, or abstraction must be expressible as a composition of these primitives — or it does not belong in NS OS.`
    },
    {
        id: 'worldview',
        title: '003 - Compute Worldview',
        content: `**NS OS — Prospectus**

## Compute Worldview

**Purpose**

This document defines how NS OS understands computation itself.

It does not specify architectures, vendors, or implementations. It establishes a worldview: a principled way of matching problems to the physical realities best suited to address them.

NS OS treats computation as heterogeneous by default.

## 1. Computation Is Not Monolithic

Traditional operating systems implicitly assume a single dominant mode of computation: deterministic instruction execution.

NS OS rejects this assumption.

Modern problems span multiple computational realities, each governed by different constraints and strengths. Treating them as interchangeable leads to inefficiency, opacity, and failure.

NS OS assumes that different kinds of problems require different kinds of physics.

## 2. Deterministic Compute (Control Plane)

Deterministic compute exists to:

- enforce policy
- manage resources
- preserve correctness
- guarantee repeatability

This mode of computation is:

- precise
- auditable
- predictable

In NS OS, deterministic compute forms the control plane. It is responsible for maintaining system integrity, boundaries, and trust.

Determinism is not abandoned — it is protected.

## 3. Parallel Numeric Compute (Acceleration Plane)

Some problems are best solved through massive parallelism.

Parallel numeric compute exists to:

- process large data volumes
- evaluate vectorized operations
- simulate complex systems
- accelerate statistical computation

This mode of computation values throughput over strict ordering.

In NS OS, parallel compute forms the acceleration plane. It is used when scale and speed matter more than step-by-step traceability.

Acceleration must always remain subordinate to control.

## 4. Probabilistic Sampling Compute (Thermodynamic Plane)

Certain problems resist deterministic solution entirely.

These include:

- optimization under uncertainty
- exploration of large solution spaces
- equilibrium discovery
- probabilistic inference

For these problems, sampling is not an approximation — it is the correct approach.

NS OS recognizes probabilistic sampling compute as a distinct computational plane.

This plane is grounded in physical processes that naturally explore energy landscapes rather than exhaustively enumerating possibilities.

## 5. Thermodynamic Sampling as a First-Class Capability

Thermodynamic sampling is not treated as intelligence.

It is treated as:

- a method of exploration
- a way to estimate distributions
- a mechanism for finding stable configurations

Sampling is always:

- bounded
- declared
- observable
- subordinate to policy

NS OS never allows sampling to silently decide outcomes.

## 6. Routing Problems to Physics

NS OS does not attempt to force all problems into a single computational paradigm.

Instead, it routes work based on:

- intent
- constraints
- uncertainty
- required guarantees

Deterministic control governs.
Parallel acceleration scales.
Probabilistic sampling explores.

This separation preserves clarity and prevents misuse of powerful tools.

## 7. Composition Over Substitution

The compute planes in NS OS are not competitors.

They are composable.

A single intent may involve:

- deterministic policy evaluation
- parallel numerical analysis
- bounded probabilistic sampling

Each plane contributes what it does best.

No plane is allowed to impersonate another.

## 8. Hardware Independence by Design

NS OS does not bind its worldview to specific hardware implementations.

The compute planes are conceptual.

They may be realized through:

- general-purpose processors
- specialized accelerators
- future hardware not yet conceived

The abstractions must remain valid regardless of substrate.

## 9. Why This Worldview Matters

When computational modes are confused:

- optimization becomes ungovernable
- intelligence becomes opaque
- trust erodes

By respecting the limits and strengths of each mode, NS OS maintains:

- legibility
- accountability
- robustness

Power is only useful when it is understood.

**Closing Statement**

NS OS treats computation as a pluralistic discipline.

It does not ask what is fastest, but what is appropriate.

By aligning problems with the physics best suited to address them, NS OS remains coherent in the face of increasing complexity — regardless of how the underlying hardware evolves.`
    }
];

export default function OSIdeation() {
    const [activeDoc, setActiveDoc] = useState(PROSPECTUS_CONTENT[0]);

    return (
        <div data-theme="dark">
            {/* Force dark theme for this "secret" area */}
            <Layout>
                <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#050505] text-gray-300">

                    {/* Sidebar */}
                    <aside className="w-80 flex-shrink-0 border-r border-white/10 bg-black/50 overflow-y-auto font-mono">
                        <div className="p-6 border-b border-white/10">
                            <h1 className="text-xl font-bold tracking-tight text-white mb-2">NS OS</h1>
                            <div className="text-xs uppercase tracking-widest opacity-50">Confidential Prospectus</div>
                            <div className="text-[10px] uppercase tracking-widest opacity-30 mt-1">Version 0.1.0-alpha</div>
                        </div>
                        <nav className="p-4 space-y-1">
                            {PROSPECTUS_CONTENT.map((doc) => (
                                <button
                                    key={doc.id}
                                    onClick={() => setActiveDoc(doc)}
                                    className={`w-full text-left px-4 py-3 text-xs uppercase tracking-wider transition-all border-l-2 ${activeDoc.id === doc.id
                                        ? 'border-brand bg-brand/10 text-white'
                                        : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                                        }`}
                                >
                                    {doc.title}
                                </button>
                            ))}
                        </nav>
                        <div className="p-6 mt-auto">
                            <div className="text-[10px] text-gray-700 leading-relaxed">
                                RESTRICTED ACCESS.<br />
                                DO NOT DISTRIBUTE.<br />
                                PROPERTY OF NORTHFIELD SOLIDARITY LLC.
                            </div>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 overflow-y-auto">
                        <div className="max-w-3xl mx-auto py-16 px-12">
                            <div className="mb-12 pb-6 border-b border-white/10">
                                <h2 className="text-3xl font-bold text-white mb-2">{activeDoc.title}</h2>
                                <div className="text-brand text-xs uppercase tracking-widest font-bold">Encrypted via GGP Protocol</div>
                            </div>

                            <article className="prose prose-invert prose-p:leading-relaxed prose-headings:font-bold prose-headings:tracking-tight prose-strong:text-white prose-li:text-gray-400 max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {activeDoc.content}
                                </ReactMarkdown>
                            </article>

                            <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 uppercase tracking-widest">
                                <div>Doc ID: {activeDoc.id.toUpperCase()}_REV_01</div>
                                <div>End of File</div>
                            </div>
                        </div>
                    </main>

                </div>
            </Layout >
        </div >
    );
}
