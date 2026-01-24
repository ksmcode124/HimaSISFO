import { EventSegment } from "./EventSegment";

export function getSegmentClass(segment: EventSegment) {
  switch (segment) {
    case "single":
      return "rounded-[5px] mx-1 px-2";
    case "head":
      return "ml-1 rounded-l-[5px] px-2";
    case "body-right":
      return "-ml-1";
    case "body":
      return "-mx-1";
    case "body-left":
      return "-mr-1";
    case "tail":
      return "mr-1 rounded-r-[5px]";
  }
}
