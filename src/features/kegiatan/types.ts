export interface EventCardProps {
    id: number;
    title: string;
    img: string;
    start: Date;
    end: Date;
    description: string;
    type : string;
}

export interface DynamicCalendarProps {
  events: EventCardProps[];
  className?: string;
}

export interface WithVariantEventCardProps extends EventCardProps {
  variant?: "detail" | "onGoing" | "notGoing";
}

export interface EventWithVariantProps extends EventCardProps {
  start: Date;
}

export interface SortedSingleEventsProps {
  pastNotGoing?: EventWithVariantProps;
  nextOnGoing?: EventWithVariantProps;
  futureNotGoing?: EventWithVariantProps;
}

export interface FindEventByIdProps {
  id: number;
  indexedEvents: Record<string, EventCardProps[]>;
}

export interface FindEventByMonthYearProps {
  month: string;
  year: number;
  indexedEvents: Record<string, EventCardProps[]>;
}

//data ui
export interface BreadCrumbItems {
  display: string;
  link: string;
}