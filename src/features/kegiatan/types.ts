export interface EventCardProps {
    id: number;
    title: string;
    img: string;
    date: Date;
    slug: string;
    description: string;
}

export interface DynamicCalendarProps {
  events: EventCardProps[];
  className?: string;
}