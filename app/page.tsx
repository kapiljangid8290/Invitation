"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE, EVENTS, FAMILIES, VENUE } from "./data/wedding";

const WEDDING_DATE = new Date(COUPLE.weddingDate);

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => setRemaining(WEDDING_DATE.getTime() - Date.now());

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const safeRemaining = Math.max(0, remaining ?? 0);
  const units = [
    ["Days", Math.floor(safeRemaining / 86_400_000)],
    ["Hours", Math.floor((safeRemaining / 3_600_000) % 24)],
    ["Minutes", Math.floor((safeRemaining / 60_000) % 60)],
    ["Seconds", Math.floor((safeRemaining / 1_000) % 60)],
  ];

  return (
    <div className="countdown" aria-label="Countdown to the wedding">
      {units.map(([label, value]) => (
        <div className="countdownUnit" key={label}>
          <strong>{String(value).padStart(2, "0")}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}

function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onError = () => setAvailable(false);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setAvailable(false);
    }
  };

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src="/audio/celebration.mp3" loop preload="none" />
      <button
        type="button"
        className="musicToggle"
        onClick={toggle}
        aria-label={playing ? "Mute background music" : "Play background music"}
        aria-pressed={playing}
      >
        {playing ? "♪" : "♫"}
      </button>
    </>
  );
}

function RevealSection({ className, id, children }: { className?: string; id?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) node.classList.add("isVisible");
      },
      { threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`reveal ${className ?? ""}`.trim()} id={id}>
      {children}
    </section>
  );
}

function FloralScatter() {
  const blooms = ["✿", "❀", "✾", "🌸", "🍃"];

  return (
    <div className="floralScatter" aria-hidden="true">
      {blooms.map((bloom, index) => (
        <span key={index} style={{ ["--bloom-i" as string]: index }}>
          {bloom}
        </span>
      ))}
    </div>
  );
}

function EventSchedule() {
  const [activeId, setActiveId] = useState(EVENTS[0].id);
  const activeEvent = EVENTS.find((event) => event.id === activeId) ?? EVENTS[0];

  return (
    <div className="eventSchedule">
      <div className="eventTabs" role="tablist" aria-label="Wedding events">
        {EVENTS.map((event) => {
          const selected = event.id === activeId;

          return (
            <button
              key={event.id}
              type="button"
              role="tab"
              id={`tab-${event.id}`}
              aria-selected={selected}
              aria-controls={`panel-${event.id}`}
              className={`eventTab ${event.theme}${selected ? " isActive" : ""}`}
              onClick={() => setActiveId(event.id)}
            >
              {event.title}
            </button>
          );
        })}
      </div>

      <article
        className={`eventCard ${activeEvent.theme}`}
        role="tabpanel"
        id={`panel-${activeEvent.id}`}
        aria-labelledby={`tab-${activeEvent.id}`}
      >
        <div className="eventCardInner">
          <p className="eventKicker">{activeEvent.kicker}</p>
          <h3>{activeEvent.title}</h3>
          <div className="eventIllustration">
            <img src={activeEvent.image} alt={activeEvent.alt} />
          </div>
          <dl className="eventDetails">
            <div>
              <dt>Date</dt>
              <dd>{activeEvent.dateLabel}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{activeEvent.timeLabel}</dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>{activeEvent.venueLabel}</dd>
            </div>
          </dl>
        </div>
      </article>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <MusicToggle />

      <section className="hero">
        <img className="floralFrame" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <span className="ganeshaIcon" aria-hidden="true">
          ॐ
        </span>
        <p className="eyebrow">Together with their families</p>
        <p className="inviteLine">invite you to celebrate the wedding of</p>
        <div className="coupleNames">
          <h1>{COUPLE.groom}</h1>
          <p className="ampersand">&amp;</p>
          <h1>{COUPLE.bride}</h1>
        </div>
        <div className="heroPortrait">
          <img src="/art/kapil-somya-hero.png" alt="Illustrated portrait of Kapil and Somya" />
        </div>
        <a className="scrollCue" href="#save-the-date">
          Scroll to celebrate <span>↓</span>
        </a>
      </section>

      <RevealSection className="section saveDateSection" id="save-the-date">
        <div className="saveDateBanner">
          <span>Save the date</span>
          <strong>{COUPLE.displayDate}</strong>
        </div>
        <p className="countdownIntro">The celebration begins in</p>
        <Countdown />
      </RevealSection>

      <RevealSection className="section events" id="celebration">
        <h2 className="scriptTitle">Events Schedule</h2>
        <EventSchedule />
      </RevealSection>

      <RevealSection className="section presence">
        <FloralScatter />
        <h2 className="scriptTitle">Awaiting Your Noble Presence</h2>
        <p className="presenceLine">With love from both families</p>
        <div className="familiesBlock">
          <p className="familiesHeading">The Families</p>
          <p>{FAMILIES.groomSide}</p>
          <p className="familyAmp">&amp;</p>
          <p>{FAMILIES.brideSide}</p>
        </div>
      </RevealSection>

      <RevealSection className="section venue" id="venue">
        <FloralScatter />
        <h2 className="scriptTitle">Where We Celebrate</h2>
        <p className="venueName">{VENUE.name}</p>
        <p className="venueSubtitle">{VENUE.subtitle}</p>
        <p className="venueAddress">{VENUE.address}</p>
        <div className="mapWrap">
          <iframe
            title="Siwanchi Bhawan location on Google Maps"
            src={VENUE.mapEmbed}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <a className="directionsBtn" href={VENUE.directionsUrl} target="_blank" rel="noopener noreferrer">
          <span className="directionsIcon" aria-hidden="true">
            ✈
          </span>
          Get Directions
        </a>
      </RevealSection>

      <footer>
        <FloralScatter />
        <p className="footerEyebrow">With love</p>
        <h2>
          {COUPLE.groom} &amp; {COUPLE.bride}
        </h2>
        <p className="footerDate">{COUPLE.displayDate}</p>
        <p className="footerVenue">{VENUE.name}, Jodhpur</p>
        {COUPLE.hashtag ? <p className="hashtag">{COUPLE.hashtag}</p> : null}
      </footer>
    </main>
  );
}
