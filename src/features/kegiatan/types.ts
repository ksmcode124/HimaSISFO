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
  actions?: React.ReactNode;
  onMouseOver?: () => void;
}

export interface WithVariantEventCardPropsArray {
  events: WithVariantEventCardProps[];
}

export interface SortedSingleEventsProps {
  pastNotGoing?: EventCardProps;
  nextOnGoing?: EventCardProps[];
  futureNotGoing?: EventCardProps;
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

export type EventItem = {
  id: number;
  title: string;
  start: Date;
  end: Date;
};

export type SingleEventSpec = {
  mode: "single";
  event: EventItem;
};

export type MultipleEventSpec = {
  mode: "multiple";
  events: EventItem[];
};

