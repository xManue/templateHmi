import React from "react";
import { Construction } from "lucide-react";

export default function PlaceholderPage({ title, description }) {
  return (
    <section className="panel-page placeholder-page">
      <Construction aria-hidden="true" />
      <span className="eyebrow">PANEL PAGE</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}
