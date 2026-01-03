import clsx from "clsx";

type Align = "start" | "end" | "center";

interface RoundedBgProps {
  align?: Align;
  scale?: number;
  className?: string;
}

export function RoundedBg({
  align = "start",
  scale = 1,
  className,
}: RoundedBgProps) {
  const isEnd = align === "end";

  return (
    <svg
      viewBox="0 0 1280 2563"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={clsx(
        "absolute pointer-events-none",
        align === "start" && "left-0",
        align === "end" && "right-0 scale-x-[-1]",
        align === "center" && "left-1/2 -translate-x-1/2",
        className
      )}
      // style={{
      //   transform: `
      //     translateY(-50%)
      //     scale(${scale})
      //   `,
      // }}
    >
      <g opacity="0.63">
        <ellipse
          cx="-218.57"
          cy="910.698"
          rx="755.487"
          ry="750.234"
          transform="rotate(-40.3065 -218.57 910.698)"
          fill="url(#paint0_radial_7824_38851)"
        />
        <ellipse
          cx="-219"
          cy="911.055"
          rx="1175.82"
          ry="1167.65"
          transform="rotate(-40.3065 -219 911.055)"
          fill="url(#paint1_radial_7824_38851)"
          className="border-2 border-red"
        />
      </g>

      <defs>
        <radialGradient
          id="paint0_radial_7824_38851"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(1428.13 1203 -1211.42 1418.2 -218.519 911.313)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="0.0961093" stopColor="#BBDEFF" stopOpacity="0.74" />
          <stop offset="0.154844" stopColor="#91CAFF" stopOpacity="0.36" />
          <stop offset="0.242801" stopColor="#6FCAFF" stopOpacity="0.151446" />
          <stop offset="0.364611" stopColor="#56CAFF" stopOpacity="0" />
        </radialGradient>

        <radialGradient
          id="paint1_radial_7824_38851"
          cx="0"
          cy="0"
          r="1"
          gradientTransform="matrix(2222.71 1872.32 -1885.43 2207.26 -218.921 912.013)"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D9ECFF" />
          <stop offset="0.126972" stopColor="#7BBFFF" stopOpacity="0.4" />
          <stop offset="0.226502" stopColor="#81C2FF" stopOpacity="0.12" />
          <stop offset="0.339902" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
