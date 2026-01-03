
import { Button } from "@/components/ui/button";
import { EventCardProps } from "../types";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const eventCard = cva(
  'overflow-hidden transition hover:shadow-md',
  {
    variants: {
      variant: {
        detail: "h-[117px] md:h-[231px]",
        onGoing: "h-[94px] md:h-[280px]",
        notGoing: "h-[94px] md:h-[280px]",
      },
    },
    defaultVariants: {
      variant: "detail",
    },
  }
);

export const EventCard = (props: EventCardProps) => {
  const router = useRouter();

  // properti yang selalu ada
  const { id, title, img, variant } = props;
  return (
    <div key={id} className={"flex-col rounded-md md:rounded-3xl h-fit overflow-hidden mask-clip-content "  + (variant == "detail" ? "border-gradient-x " : "border-gradient-y")}>
      <img
        src={`/assets/kegiatan/` + img}
        alt={img}
        className={cn(
          "object-cover w-full h-full",
          eventCard({ variant })
        )}
      />
      <div className={"w-full flex flex-col gap-[5px] md:gap-[30px] py-[10px] md:py-[30px] px-[10px] md:px-[15px] backdrop-blur-[4px] " + (variant == "detail" ? "bg-transparent" : "bg-linear-to-b from-blue-200/60 to-blue-100")}>
        <div className="flex flex-row gap-[30px] items-center">
          <p className="w-fit text-[8px] md:text-xl font-normal">{String(props.date)}</p>
          {variant === "onGoing" && (
            <p className="w-fit text-[8px] md:text-xl font-normal">
              {props.countDown}
            </p>
          )}
        </div>
        <h1 className="text-base md:text-3xl font-bold truncate">
          {title}
        </h1>
        {variant === "detail" && (
          <p className="text-[10px] md:text-sm line-clamp-2">
            {props.description}
          </p>
        )}
        {variant === "detail" && (
          <div className="w-full relative justify-center flex flex-row mt-3 md:mt-12 mb-3 md:mb-6">
            <Button
              onClick={() => router.push(props.navigation)}
              className="flex flex-row gap-3 px-3 py-2 rounded-full"
            >
              More<ArrowRight />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
