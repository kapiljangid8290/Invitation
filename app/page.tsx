"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE, EVENTS, VENUE } from "./data/wedding";

const WEDDING_DATE = new Date(COUPLE.weddingDate);
type EventId = (typeof EVENTS)[number]["id"];

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

function EnvelopeIntro({ isOpening, onOpen }: { isOpening: boolean; onOpen: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div className={`envelopeIntro${isOpening ? " isOpening" : ""}`} role="dialog" aria-modal="true" aria-label="Wedding invitation welcome">
      <div className="envelopeSparkles" aria-hidden="true">
        {Array.from({ length: 10 }, (_, index) => (
          <i key={index} />
        ))}
      </div>
      <div className="envelopeContent">
        <p className="envelopeEyebrow">An Invitation From The Heart</p>
        <p className="envelopeNames">Kapil &amp; Somya</p>
        <button className="envelopeButton" type="button" onClick={onOpen} disabled={isOpening} aria-label="Open Kapil and Somya's wedding invitation">
          <span className="envelope" aria-hidden="true">
            <img className="envelopeBotanical envelopeBotanicalLeft" src="/art/floral-border-top.png" alt="" />
            <img className="envelopeBotanical envelopeBotanicalRight" src="/art/floral-border-top.png" alt="" />
            <span className="envelopeLight" />
            <span className="envelopeLetter">
              <span className="envelopeMonogram">K + S</span>
              <span className="envelopeLetterText">Kapil &amp; Somya</span>
            </span>
            <span className="envelopeBack" />
            <span className="envelopeFlap" />
            <span className="envelopeFront" />
            <span className="envelopeSeal">✿</span>
          </span>
          <span className="envelopeCta">Open Our Invitation</span>
        </button>
      </div>
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
  const [activeId, setActiveId] = useState<EventId>(EVENTS[0].id);
  const activeEvent = EVENTS.find((event) => event.id === activeId) ?? EVENTS[0];

  return (
    <div className={`eventSchedule ${activeEvent.theme}`}>
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
              onClick={() => {
                setActiveId(event.id);
              }}
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
  const [isEnvelopeVisible, setIsEnvelopeVisible] = useState(true);
  const [isEnvelopeOpening, setIsEnvelopeOpening] = useState(false);

  const openInvitation = () => {
    if (isEnvelopeOpening) return;

    window.scrollTo(0, 0);
    setIsEnvelopeOpening(true);
    window.setTimeout(() => {
      window.scrollTo(0, 0);
      setIsEnvelopeVisible(false);
    }, 2100);
  };

  return (
    <>
      {isEnvelopeVisible ? <EnvelopeIntro isOpening={isEnvelopeOpening} onOpen={openInvitation} /> : null}
      <main className={isEnvelopeVisible ? undefined : "invitationOpen"} aria-hidden={isEnvelopeVisible}>
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 24 }, (_, index) => (
          <i key={index} />
        ))}
      </div>

      <MusicToggle />

      <section className="hero">
        <img className="floralFrame" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <img className="heroBotanicalMotif" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <p className="eyebrow">With the blessings of our families</p>
        <div className="coupleNames">
          <h1>{COUPLE.groom}</h1>
          <span className="nameDivider" aria-hidden="true" />
          <p className="ampersand">&amp;</p>
          <span className="nameDivider" aria-hidden="true" />
          <h1>{COUPLE.bride}</h1>
        </div>
        <p className="inviteLine">are getting married</p>
        <p className="heroDate">25 &amp; 26 November 2026</p>
        <p className="heroLocation">Jodhpur, Rajasthan</p>
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

      <RevealSection className="section invitationMessage" id="invitation">
        <img className="invitationBotanical invitationBotanicalLeft" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <img className="invitationBotanical invitationBotanicalRight" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <div className="invitationCopy">
          <h2 className="invitationHeading">Together With Our Families</h2>
          <p className="invitationParagraph">
            With hearts full of joy and gratitude, we invite you to celebrate the beginning of our forever.
          </p>
          <p className="invitationParagraph invitationParagraphLast">
            Your presence, blessings and love will make our celebrations even more special.
          </p>
          <div className="familyNames" aria-label="The Nahar and Jangid families">
            <span>Nahar&apos;s</span>
            <i className="familyOrnament" aria-hidden="true">✦</i>
            <span>Jangid&apos;s</span>
          </div>
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
    </>
  );
}
