interface BaseCard {
    title: string;
    img: string;
    date: string;
}

export interface OnGoingEvent extends BaseCard {
    variant : "onGoing";
    countDown: number;
    className: "col-span-2"
}

export interface NotGoingEvent extends BaseCard {
    variant : "notGoing";
    className: "col-span-1"
}

export interface DetailEvent extends BaseCard {
    variant : "detail";
    description: string;
    className: "col-span-1";
    navigation: string;
}
export type EventCardProps = OnGoingEvent | NotGoingEvent | DetailEvent;