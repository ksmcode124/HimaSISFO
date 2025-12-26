import { EventCardProps } from "./event-cart.types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
export const EventCard = (props: EventCardProps) => {
  const router = useRouter();
  return (
    <div className={clsx("border-2 border-red flex-col", props.className)}>
      <img src={props.img} alt={props.title} className="object-cover h-48 w-full" />
      <div className="flex-row w-fit">
        <p className="w-fit">{props.date}</p>{props.variant === "onGoing" && <p className="w-fit">{props.countDown}</p>}
      </div>
      <h1>{props.title}</h1>
      {props.variant === "detail" && <p>{props.description}</p>}
      {props.variant === "detail" && <button onClick={() => router.push(props.navigation)}>More</button>}
    </div>
  );
}
