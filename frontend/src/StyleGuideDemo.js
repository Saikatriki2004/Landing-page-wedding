import React from "react";
import "./styles/artworld.css";

export default function StyleGuideDemo() {
  return (
    <div className="min-h-screen bg-[color:var(--omk-charcoal)] text-[color:var(--omk-ivory)]">
      <header className="site-header glass-header">
        <div className="container-art site-header-inner">
          <div className="eyebrow">OMKARNATH</div>
          <nav className="flex items-center gap-6 caption">
            <a href="/" className="hover:text-[color:var(--omk-gold)]">Home</a>
          </nav>
        </div>
      </header>

      <main className="container-art section-spacing-large">
        <h1 className="hero-title mb-6">Style Guide</h1>
        <p className="caption mb-12">Typography, colors, and components preview</p>

        <section className="section-spacing">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <div className="eyebrow mb-2">Typography</div>
              <h2 className="section-title mb-4">Section Title</h2>
              <p className="body-text mb-3">This is body text using Inter—designed for readable paragraphs and smooth rhythm.</p>
              <p className="caption">Caption text for secondary descriptions.</p>
            </div>
            <div>
              <div className="eyebrow mb-4">Buttons</div>
              <div className="flex flex-wrap gap-4">
                <button className="btn btn-primary">Primary</button>
                <button className="btn btn-contrast">Contrast</button>
                <button className="btn btn-ghost">Ghost</button>
              </div>
            </div>
          </div>
        </section>

        <hr className="hr-soft my-12" />

        <section className="section-spacing">
          <div className="eyebrow mb-4">Colors</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[{n:'Refined Red',v:'var(--omk-red)'},{n:'Deep Gold',v:'var(--omk-gold)'},{n:'Ivory',v:'var(--omk-ivory)'},{n:'Charcoal',v:'var(--omk-charcoal)'}].map((c)=> (
              <div key={c.n} className="glass-card p-5 rounded-xl">
                <div className="h-16 w-full rounded-lg mb-4" style={{background: `color-mix(in oklab, ${c.v} 85%, black 15%)`}} />
                <div className="font-sans font-semibold">{c.n}</div>
                <div className="caption">{c.v}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}