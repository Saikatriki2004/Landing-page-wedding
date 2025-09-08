import React, { useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/button.jsx";
import { Card, CardHeader, CardContent } from "../components/ui/card.jsx";
import { Input } from "../components/ui/input.jsx";
import { Textarea } from "../components/ui/textarea.jsx";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog.jsx";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion.jsx";
import { Carousel, CarouselContent, CarouselItem } from "../components/ui/carousel.jsx";
import { Toaster, toast } from "../components/ui/sonner.jsx";
import { Camera, Film, Heart, MapPin, Phone, Mail, Check, Star, IndianRupee } from "lucide-react";
import { ABOUT_BLURB, CONTACT, GALLERY, HERO_IMAGE, NAV_LINKS, PRICING, SERVICES, TAGLINE } from "../mocks/omkarnath.mock";
import "../styles/artworld.css";

const ICONS = { Camera, Film, Heart, MapPin };

export default function OmkarnathLanding() {
  const refs = {
    about: useRef(null),
    services: useRef(null),
    gallery: useRef(null),
    testimonials: useRef(null),
    pricing: useRef(null),
    contact: useRef(null),
  };
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (key) => {
    const el = refs[key]?.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const existing = JSON.parse(localStorage.getItem("omkarnath_inquiries") || "[]");
      existing.push({ ...data, ts: Date.now() });
      localStorage.setItem("omkarnath_inquiries", JSON.stringify(existing));
      toast.success("Inquiry received! We'll reach out within 24 hours.");
      e.currentTarget.reset();
    } catch (err) {
      toast.error("Could not save locally. Please try again.");
    }
  };

  const ServiceIcon = ({ name }) => {
    const I = ICONS[name] || Camera;
    return <I size={22} className="text-[color:var(--omk-gold)]" />;
  };

  const galleryThumbs = useMemo(() => GALLERY.slice(0, 12), []);

  return (
    <div className="min-h-screen bg-[color:var(--omk-charcoal)] text-[color:var(--omk-ivory)] font-sans">
      {/* Header */}
      <header className="site-header glass-header">
        <div className="container-art site-header-inner">
          <div className="flex items-center gap-3">
            <div className="badge-gold">OMKARNATH</div>
            <span className="caption hidden sm:inline">Indian Wedding Photo + Cinema</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 caption">
            {NAV_LINKS.map((l) => (
              <button key={l.key} onClick={() => handleScroll(l.key)} className="hover:text-[color:var(--omk-gold)]">
                {l.label}
              </button>
            ))}
            <Button onClick={() => handleScroll("contact")} className="rounded-full bg-[color:var(--omk-red)] hover:bg-[#9f1f1f]">
              Book Now
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-wrap">
        <img src={HERO_IMAGE} alt="Indian wedding mandap" className="hero-img" />
        <div className="hero-overlay" />
        <div className="container-art hero-content">
          <div className="max-w-2xl glass-card p-6 md:p-8">
            <div className="eyebrow mb-2">Wedding Photography & Cinematography</div>
            <h1 className="hero-title mb-4">OMKARNATH</h1>
            <p className="body-text mb-6">{TAGLINE}</p>
            <div className="flex flex-wrap gap-3">
              <a href="#gallery" onClick={(e)=>{e.preventDefault(); handleScroll('gallery');}} className="btn btn-primary">View Work</a>
              <a href="#contact" onClick={(e)=>{e.preventDefault(); handleScroll('contact');}} className="btn btn-contrast">Book Now</a>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section ref={refs.about} className="section-spacing container-art">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2">
            <div className="eyebrow mb-3">About</div>
            <h2 className="section-title mb-5">Stories you can feel. Art you can keep.</h2>
            <p className="body-text">{ABOUT_BLURB}</p>
          </div>
          <div className="glass-card p-5 float-soft">
            <div className="flex items-center gap-3 mb-4">
              <Star className="text-[color:var(--omk-gold)]" />
              <div className="font-semibold">Why couples choose us</div>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Editorial meets documentary</AccordionTrigger>
                <AccordionContent>
                  We balance timeless portraits with authentic, unscripted moments from every ritual.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Reliable &amp; unobtrusive crew</AccordionTrigger>
                <AccordionContent>
                  A seasoned team that blends in, anticipates moments, and supports your planner.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Color-crafted for Indian weddings</AccordionTrigger>
                <AccordionContent>
                  Rich reds, deep golds, and true skin tones—graded meticulously for print and screen.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Services */}
      <section ref={refs.services} className="section-spacing cta-band">
        <div className="container-art">
          <div className="flex items-end justify-between mb-8">
            <div>
              <div className="eyebrow mb-2">Services</div>
              <h2 className="section-title">What we offer</h2>
            </div>
            <Button onClick={() => handleScroll('contact')} className="rounded-full bg-[color:var(--omk-red)] hover:bg-[#9f1f1f]">Get a Quote</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => (
              <Card key={s.title} className="glass-card">
                <CardHeader className="flex flex-row items-center gap-3">
                  <ServiceIcon name={s.icon} />
                  <div className="font-semibold">{s.title}</div>
                </CardHeader>
                <CardContent className="space-y-3 pb-5">
                  {s.bullets.map((b) => (
                    <div key={b} className="flex gap-2 items-start caption">
                      <Check size={16} className="text-[color:var(--omk-gold)] translate-y-[2px]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section ref={refs.gallery} id="gallery" className="section-spacing container-art">
        <div className="eyebrow mb-2">Gallery</div>
        <h2 className="section-title mb-6">Highlights</h2>
        <Carousel>
          <CarouselContent>
            {galleryThumbs.map((g, idx) => (
              <CarouselItem key={g.url} className="basis-11/12 md:basis-1/2 lg:basis-1/3 p-2">
                <button
                  onClick={() => { setActiveIndex(idx); setLightboxOpen(true); }}
                  className="img-frame block w-full overflow-hidden group"
                >
                  <img src={g.url} alt={g.title} className="w-full h-64 md:h-72 object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </button>
                <div className="flex items-center justify-between mt-2 caption">
                  <div>{g.title}</div>
                  <div className="text-[color:var(--omk-gold)]">{g.caption}</div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl">
            <DialogHeader>
              <DialogTitle>{GALLERY[activeIndex]?.title}</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <img src={GALLERY[activeIndex]?.url} alt={GALLERY[activeIndex]?.title} className="w-full max-h-[70vh] object-contain rounded-md" />
              <div className="flex justify-between mt-3">
                <Button variant="outline" onClick={() => setActiveIndex((i) => (i - 1 + GALLERY.length) % GALLERY.length)}>Prev</Button>
                <Button onClick={() => setActiveIndex((i) => (i + 1) % GALLERY.length)}>Next</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </section>

      {/* Testimonials */}
      <section ref={refs.testimonials} className="section-spacing cta-band">
        <div className="container-art">
          <div className="eyebrow mb-2">Testimonials</div>
          <h2 className="section-title mb-8">Words from our couples</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY.length > 0 &amp;&amp; [0,1,2].map((i) => (
              <Card key={i} className="glass-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={16} className="text-[color:var(--omk-gold)]" />
                  ))}
                </div>
                <p className="body-text mb-4">“{i === 0 ? "Every frame feels alive. They captured the chaos, the calm, and every stolen glance—exactly how we lived it." : i === 1 ? "Cinematic yet intimate. Our families cried watching the highlight film. Best decision we made." : "Professional, warm, and unbelievably creative. The photos look like magazine editorials—yet they feel like us."}”</p>
                <div className="caption">{i === 0 ? "Aarav &amp; Ananya" : i === 1 ? "Raghav &amp; Priya" : "Kabir &amp; Meera"}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section ref={refs.pricing} className="section-spacing container-art">
        <div className="eyebrow mb-2">Pricing</div>
        <h2 className="section-title mb-8">Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING.map((p) => (
            <Card key={p.name} className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="font-serif text-2xl">{p.name}</div>
                <div className="flex items-center gap-1 text-[color:var(--omk-gold)] font-semibold">
                  <IndianRupee size={18} />
                  <span>{p.price}</span>
                </div>
              </div>
              <div className="space-y-2 caption">
                {p.includes.map((inc) => (
                  <div key={inc} className="flex items-start gap-2">
                    <Check size={16} className="text-[color:var(--omk-gold)] translate-y-[2px]" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button onClick={() => handleScroll('contact')} className="w-full rounded-full bg-[color:var(--omk-red)] hover:bg-[#9f1f1f]">Select</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Band */}
      <section className="cta-band">
        <div className="container-art section-spacing flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="eyebrow mb-1">Limited Dates</div>
            <h3 className="font-serif text-2xl">Now booking 2025–2026 weddings</h3>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-contrast" onClick={() => handleScroll('contact')}>Start Your Story</button>
            <button className="btn btn-ghost" onClick={() => handleScroll('gallery')}>View Gallery</button>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section ref={refs.contact} id="contact" className="section-spacing container-art">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="eyebrow mb-2">Inquiry</div>
            <h2 className="section-title mb-6">Tell us about your wedding</h2>
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input required name="name" placeholder="Your Name" />
                <Input required type="email" name="email" placeholder="Email" />
                <Input name="phone" placeholder="Phone" />
                <Input name="city" placeholder="City / Venue" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input name="dates" placeholder="Wedding Dates" />
                <Input name="events" placeholder="Events (Haldi, Sangeet, Pheras, etc.)" />
              </div>
              <Textarea name="message" placeholder="Tell us your vision, style, or any details" rows={5} />
              <div className="flex items-center justify-between">
                <div className="caption">We respond within 24 hours.</div>
                <Button type="submit" className="rounded-full bg-[color:var(--omk-red)] hover:bg-[#9f1f1f]">Send Inquiry</Button>
              </div>
            </form>
          </div>
          <div className="md:col-span-2">
            <div className="eyebrow mb-2">Contact</div>
            <Card className="glass-card p-6">
              <div className="flex items-center gap-2 mb-3"><Phone size={18} className="text-[color:var(--omk-gold)]" /><span className="caption">{CONTACT.phone}</span></div>
              <div className="flex items-center gap-2 mb-3"><Mail size={18} className="text-[color:var(--omk-gold)]" /><span className="caption">{CONTACT.email}</span></div>
              <div className="flex items-center gap-2"><MapPin size={18} className="text-[color:var(--omk-gold)]" /><span className="caption">{CONTACT.location}</span></div>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-white/10">
        <div className="container-art py-8 flex flex-col md:flex-row items-center justify-between gap-4 caption">
          <div>© {new Date().getFullYear()} OMKARNATH Studio. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a className="hover:text-[color:var(--omk-gold)]" href="#" onClick={(e)=>{e.preventDefault(); handleScroll('about');}}>About</a>
            <a className="hover:text-[color:var(--omk-gold)]" href="#" onClick={(e)=>{e.preventDefault(); handleScroll('services');}}>Services</a>
            <a className="hover:text-[color:var(--omk-gold)]" href="#" onClick={(e)=>{e.preventDefault(); handleScroll('contact');}}>Contact</a>
          </div>
        </div>
      </footer>

      <Toaster position="top-right" richColors />
    </div>
  );
}