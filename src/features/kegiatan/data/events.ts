export interface CalendarEvent {
  id: number;
  title: string;
  date: Date; // ISO: YYYY-MM-DD
  description: string;
  image: string;
  slug: string;
}

export const EVENTS: CalendarEvent[] = [
  {
    id: 1,
    title: "Workshop Next.js",
    date: new Date("2025-12-15"),
    slug: "agenda/workshop-nextjs",
    image: "contohsamping.png",
    description: "Learn the latest features of Next.js in this hands-on workshop.",
  },
  {
    id: 2,
    title: "Workshop React",
    date: new Date("2025-12-20"),
    slug: "agenda/workshop-react",
    image: "contohtengah.png",
    description: "Learn the latest features of React in this hands-on workshop.",
  },
  {
    id: 3,
    title: "Workshop Vue",
    date: new Date("2025-01-30"),
    slug: "agenda/workshop-vue",
    image: "contohsamping.png",
    description: "Learn the latest features of Vue in this hands-on workshop.",
  },
  {
    id: 4,
    title: "Workshop Svelte",
    date: new Date("2025-02-15"),
    slug: "agenda/workshop-svelte",
    image: "contohtengah.png",
    description: "Learn the latest features of Svelte in this hands-on workshop.",
  },
  {
    id: 5,
    title: "Workshop Angular",
    date: new Date("2025-03-01"),
    slug: "agenda/workshop-angular",
    image: "contohsamping.png",
    description: "Learn the latest features of Angular in this hands-on workshop.",
  },
  {
    id: 6,
    title: "Workshop SolidJS",
    date: new Date("2025-04-01"),
    slug: "agenda/workshop-solidjs",
    image: "contohtengah.png",
    description: "Learn the latest features of SolidJS in this hands-on workshop.",
  },
  {
    id: 7,
    title: "Workshop Svelte",
    date: new Date("2025-04-15"),
    slug: "agenda/workshop-svelte",
    image: "contohsamping.png",
    description: "Learn the latest features of Svelte in this hands-on workshop.",
  },
  {
    id: 8,
    title: "Workshop Astro",
    date: new Date("2025-05-01"),
    slug: "agenda/workshop-astro",
    image: "contohtengah.png",
    description: "Learn the latest features of Astro in this hands-on workshop.",
  },
  {
    id: 9,
    title: "Workshop Remix",
    date: new Date("2025-05-15"),
    slug: "agenda/  workshop-remix",
    image: "contohtengah.png",
    description: "Learn the latest features of Remix in this hands-on workshop.",
  }
];
