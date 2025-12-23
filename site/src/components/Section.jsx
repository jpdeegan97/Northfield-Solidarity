import React from "react";

export default function Section({ eyebrow, title, subtitle, children }) {
  return (
    <section className="section">
      <div className="sectionHead">
        {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
        {title ? <h2 className="h2">{title}</h2> : null}
        {subtitle ? <p className="sub">{subtitle}</p> : null}
      </div>
      <div className="sectionBody">{children}</div>
    </section>
  );
}