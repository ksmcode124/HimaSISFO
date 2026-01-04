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