# Wedding Invitation Website — Project Handoff

## Purpose

Build an original, mobile-first wedding invitation website inspired by the supplied screen recording. The website should provide the same type of experience and interactions, without reusing the reference site's assets, copy, illustrations, or branding.

## Source Reference

- Recording: `C:\Users\kapil\Downloads\Screenrecorder-2026-08-17-23-36-43-76.mp4`
- Duration reviewed: approximately 22 seconds
- Reference style: soft floral Indian wedding invitation, designed as a long vertical mobile scroll.

## Visual Direction

- Background: warm ivory/off-white with gentle pastel sections.
- Decoration: hand-painted floral sprigs, leaves, flower motifs, and a subtle animated falling-petals layer.
- Typography: expressive calligraphic/script font for names and major headings; refined serif or clean sans-serif for supporting details.
- Mood: romantic, celebratory, elegant, and personalised.
- Motion: slow, unobtrusive petals drifting down; smooth section reveals; optional background music with an obvious mute/unmute control.
- Layout: responsive, but optimised first for a phone screen.

## Required Sections

1. **Hero / invitation opening**
   - Floral framed opening.
   - Couple's names.
   - Invitation line and wedding date.
   - Decorative petals and optional music toggle.

2. **Save the date and countdown**
   - Prominent wedding date.
   - Live days / hours / minutes / seconds countdown.

3. **Event schedule**
   - One visually distinct card for each celebration.
   - Suggested events: Sangeet, Haldi/Mehendi, Wedding, Reception (use only the events supplied by the couple).
   - Each card includes title, short line, date, time, venue, and an illustrated couple scene.

4. **Invitation / families message**
   - A welcoming line such as “Awaiting Your Noble Presence”.
   - Bride and groom family names, once supplied.

5. **Venue and directions**
   - Venue name and full address.
   - Embedded map or map preview.
   - Button linking to Google Maps directions.

6. **Closing**
   - “With love” message.
   - Couple names, wedding date, and optional wedding hashtag.

## Couple Illustration Brief

When source photos are supplied, create original animated-art / illustrated versions of the real couple. The artwork should:

- Preserve recognisable facial features, complexion, hairstyle, and proportions from the provided images.
- Use a cohesive, polished Indian-wedding illustration style across all event cards.
- Depict outfits and poses appropriate to each event.
- Avoid resembling a stock couple or a different person.
- Be used as original site assets, not copied from the reference recording.

## Supplied Couple Reference Assets

These are the approved visual references for preserving the couple's likeness in original illustrated artwork:

- `C:\Users\kapil\Downloads\IMG-20260808-WA0004.jpg` — bride full-length reference.
- `C:\Users\kapil\Downloads\Screenshot_2026-05-12-21-09-32-832_com.instagram.android.jpg` — couple reference collage, including multiple close-up and seated poses.
- `C:\Users\kapil\Downloads\IMG_2402.jpg` — couple close-up reference.
- `C:\Users\kapil\Downloads\IMG-20260810-WA0012.jpg` — couple full-length evening portrait.
- `C:\Users\kapil\Downloads\IMG-20260810-WA0019.jpg` — couple full-length evening portrait with clear facial reference.

`C:\Users\kapil\Downloads\file_0000000091988208b9fbf9a5b73cd1db.png` is a polished save-the-date visual reference showing a navy-and-powder-blue formal palette and a floral, fairy-light setting. Its visible text says “26th November”; treat that date as unconfirmed until the couple provides the final invitation details.

## Reference Recording Behaviours Observed

- Animated floral/petal overlay persists while the visitor scrolls.
- Countdown updates continuously.
- Event cards are strongly themed and feature couple caricatures/illustrations.
- Venue section contains an integrated interactive map and a directions CTA.
- A small audio button appears during the page experience.
- The content is arranged in a deliberate, story-like vertical sequence.

## Information Still Needed

### Couple assets

- Clear front-facing and full-length photos of both partners.
- Preferred event outfits / colour palette, if different from the photos.
- Any specific pose, cultural attire, or illustration preference.

### Invitation copy

- Bride and groom full names.
- Confirmed dates: Sangeet on **25 November 2026**; Wedding and Reception on **26 November 2026**.
- Exact ceremony, reception, and Sangeet times.
- Event list, each date, time, venue, and address.
- Parent/family names and desired invitation wording.
- RSVP contact(s), if an RSVP section is wanted.
- Wedding hashtag, if any.
- Google Maps URLs for venues.

### Optional choices

- Background music file or preferred song/style.
- Language(s) for the invitation.
- Hosting preference and custom domain, if applicable.

## Implementation Notes

- Stack: Next.js 16, React 19, TypeScript, and CSS (App Router).
- Keep event data separate from the presentation so dates, wording, and venues can be updated easily.
- Use accessible text contrast, keyboard-friendly controls, and reduced-motion support.
- Optimise images and animations for mobile performance.
- Use an original floral illustration set and original couple illustrations.
- Do not make the website dependent on the social-media interface visible around the recording; it is not part of the invitation site.

## Current Status

- Reference recording reviewed.
- Next.js mobile-first foundation created, including a hero, animated falling petals, live countdown, event-card placeholders, venue placeholder, and closing section.
- Production build passes.
- Couple photo references registered; awaiting final names, event details, venue/map links, and any additional art-direction preferences before final content and custom illustration assets are created.

## Local Development

```bash
npm run dev
```

Open `http://localhost:3000` in a browser. Use `npm run build` to create and verify a production build.

## Continuation Checklist for Another AI or Developer

1. Read this file first.
2. Inspect all supplied couple photos and wedding content.
3. Confirm the final event list and date/time details.
4. Create the original couple illustration assets.
5. Build the responsive invitation page and its animations.
6. Verify the site on a mobile viewport and test countdown, maps, audio, and all calls to action.
7. Update this handoff file with the final content, asset locations, and deployment instructions.
