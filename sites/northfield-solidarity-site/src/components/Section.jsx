import React from "react";

export default function Section({ eyebrow, title, subtitle, children }) {
  return (
    <section className="max-w-5xl mx-auto py-24 px-6 flex flex-col items-center">
      <div className="max-w-3xl text-center mb-16">
        {eyebrow ? <div className="text-brand font-bold uppercase text-xs tracking-widest mb-4">{eyebrow}</div> : null}
        {title ? <h2 className="text-4xl font-bold tracking-tight leading-tight mb-6">{title}</h2> : null}
        {subtitle ? <p className="text-xl text-text-sub max-w-2xl mx-auto">{subtitle}</p> : null}
      </div>
      <div className="w-full">{children}</div>
    </section>
  );
}