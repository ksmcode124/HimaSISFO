export interface EventCardProps {
    id: number;
    title: string;
    img: string;
    date: Date;
    slug: string;
    description: string;
    jenis : string;
}

export interface DynamicCalendarProps {
  events: EventCardProps[];
  className?: string;
}

export interface EventDetailContentProps {
  events: EventCardProps[];
  search: string; 
}

export interface WithVariantEventCardProps extends EventCardProps {
  variant?: "detail" | "onGoing" | "notGoing";
}

export interface EventWithVariantProps extends EventCardProps {
  date: Date;
}

export interface SortedSingleEventsProps {
  pastNotGoing?: EventWithVariantProps;
  nextOnGoing?: EventWithVariantProps;
  futureNotGoing?: EventWithVariantProps;
}

export interface FindEventByIdProps {
  id: number;
  indexedEvents: Record<string, any[]>;
}

export interface FindEventByMonthYearProps {
  month: string;
  year: number;
  indexedEvents: Record<string, any[]>;
}
