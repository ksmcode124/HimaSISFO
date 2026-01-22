"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const filosofi = [
  {
    id: "api",
    judul: "Api",
    teks: "Gelora mewakili semangat yang membara, dororngan kuat untuk bergerak maju.",
    path: "M 180 5 H 30",
    cx: 30,
    cy: 5,
    container: "right-[110%] flex-row-reverse text-right",
  },
  {
    id: "lingkaran",
    judul: "Lingkaran",
    teks: "Harmoni berarti keselarasan dan kekeluargaan dalam perbedaan, kerja sama yang seimbang dan damai antar individu",
    path: "M -95 25 H 50",
    cx: 50,
    cy: 25,
    container: "left-[90%] flex-row text-left",
  },
];

export default function InteractiveLogo() {
  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      {/* BACKDROP */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 pointer-events-none overflow-hidden"
          />
        )}
      </AnimatePresence>

      {/* LOGO AREA */}
      <div className="relative w-full aspect-square flex items-center justify-center z-40">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 350 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseLeave={() => setActive(null)}
        >
          <defs>
            <linearGradient
              id="paint0_linear_636_12705"
              x1="147.72"
              y1="286.716"
              x2="259.283"
              y2="286.716"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E61D2E" />
              <stop offset="0.2" stopColor="#DC1E39" />
              <stop offset="0.56" stopColor="#C32157" />
              <stop offset="1" stopColor="#9C2583" />
            </linearGradient>

            <linearGradient
              id="paint1_linear_636_12705"
              x1="82.4644"
              y1="308.869"
              x2="307.012"
              y2="308.869"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E61D2E" />
              <stop offset="0.2" stopColor="#DC1E39" />
              <stop offset="0.56" stopColor="#C32157" />
              <stop offset="1" stopColor="#9C2583" />
            </linearGradient>

            <linearGradient
              id="paint2_linear_636_12705"
              x1="52.9845"
              y1="349.563"
              x2="179.3"
              y2="349.563"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E61D2E" />
              <stop offset="0.2" stopColor="#DC1E39" />
              <stop offset="0.56" stopColor="#C32157" />
              <stop offset="1" stopColor="#9C2583" />
            </linearGradient>

            <linearGradient
              id="paint3_linear_636_12705"
              x1="26.6779"
              y1="232.034"
              x2="140.063"
              y2="42.6585"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E61D2E" />
              <stop offset="1" stopColor="#9C2583" />
            </linearGradient>

            <linearGradient
              id="paint4_linear_636_12705"
              x1="52.6577"
              y1="264.526"
              x2="180.493"
              y2="63.9596"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E61D2E" />
              <stop offset="0.2" stopColor="#DC1E39" />
              <stop offset="0.56" stopColor="#C32157" />
              <stop offset="1" stopColor="#9C2583" />
            </linearGradient>

            <linearGradient
              id="paint5_linear_636_12705"
              x1="138.721"
              y1="228.625"
              x2="209.212"
              y2="139.773"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#E61D2E" />
              <stop offset="0.2" stopColor="#DC1E39" />
              <stop offset="0.56" stopColor="#C32157" />
              <stop offset="1" stopColor="#9C2583" />
            </linearGradient>
          </defs>

          {/* KOMPONEN API */}
          <motion.g
            onMouseEnter={() => setActive("api")}
            onMouseLeave={() => setActive(null)}
            animate={{
              opacity: active && active !== "api" ? 0.3 : 1,
            }}
            className="cursor-pointer"
          >
            <path
              d="M 130.455 209.346 C 121.34 220.399 113.501 231.915 109.701 245.667 C 99.8828 281.15 110.296 310.973 136.559 335.404 C 171.934 368.305 227.899 371.301 266.663 342.656 C 289.461 325.81 302.033 303.206 302.365 274.384 C 302.365 273.911 302.503 273.439 303.466 272.765 C 304.313 276.578 305.451 280.351 305.963 284.209 C 314.052 345.073 273.855 395.165 218.874 405.86 C 178.467 413.722 142.678 403.332 113.525 373.891 C 67.3838 327.275 73.4925 251.356 125.997 212.304 C 127.446 211.243 128.98 210.319 130.455 209.346 Z"
              fill="url(#paint1_linear_636_12705)"
            />
            <path
              d="M 130.574 420 C 122.544 418.591 114.435 417.527 106.498 415.707 C 91.2551 412.207 77.2546 406.155 66.6507 394.024 C 56.6624 382.615 53.0057 368.895 52.9845 354.121 C 52.9473 327.094 62.4924 302.734 75.1131 279.128 C 74.7999 282.556 74.3966 285.979 74.187 289.415 C 72.8044 312.233 74.5585 334.609 84.6688 355.583 C 97.2098 381.601 118.659 397.593 144.888 407.636 C 156.436 412.056 168.505 415.129 179.3 418.496 L 168.643 420 H 130.574 Z"
              fill="url(#paint2_linear_636_12705)"
            />
            <path
              d="M 23 233.021 C 24.5683 224.663 25.6536 216.178 27.7924 207.969 C 34.6415 181.611 48.3236 158.769 65.9251 138.391 C 79.4586 122.713 94.2844 108.144 108.15 92.7278 C 122.092 77.2351 132.632 59.7604 135.731 38.7091 C 137.589 26.0475 136.636 13.5027 132.048 0 C 141.983 9.76948 148.113 20.3376 151.345 32.4499 C 157.419 55.2206 152.497 76.3993 141.328 96.5485 C 131.923 113.53 118.528 127.176 105.594 141.389 C 81.868 167.485 59.0787 194.479 43.0614 226.285 C 39.4074 233.539 36.7139 241.424 34.668 249.302 C 32.6619 257.018 32.0462 265.095 30.8202 273.015 L 29.4934 273.37 C 27.735 265.156 25.9765 256.941 24.218 248.726 C 23.8306 246.919 23.4087 245.12 23 243.319 V 233.021 Z"
              fill="url(#paint3_linear_636_12705)"
            />
            <path
              d="M 167.939 13.7969 C 183.089 29.0454 192.183 47.1543 193.945 68.6434 C 196.659 101.948 183.16 129.725 163.494 155.043 C 155.518 165.301 146.307 174.587 137.523 184.19 C 109.435 214.968 82.8586 246.946 62.0303 283.248 C 51.1505 302.193 44.6464 322.562 43.6142 344.54 C 43.5293 346.352 43.0649 348.145 42.7756 349.95 L 41.0534 350.287 C 38.9305 341.464 36.0115 332.748 34.8227 323.801 C 29.412 283.001 42.6934 246.93 63.9356 213.087 C 77.7743 191.043 95.1317 171.929 113.293 153.387 C 127.538 138.847 142.061 124.485 153.262 107.22 C 172.047 78.2404 178.442 47.4408 167.939 13.7969 Z"
              fill="url(#paint4_linear_636_12705)"
            />
            <path
              d="M 210.249 79.334 C 230.454 94.3597 236.905 120.651 226.532 145.271 C 218.632 164.014 204.772 178.074 190.854 192.394 C 170.084 213.756 150.46 236.267 136.051 262.64 C 129.417 274.785 126.233 288.001 126.374 303.35 C 121.204 295.141 119.209 287.369 118.431 279.269 C 115.969 253.951 124.227 231.491 138.787 211.591 C 148.951 197.706 161.205 185.35 172.605 172.38 C 182.872 160.706 194.333 149.891 203.307 137.298 C 215.456 120.256 218.584 101.017 210.401 80.8782 C 210.228 80.4563 210.302 79.9336 210.249 79.334 Z"
              fill="url(#paint5_linear_636_12705)"
            />
          </motion.g>

          {/* KOMPONEN LINGKARAN */}
          <motion.g
            onMouseEnter={() => setActive("lingkaran")}
            animate={{
              opacity: active && active !== "lingkaran" ? 0.3 : 1,
              fill: "url(#paint0_linear_636_12705)",
            }}
          >
            <path d="M 147.72 286.469 C 147.884 255.03 172.571 230.349 203.929 230.845 C 237.741 231.376 260.308 259.236 259.246 289.056 C 258.185 318.946 233.416 342.802 201.864 342.616 C 171.817 342.427 147.56 317.271 147.72 286.469 Z" />
          </motion.g>
        </svg>

        {/* TEKS MAKNA */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active}
              initial={{ opacity: 0, x: active === "api" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 flex items-center w-[30vw]",
                filosofi.find((f) => f.id === active)?.container,
              )}
            >
              <div className="flex items-center shrink-0">
                <svg width="80" height="20" className="overflow-visible">
                  <motion.path
                    d={filosofi.find((f) => f.id === active)?.path}
                    stroke="white"
                    strokeWidth="2.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                  />
                  <circle
                    cx={filosofi.find((f) => f.id === active)?.cx}
                    cy={filosofi.find((f) => f.id === active)?.cy}
                    r="6"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="pointer-events-auto overflow-hidden">
                <h3 className="text-xl text-white font-semibold">
                  {filosofi.find((f) => f.id === active)?.judul}
                </h3>
                <p className="text-white text-sm mt-2 max-w-86">
                  {filosofi.find((f) => f.id === active)?.teks}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
