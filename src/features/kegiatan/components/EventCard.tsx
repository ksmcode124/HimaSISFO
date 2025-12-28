import { EventCardProps } from "../types";
import { useRouter } from "next/navigation";
export const EventCard = (props: EventCardProps) => {
  const router = useRouter();
  return (
    <div className={"border-[3px] border-red flex-col rounded-[6.06px] md:rounded-[20px] bg-amber-300"}>
      <img src={props.img} alt={props.title} className="object-cover h-[94px] md:h-[280px] w-full border-2 border-accent rounded-[4px] md:rounded-t-[18px]" />
      <div className="flex flex-col md:gap-[30px] py-[15px] md:py-[30px] px-[7.5px] md:px-[15px] border-2 border-accent">
        <div className="flex flex-row gap-[30px]">
          <p className="w-fit">{props.date}</p>{props.variant === "onGoing" && <p className="w-fit">{props.countDown}</p>}
        </div>
        <h1>{props.title}</h1>
      </div>
      {props.variant === "detail" && <p>{props.description}</p>}
      {props.variant === "detail" && <button onClick={() => router.push(props.navigation)}>More</button>}
    </div>
  );
}
