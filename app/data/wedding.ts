export const COUPLE = {
  bride: "Somya",
  groom: "Kapil",
  weddingDate: "2026-11-26T18:00:00+05:30",
  displayDate: "26 November 2026",
};

export const EVENTS = [
  {
    id: "sangeet",
    title: "Sangeet",
    kicker: "An evening of music & joy",
    date: "25 November 2026",
    time: "7:00 PM",
    image: "/art/kapil-somya-sangeet.png",
    alt: "Kapil and Somya dancing together at their Sangeet",
    theme: "sangeet",
  },
  {
    id: "wedding",
    title: "Wedding",
    kicker: "Two hearts, one promise",
    date: "26 November 2026",
    time: "From 7:30 PM",
    image: "/art/kapil-somya-wedding.png",
    alt: "Kapil and Somya at their wedding ceremony",
    theme: "wedding",
  },
  {
    id: "reception",
    title: "Reception",
    kicker: "A celebration with those we love",
    date: "26 November 2026",
    time: "From 7:30 PM",
    image: "/art/kapil-somya-reception.png",
    alt: "Kapil and Somya celebrating at their reception",
    theme: "reception",
  },
] as const;

export const VENUE = {
  name: "Siwanchi Bhawan",
  subtitle: "Yatrik Bhavan",
  city: "Jodhpur, Rajasthan",
  address: "Siwanchi Bhawan (Yatrik Bhavan), Jodhpur, Rajasthan",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.032736775232!2d73.00137787487249!3d26.257033287961484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418de885b261d5%3A0xe8fc3b0eadcbc976!2sSiwanchi%20Bhawan%20(Yatrik%20bhavan)!5e1!3m2!1sen!2sin!4v1787042956699!5m2!1sen!2sin",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=26.257033287961484,73.00137787487249",
};
