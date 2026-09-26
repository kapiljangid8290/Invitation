export const COUPLE = {
  bride: "Somya",
  groom: "Kapil",
  weddingDate: "2026-11-26T19:30:00+05:30",
  displayDate: "26th November 2026",
  shortDate: "26 November 2026",
  hashtag: "#SomyaAndKapil",
};

export const EVENTS = [
  {
    id: "hathkam-bade-geet",
    title: "Moong Bikherna & Hathkam",
    description: "A joyful morning of rituals and a begining of forever.",
    dateLabel: "Tuesday, 24 November 2026",
    timeLabel: "10:00 AM onwards",
    scheduleDetails: [
      { label: "Moong Bikherna & Hathkam", time: "10 AM onwards" },
      { label: "Mehndi", time: "4 PM onwards" },
    ],
    image: "/art/hathkam-hands.jpg",
    alt: "Somya and Kapil holding hands with Mehndi and festive yellow bangles",
    theme: "hathkamBadeGeet",
  },
  {
    id: "haldi-sangeet",
    title: "Haldi & Sangeet",
    themeLabel: "Phoolon Ki Haldi · Mandatory theme — yellow/orange",
    description: "A playful morning of flowers and togetherness, followed by an evening of music, dance and celebrations.",
    dateLabel: "Wednesday, 25 November 2026",
    timeLabel: "8:30 AM & 7:00 PM",
    scheduleDetails: [
      { label: "Haldi", time: "8:30 AM onwards" },
      { label: "Sangeet", time: "7:00 PM onwards" },
    ],
    image: "/art/haldi-sangeet.jpg",
    alt: "Somya and Kapil dancing together outdoors celebrating Haldi and Sangeet",
    theme: "haldiSangeet",
  },
  {
    id: "wedding",
    title: "The Wedding",
    description: "Join us as we begin our forever surrounded by love and blessings.",
    dateLabel: "Thursday, 26 November 2026",
    timeLabel: "8:00 PM onwards",
    image: "/art/wedding-26-november.jpg",
    alt: "Somya and Kapil embracing in a grassy field",
    theme: "wedding",
  },
] as const;

export const VENUE = {
  name: "Siwanchi Bhawan",
  subtitle: "Yatrik Bhavan",
  city: "Jodhpur, Rajasthan",
  address: "Siwanchi Bhawan (Yatrik Bhavan), 9A, Heavy Industrial Area, Near Raj Pump Road, opposite ISUZU Showroom, Heavy Industrial Area Phase II, Basni, Jodhpur, Rajasthan 342011",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.032736775232!2d73.00137787487249!3d26.257033287961484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418de885b261d5%3A0xe8fc3b0eadcbc976!2sSiwanchi%20Bhawan%20(Yatrik%20bhavan)!5e1!3m2!1sen!2sin!4v1787042956699!5m2!1sen!2sin",
  directionsUrl: "https://maps.app.goo.gl/GMvJPsd3W2c53oVx6",
};

export const FAMILIES = {
  groomSide: "Mr. & Mrs. [Groom Family Name]",
  brideSide: "Mr. & Mrs. [Bride Family Name]",
};
