"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE, EVENTS, VENUE } from "./data/wedding";

const WEDDING_DATE = new Date(COUPLE.weddingDate);

function Countdown() {
  const [remaining, setRemaining] = useState(WEDDING_DATE.getTime() - Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setRemaining(WEDDING_DATE.getTime() - Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const safeRemaining = Math.max(0, remaining);
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

export default function Home() {
  return (
    <main>
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <MusicToggle />

      <section className="hero">
        <img className="floralTop" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <p className="eyebrow">Together with their families</p>
        <p className="inviteLine">invite you to celebrate the wedding of</p>
        <h1>{COUPLE.groom}</h1>
        <p className="ampersand">&amp;</p>
        <h1>{COUPLE.bride}</h1>
        <img className="heroArt" src="/art/kapil-somya-hero.png" alt="Illustrated portrait of Kapil and Somya" />
        <div className="dateBadge">
          <span>Save the date</span>
          <strong>{COUPLE.displayDate}</strong>
        </div>
        <a className="scrollCue" href="#celebration">
          Join the celebration <span>↓</span>
        </a>
      </section>

      <RevealSection className="section countdownSection" id="celebration">
        <p className="eyebrow">The celebration begins in</p>
        <Countdown />
      </RevealSection>

      <RevealSection className="section events">
        <p className="eyebrow">Mark your calendar</p>
        <h2>Wedding Festivities</h2>
        {EVENTS.map((event) => (
          <article className={`eventCard ${event.theme}`} key={event.id}>
            <p className="eventKicker">{event.kicker}</p>
            <h3>{event.title}</h3>
            <p className="eventWhen">
              {event.date} · {event.time}
            </p>
            <p className="eventVenue">{VENUE.name}, {VENUE.city}</p>
            <img src={event.image} alt={event.alt} />
          </article>
        ))}
      </RevealSection>

      <RevealSection className="section presence">
        <p className="eyebrow">Your presence is our blessing</p>
        <h2>Awaiting Your Noble Presence</h2>
        <p>With love from both families</p>
      </RevealSection>

      <RevealSection className="section venue" id="venue">
        <p className="eyebrow">Where we celebrate</p>
        <h2>{VENUE.name}</h2>
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
          Get directions
        </a>
      </RevealSection>

      <footer>
        <p>With love</p>
        <h2>
          {COUPLE.groom} &amp; {COUPLE.bride}
        </h2>
        <p>{COUPLE.displayDate}</p>
        <p className="venueNote">{VENUE.name}, Jodhpur</p>
      </footer>
    </main>
  );
}
