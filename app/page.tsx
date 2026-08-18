"use client";

import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2026-11-26T18:00:00+05:30");

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

export default function Home() {
  return (
    <main>
      <div className="petals" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => <i key={index} />)}
      </div>

      <section className="hero">
        <p className="eyebrow">Together with their families</p>
        <p className="inviteLine">invite you to celebrate the wedding of</p>
        <h1>Our Names</h1>
        <p className="ampersand">&amp;</p>
        <h1>Our Names</h1>
        <div className="dateBadge">
          <span>Save the date</span>
          <strong>26 November 2026</strong>
        </div>
        <a className="scrollCue" href="#celebration">Join the celebration <span>↓</span></a>
      </section>

      <section className="section countdownSection" id="celebration">
        <p className="eyebrow">The celebration begins in</p>
        <Countdown />
      </section>

      <section className="section events">
        <p className="eyebrow">Mark your calendar</p>
        <h2>Wedding Festivities</h2>
        <article className="eventCard sangeet">
          <p className="eventKicker">An evening of music &amp; joy</p>
          <h3>Sangeet</h3>
          <p>25 November 2026 · Time &amp; venue to be added</p>
        </article>
        <article className="eventCard wedding">
          <p className="eventKicker">Two hearts, one promise</p>
          <h3>Wedding</h3>
          <p>26 November 2026 · Time &amp; venue to be added</p>
        </article>
        <article className="eventCard reception">
          <p className="eventKicker">A celebration with those we love</p>
          <h3>Reception</h3>
          <p>26 November 2026 · Time &amp; venue to be added</p>
        </article>
      </section>

      <section className="section presence">
        <p className="eyebrow">Your presence is our blessing</p>
        <h2>Awaiting Your Noble Presence</h2>
        <p>With love from both families</p>
      </section>

      <section className="section venue">
        <p className="eyebrow">Where we celebrate</p>
        <h2>Venue details coming soon</h2>
        <p>The confirmed venue address and Google Maps directions will appear here.</p>
      </section>

      <footer>
        <p>With love</p>
        <h2>Our Names &amp; Our Names</h2>
        <p>26 November 2026</p>
      </footer>
    </main>
  );
}
