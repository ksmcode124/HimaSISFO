interface BaseCard {
    title: string;
    img: string;
    date: string;
}

export interface OnGoingEvent extends BaseCard {
    variant : "onGoing";
    countDown: number;
}

export interface NotGoingEvent extends BaseCard {
    variant : "notGoing";
}

export interface DetailEvent extends BaseCard {
    variant : "detail";
    description: string;
    navigation: string;
}
export type EventCardProps = OnGoingEvent | NotGoingEvent | DetailEvent;