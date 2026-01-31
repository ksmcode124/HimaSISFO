import { clsx } from "clsx";

export function CalendarLeftDecoration ({ className }: { className?: string }) {
  return (
     <svg
      viewBox="0 0 830 987"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className={clsx(
        `
        absolute
        left-0
        top-1/3
        -translate-y-1/2
        w-[60vw]
        max-w-none
        pointer-events-none
        `,
        className
      )}
    >
      <path d="M198.899 749.376C-16.4348 807.092 -360.592 531.45 -360.592 531.45C-232.629 565.623 -249.959 614.963 -27.1897 644.923C259.704 679.853 165.433 561.314 431.719 542.046C656.625 558.822 662.824 566.449 732.943 588.843C765.443 602.25 725.888 599.92 715.74 599.21C481.174 582.802 472.003 617.915 374.129 662.806C277.983 706.905 283.854 726.606 198.899 749.376Z" fill="url(#paint0_linear_7824_38863)" fillOpacity="0.5" />
      <path d="M193.767 711.815C-25.2559 753.39 -348.007 452.966 -348.007 452.966C-222.933 496.542 -243.877 544.46 -23.9458 590.87C259.564 646.995 174.351 521.787 441.332 522.335C664.373 555.756 669.989 563.822 738.252 591.359C769.667 607.14 730.395 601.881 720.328 600.42C487.627 566.649 475.874 600.985 374.939 638.488C275.785 675.33 280.178 695.412 193.767 711.815Z" fill="url(#paint1_linear_7824_38863)" fillOpacity="0.5" />
      <path d="M185.175 652.604C-36.9695 671.345 -326.979 339.205 -326.979 339.205C-207.073 395.46 -232.852 440.96 -18.8872 509.829C257.313 594.925 185.482 461.588 450.98 489.697C669.379 545.967 674.131 554.57 739.187 589.007C768.805 607.947 730.285 598.661 720.423 596.169C492.452 538.553 477.218 571.492 372.95 598.374C270.522 624.782 272.818 645.21 185.175 652.604Z" fill="url(#paint2_linear_7824_38863)" fillOpacity="0.5" />


      <defs>
        <linearGradient id="paint0_linear_7824_38863" x1="113.647" y1="435.979" x2="83.3519" y2="1091.24" gradientUnits="userSpaceOnUse">
          <stop offset="0.106282" stopColor="#00358B" stopOpacity="0" />
          <stop offset="0.266023" stopColor="#95B2FF" />
          <stop offset="0.482017" stopColor="#04308A" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="paint1_linear_7824_38863" x1="132.009" y1="392.955" x2="53.167" y2="1044.16" gradientUnits="userSpaceOnUse">
          <stop offset="0.106282" stopColor="#00358B" stopOpacity="0" />
          <stop offset="0.266023" stopColor="#00218D" />
          <stop offset="0.482017" stopColor="#04308A" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="paint2_linear_7824_38863" x1="156.668" y1="329.072" x2="11.0137" y2="968.662" gradientUnits="userSpaceOnUse">
          <stop offset="0.106282" stopColor="#00358B" stopOpacity="0" />
          <stop offset="0.266023" stopColor="#95B2FF" />
          <stop offset="0.482017" stopColor="#04308A" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
