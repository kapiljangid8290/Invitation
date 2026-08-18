"use client";

import { useEffect, useRef, useState } from "react";
import { COUPLE, EVENTS, VENUE } from "./data/wedding";

const COUNTDOWN_DATE = new Date("2026-11-26T20:00:00+05:30");

function CountdownNumber({ value }: { value: number }) {
  const [shownValue, setShownValue] = useState(value);
  const [phase, setPhase] = useState<"steady" | "leaving" | "entering">("steady");

  useEffect(() => {
    if (value === shownValue) return;

    setPhase("leaving");
    const swap = window.setTimeout(() => {
      setShownValue(value);
      setPhase("entering");
    }, 150);

    return () => window.clearTimeout(swap);
  }, [shownValue, value]);

  useEffect(() => {
    if (phase !== "entering") return;
    const settle = window.setTimeout(() => setPhase("steady"), 360);
    return () => window.clearTimeout(settle);
  }, [phase]);

  return <strong className={`countdownValue ${phase}`}>{String(shownValue).padStart(2, "0")}</strong>;
}

function Countdown() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    const updateCountdown = () => setRemaining(COUNTDOWN_DATE.getTime() - Date.now());

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Keep the countdown visible during the initial client render; `remaining` is
  // intentionally populated after mount to avoid a server/client time mismatch.
  const isCelebrationTime = remaining !== null && remaining <= 0;
  const safeRemaining = Math.max(0, remaining ?? 0);
  const units = [
    ["Days", Math.floor(safeRemaining / 86_400_000)],
    ["Hours", Math.floor((safeRemaining / 3_600_000) % 24)],
    ["Minutes", Math.floor((safeRemaining / 60_000) % 60)],
    ["Seconds", Math.floor((safeRemaining / 1_000) % 60)],
  ];

  if (isCelebrationTime) {
    return <p className="celebrationState" aria-live="polite">Today, we celebrate the beginning of forever.</p>;
  }

  return (
    <div className="countdown" aria-label="Countdown to the wedding" aria-live="polite">
      {units.map(([label, value]) => (
        <div className="countdownUnit" key={label}>
          <CountdownNumber value={value as number} />
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
  return (
    <div className="eventSchedule">
      {EVENTS.map((event) => (
        <article className={`eventCard ${event.theme}`} key={event.id}>
          <div className="eventFloralFrame" aria-hidden="true">
            <img src="/art/floral-border-top.png" alt="" />
          </div>
          <div className="eventCardInner">
            <p className="eventDate">{event.dateLabel}</p>
            <h3>{event.title}</h3>
            <p className="eventDescription">{event.description}</p>
            <div className="eventDetails">
              <p><span>Time</span>{event.timeLabel}</p>
            </div>
            <div className="eventArt" aria-hidden="true">
              <i className="eventOrnament" />
              <img src={event.image} alt="" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

const STORY_ILLUSTRATIONS = [
  {
    title: "Sangeet & Reception",
    image: "/art/kapil-somya-sangeet-illustration.png",
    alt: "Hand-painted wedding illustration of Kapil and Somya in festive Indian attire",
    theme: "festive",
  },
  {
    title: "The Wedding",
    image: "/art/kapil-somya-wedding-illustration.png",
    alt: "Hand-painted wedding illustration of Kapil and Somya in traditional wedding attire",
    theme: "wedding",
  },
  {
    title: "Forever Begins",
    image: "/art/kapil-somya-reception-illustration.png",
    alt: "Romantic hand-painted illustration of Kapil and Somya together",
    theme: "forever",
  },
] as const;

function StoryIllustrations() {
  return (
    <div className="storyGallery">
      {STORY_ILLUSTRATIONS.map((story) => (
        <article className={`storyCard ${story.theme}`} key={story.title}>
          <div className="storyFloral" aria-hidden="true">
            <img src="/art/floral-border-top.png" alt="" />
          </div>
          <div className="storyArt">
            <img src={story.image} alt={story.alt} loading="lazy" />
          </div>
          <h3>{story.title}</h3>
        </article>
      ))}
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
        <FloralScatter />
        <div className="saveDateBanner">
          <img className="saveDateFlower" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
          <img className="saveDateFlower saveDateFlowerLower" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
          <p className="saveDateLabel">Save the Date</p>
          <h2>25 &amp; 26 November 2026</h2>
          <div className="countdownDivider" aria-hidden="true"><span /></div>
          <p className="countdownIntro">The celebration begins in</p>
          <div className="countdownBotanicals" aria-hidden="true">
            <i className="countdownLeaf countdownLeafLeft" />
            <i className="countdownLeaf countdownLeafRight" />
            <i className="countdownBloom countdownBloomLeft" />
            <i className="countdownBloom countdownBloomRight" />
          </div>
          <Countdown />
        </div>
      </RevealSection>

      <RevealSection className="section events" id="celebration">
        <h2 className="scriptTitle">Our Wedding Celebrations</h2>
        <EventSchedule />
      </RevealSection>

      <RevealSection className="section storyIllustrations" id="our-story">
        <FloralScatter />
        <h2 className="scriptTitle">Our Story In Little Illustrations</h2>
        <StoryIllustrations />
      </RevealSection>

      <RevealSection className="section venue" id="venue">
        <FloralScatter />
        <h2 className="scriptTitle">Where We Celebrate</h2>
        <p className="venueName">Siwanchi Bhawan, Jodhpur</p>
        <p className="venueAddress">{VENUE.name} ({VENUE.subtitle})<br />{VENUE.city}</p>
        <div className="venueMapScene">
          <img className="venueBotanical venueBotanicalLeft" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
          <img className="venueBotanical venueBotanicalRight" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
          <div className="mapWrap">
            <iframe
              title="Siwanchi Bhawan location on Google Maps"
              src={VENUE.mapEmbed}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
        <div className="venueDetails" aria-label="Venue details">
          <article className="venueDetail">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z" /><circle cx="12" cy="9" r="2.4" /></svg>
            <p><span>Venue</span>Siwanchi Bhawan</p>
          </article>
          <article className="venueDetail">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18M5 21V10l7-6 7 6v11M8 21v-6h8v6M3 10h18M8 10V7h8v3" /></svg>
            <p><span>City</span>Jodhpur, Rajasthan</p>
          </article>
          <article className="venueDetail">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18M8 14h3M13 14h3" /></svg>
            <p><span>Celebration</span>25–26 November 2026</p>
          </article>
        </div>
        <a className="directionsBtn" href={VENUE.directionsUrl} target="_blank" rel="noopener noreferrer">
          <span className="directionsIcon" aria-hidden="true">→</span>
          Get Directions
        </a>
      </RevealSection>

      <RevealSection className="section familyInvitation" id="invitation">
        <img className="familyBotanical familyBotanicalLeft" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <img className="familyBotanical familyBotanicalRight" src="/art/floral-border-top.png" alt="" aria-hidden="true" />
        <h2 className="familyInvitationHeading">With Love From Our Families</h2>
        <div className="familyColumns">
          <article className="familyBlock">
            <p>Bride&apos;s Family</p>
            <h3>Nahar&apos;s</h3>
          </article>
          <i className="familySeparator" aria-hidden="true" />
          <article className="familyBlock">
            <p>Groom&apos;s Family</p>
            <h3>Jangid&apos;s</h3>
          </article>
        </div>
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
