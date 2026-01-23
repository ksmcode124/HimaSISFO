"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import filosofiLogo from "../data/filosofi-logo.json";

export default function LogoAksayapatra() {
  const [active, setActive] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 912);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filosofi = filosofiLogo.aksayapatra;
  const currentData = filosofi.find((f) => f.id === active) || null;

  const handleMouseEnter = (id: string) => {
    if (!isMobile) setActive(id);
  };

  const handleClick = (id: string) => {
    if (isMobile) {
      setActive(active === id ? null : id);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row items-center justify-center w-full h-full">
      {/* BACKDROP */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 bg-black/80 md:bg-black/60 backdrop-blur-sm z-30 overflow-hidden"
          />
        )}
      </AnimatePresence>

      {/* LOGO AREA */}
      <div className="relative w-full aspect-square items-center justify-center z-40">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 350 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onMouseLeave={() => !isMobile && setActive(null)}
        >
          <defs>
            <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.35"/>
            </filter>
            <linearGradient id="paint0_linear_653_12489" x1="85.2988" y1="340.088" x2="248.742" y2="0.088" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.03" stopColor="#FFFCF0"></stop><stop offset="0.06" stopColor="#FEFAE0"></stop><stop offset="0.32" stopColor="#F8EFAF"></stop><stop offset="0.49" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint1_linear_653_12489" x1="121.906" y1="79.5447" x2="204.166" y2="79.5447" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.01" stopColor="#FEFAE0"></stop><stop offset="0.47" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint2_linear_653_12489" x1="207.644" y1="138.007" x2="259.262" y2="138.007" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.01" stopColor="#FEFAE0"></stop><stop offset="0.47" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint3_linear_653_12489" x1="78.1746" y1="152.438" x2="121.309" y2="152.438" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.01" stopColor="#FEFAE0"></stop><stop offset="0.47" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint4_linear_653_12489" x1="166.945" y1="241.992" x2="328.175" y2="241.992" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.02" stopColor="#FFFCF0"></stop><stop offset="0.04" stopColor="#FEFAE0"></stop><stop offset="0.2" stopColor="#F8EFAF"></stop><stop offset="0.3" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint5_linear_653_12489" x1="-0.00538177" y1="224.369" x2="160.87" y2="224.369" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFCF0"></stop><stop offset="0.01" stopColor="#FEFAE0"></stop><stop offset="0.22" stopColor="#F8EFAF"></stop><stop offset="0.36" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint6_linear_653_12489" x1="26.8517" y1="180.674" x2="57.5297" y2="180.674" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.01" stopColor="#FEFAE0"></stop><stop offset="0.47" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint7_linear_653_12489" x1="301.517" y1="180.675" x2="270.839" y2="180.675" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.01" stopColor="#FFFCF0"></stop><stop offset="0.02" stopColor="#FEFAE0"></stop><stop offset="0.47" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint8_linear_653_12489" x1="121.998" y1="364.968" x2="163.532" y2="364.968" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.02" stopColor="#FFFCF0"></stop><stop offset="0.05" stopColor="#FEFAE0"></stop><stop offset="0.48" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
            <linearGradient id="paint9_linear_653_12489" x1="168.43" y1="381.698" x2="206.124" y2="381.698" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFEF9"></stop><stop offset="0.08" stopColor="#FFFCF0"></stop><stop offset="0.16" stopColor="#FEFAE0"></stop><stop offset="0.53" stopColor="#F8EFAF"></stop><stop offset="0.78" stopColor="#F4E78C"></stop><stop offset="0.87" stopColor="#F2E379"></stop><stop offset="0.99" stopColor="#F1CA56"></stop>
            </linearGradient>
          </defs>

          {/* ELEMEN CINCIN */}
          <motion.g
            onMouseEnter={() => handleMouseEnter("cincin")}
            onMouseLeave={() => handleClick("cincin")}
            animate={{
              opacity: active && active !== "cincin" ? 0.3 : 1,
              filter: active ? "none" : "url(#shadow)",
            }}
            className="cursor-pointer"
          >
            <path
              d="M247.947 333.023C246.458 325.1 242.039 318.012 235.673 313.074C235.581 313 235.488 312.93 235.396 312.861C231.812 310.159 227.796 308.083 223.519 306.721C222.975 306.541 222.392 306.508 221.831 306.625C221.269 306.742 220.748 307.004 220.32 307.385C219.773 307.884 219.311 308.47 218.952 309.118C218.736 309.519 218.604 309.96 218.565 310.413C218.526 310.867 218.581 311.324 218.727 311.756C218.872 312.188 219.105 312.585 219.411 312.923C219.716 313.26 220.088 313.532 220.503 313.72C225.342 315.936 229.615 319.382 232.324 323.99C234.507 327.702 235.782 331.876 236.047 336.174C236.491 343.582 233.892 351.504 228.17 356.429C224.794 359.314 220.759 361.323 216.421 362.278C209.805 363.718 203.735 362.172 198.046 358.768C196.198 357.66 194.344 356.474 192.741 355.046C185.185 348.278 177.819 341.306 170.767 334.009C168.534 331.693 166.314 329.344 164.067 327.023C158.28 320.921 152.248 314.681 145.146 310.242C143.724 309.274 142.274 308.356 140.776 307.505C125.011 298.475 106.895 302.506 96.4267 312.934C86.9069 322.413 83.6099 333.977 86.0922 347.157C87.5886 355.075 92.0034 362.167 98.3655 367.102C98.458 367.175 98.5548 367.246 98.6473 367.315C104.698 371.911 112.492 374.89 120.098 375.185C122.757 375.291 123.395 373.447 123.277 371.061C123.254 370.644 123.198 370.211 122.98 369.852C122.624 369.263 121.917 369.001 121.238 368.874C113.45 367.448 105.806 363.131 101.719 356.181C99.5388 352.469 98.2636 348.297 97.9965 344.001C97.5519 336.588 100.151 328.666 105.877 323.741C109.251 320.855 113.285 318.849 117.622 317.899C124.238 316.454 130.312 317.997 135.997 321.409C137.85 322.516 139.703 323.702 141.306 325.138C148.857 331.907 156.224 338.879 163.276 346.171C165.596 348.57 167.891 351.003 170.221 353.403C170.244 353.431 170.272 353.458 170.304 353.491C175.988 359.481 181.928 365.578 188.897 369.933C190.319 370.901 191.778 371.819 193.27 372.672C209.032 381.701 227.146 377.67 237.612 367.241C247.131 357.767 250.43 346.199 247.947 333.023Z"
              fill="url(#paint0_linear_653_12489)"
            />
          </motion.g>

          {/* ELEMEN API */}
          <motion.g
            onMouseEnter={() => handleMouseEnter("api")}
            onClick={() => handleClick("api")}
            animate={{
              opacity: active && active !== "api" ? 0.3 : 1,
              filter: active ? "none" : "url(#shadow)",
            }}
          >
            <path
              d="M131.584 73.9007C129.563 80.0765 134.902 94.0232 143.033 92.8406C145.367 92.5013 147.232 90.7317 148.648 88.8461C162.773 70.0328 154.083 35.1212 147.198 15.1317C146.692 13.663 146.277 12.4485 146.714 11C154.496 15.3274 161.664 22.6889 168.044 28.87C186.799 47.0558 202.744 69.4957 204.098 96.5448C205.393 122.388 187.587 151.82 158.486 147.699C146.221 145.961 135.166 138.066 128.758 127.456C119.519 112.158 118.835 87.9336 131.584 73.9007Z"
              fill="url(#paint1_linear_653_12489)"
            />
            <path
              d="M240.514 89.0066C246.146 92.2875 249.554 97.9676 252.797 103.427C256.094 108.979 258.625 115.2 259.156 121.686C260.19 134.322 253.512 145.508 245.829 154.932C237.533 165.104 229.232 175.245 222.678 186.654C222.592 186.801 222.498 186.957 222.341 187.022C222.151 187.101 221.934 187.022 221.747 186.928C215.629 184.057 211.738 176.371 209.575 170.297C205.909 160.004 207.677 149.183 213.084 139.845C218.026 131.302 225.289 124.488 230.575 116.227C235.799 108.066 238.9 98.4845 240.443 88.9619L240.514 89.0066Z"
              fill="url(#paint2_linear_653_12489)"
            />
            <path
              d="M93.9767 111.25C96.9111 122.149 97.8055 131.146 106.018 140.612C111.615 147.059 118.33 153.785 120.499 162.336C122.892 171.763 119.712 181.874 114.437 189.749C113.586 191.016 112.051 194.064 110.535 193.578C109.627 193.285 108.587 190.977 108.124 190.231C106.714 187.957 105.476 185.584 104.214 183.227C101.121 177.446 97.3769 172.228 92.6218 167.7C88.559 163.829 84.2304 160.24 81.3599 155.32C74.3735 143.342 79.9773 130.161 87.5285 120.004C89.6981 117.094 91.9294 114.245 93.9767 111.25Z"
              fill="url(#paint3_linear_653_12489)"
            />
          </motion.g>

          {/* ELEMEN TANGAN */}
          <motion.g
            onMouseEnter={() => handleMouseEnter("tangan")}
            onClick={() => handleClick("tangan")}
            animate={{
              opacity: active && active !== "tangan" ? 0.3 : 1,
              filter: active ? "none" : "url(#shadow)",
            }}
          >
            <path
              d="M325.222 185.081C321.164 172.605 313.417 161.718 307.533 150.091C305.38 145.829 303.447 141.456 301.52 137.087C300.669 135.173 299.569 128.803 296.405 131.344C287.607 138.405 292.662 149.348 296.183 157.691C299.449 165.428 303.336 172.97 305.384 181.162C308.534 193.753 306.746 207.383 300.987 218.965C294.436 232.136 283.609 240.109 270.59 246.297C265.685 248.63 260.596 250.554 255.375 252.05C252.614 252.842 249.819 253.511 246.99 254.056C245.108 254.418 243.533 254.056 245.558 252.292C250.719 247.779 255.496 243.489 259.785 238.133C263.14 233.941 266.893 229.919 269.436 225.258C274.806 215.433 277.72 202.664 271.98 192.352C271.86 192.139 271.707 191.903 271.461 191.86C271.188 191.815 270.946 192.041 270.761 192.25C266.453 197.049 263.145 202.572 258.998 207.492C256.069 210.992 252.907 214.29 249.533 217.364C243.056 223.257 236.12 228.789 228.977 234C224.177 237.51 219.285 240.876 214.373 244.109C200.414 253.291 188.197 267.223 178.977 281.079C176.11 285.394 173.767 290.035 171.999 294.905C168.59 304.225 167.311 314.025 166.945 324.235C174.274 331.847 181.673 339.375 189.873 346.065C193.149 348.738 196.637 351.092 200.715 352.361C201.911 352.737 203.133 353.027 204.371 353.228C204.417 344.959 204.797 336.716 205.941 328.295C206.141 326.806 206.34 325.265 206.549 323.69C207.976 312.881 209.968 300.646 218.886 293.799C224.7 289.332 232.109 287.711 238.844 285.185C253.105 279.834 268.204 275.932 281.862 269.085C293.94 263.035 304.941 254.682 313.292 243.999C318.653 237.134 323.035 229.43 325.598 221.109C329.188 209.443 328.993 196.681 325.222 185.081Z"
              fill="url(#paint4_linear_653_12489)"
            />
            <path
              d="M149.194 281.123C139.974 267.262 127.757 253.336 113.798 244.149C110.56 242.022 107.325 239.826 104.12 237.575C95.2383 231.344 86.5885 224.645 78.6342 217.409C75.2603 214.335 72.0979 211.037 69.1687 207.536C65.0208 202.611 61.7143 197.088 57.4058 192.294C57.2197 192.081 56.9804 191.858 56.706 191.905C56.4604 191.942 56.3072 192.178 56.187 192.396C50.4439 202.712 53.3612 215.474 58.7257 225.298C61.2782 229.959 65.0219 233.984 68.3806 238.178C72.6709 243.528 77.443 247.818 82.6087 252.335C84.6294 254.105 83.0586 254.462 81.1771 254.101C78.351 253.558 75.5559 252.89 72.7921 252.095C67.5745 250.599 62.4889 248.677 57.5866 246.347C44.5678 240.153 33.7398 232.184 27.1895 219.015C21.4304 207.432 19.6383 193.802 22.7928 181.21C24.8401 173.021 28.7273 165.477 31.9935 157.736C35.5106 149.393 40.5689 138.449 31.7712 131.394C28.6072 128.85 27.5043 135.223 26.6566 137.137C24.7295 141.506 22.797 145.879 20.6433 150.136C14.7588 161.76 7.01295 172.651 2.95446 185.125C-0.822184 196.717 -1.0115 209.485 2.57903 221.15C5.14111 229.475 9.52398 237.171 14.8842 244.037C23.2278 254.725 34.2408 263.073 46.3141 269.128C59.9722 275.966 75.0713 279.876 89.3313 285.227C96.0678 287.756 103.476 289.382 109.287 293.841C110.129 294.488 110.924 295.192 111.668 295.949C111.714 295.94 111.765 295.926 111.811 295.916C120.405 294.059 128.736 294.98 136.644 298.845C143.159 302.043 149.121 306.261 154.305 311.339C156.529 313.503 158.711 315.712 160.875 317.941C160.222 309.723 158.781 301.787 155.89 294.17C154.158 289.582 151.912 285.205 149.194 281.123Z"
              fill="url(#paint5_linear_653_12489)"
            />
            <path
              d="M47.0017 236.775C46.5231 236.758 46.02 236.35 45.6637 235.956C40.6757 230.49 35.8982 224.646 32.4758 218.052C28.6991 210.786 26.4997 202.638 26.9028 194.413C27.6749 178.62 37.4191 164.813 41.92 149.654C43.4753 144.41 44.401 138.998 44.6778 133.535C44.7842 131.372 44.347 129.162 44.3439 126.99C44.3439 126.246 44.4162 125.382 45.0277 124.955C47.878 122.958 53.0734 129.499 54.2965 131.485C56.6682 135.339 57.6999 140.015 57.5116 144.512C57.2 152.139 54.0083 159.307 51.0357 166.337C45.5201 179.383 40.5151 193.047 40.5651 207.211C40.5881 212.491 41.3163 217.744 42.7305 222.832C43.8887 227.006 45.6892 230.753 47.526 234.669C47.8344 235.328 48.0726 236.265 47.46 236.653C47.3239 236.741 47.1635 236.784 47.0017 236.775Z"
              fill="url(#paint6_linear_653_12489)"
            />
            <path
              d="M281.367 236.775C281.846 236.758 282.349 236.35 282.705 235.957C287.693 230.49 292.47 224.646 295.893 218.053C299.669 210.787 301.869 202.638 301.466 194.413C300.694 178.62 290.949 164.814 286.449 149.655C284.896 144.408 283.974 138.996 283.699 133.532C283.593 131.369 284.03 129.159 284.033 126.987C284.033 126.243 283.961 125.379 283.349 124.952C280.499 122.955 275.304 129.496 274.081 131.483C271.709 135.336 270.677 140.012 270.865 144.509C271.177 152.136 274.369 159.304 277.341 166.335C282.857 179.38 287.862 193.044 287.812 207.208C287.789 212.488 287.061 217.741 285.647 222.829C284.488 227.003 282.689 230.75 280.851 234.666C280.543 235.325 280.304 236.262 280.917 236.65C281.05 236.737 281.208 236.781 281.367 236.775Z"
              fill="url(#paint7_linear_653_12489)"
            />
            <path
              d="M163.535 352.646C163.46 360.221 163.279 367.795 162.992 375.37C162.774 380.962 162.487 386.549 162.131 392.132C161.927 395.273 162.149 398.664 161.209 401.704C160.652 403.492 159.559 405.193 157.905 406.072C156.441 406.851 154.715 406.916 153.059 406.935C149.311 406.976 145.526 406.884 141.866 406.068C131.484 403.766 125.553 395.069 125.762 384.613C126.067 369.07 126.586 354.166 124.468 338.67C124.265 337.181 124.071 335.635 123.862 334.065C123.385 330.449 122.842 326.684 122 323.005C123.488 322.974 124.975 323.095 126.438 323.366C131.812 324.349 136.38 327.027 140.477 330.51C143.267 332.887 145.917 335.43 148.599 337.928C153.719 342.687 158.698 347.593 163.535 352.646Z"
              fill="url(#paint8_linear_653_12489)"
            />
            <path
              d="M206.119 383.546C206.331 394.007 200.397 402.698 190.014 405.004C186.355 405.816 182.57 405.912 178.822 405.867C177.162 405.848 175.44 405.783 173.975 405.01C172.321 404.129 171.228 402.428 170.672 400.636C169.731 397.601 169.954 394.211 169.75 391.065C169.388 385.477 169.101 379.889 168.888 374.299C168.675 368.709 168.523 363.114 168.43 357.514C171.195 360.372 174.016 363.176 177.001 365.821C181.68 369.981 186.669 373.705 192.354 376.416C196.798 378.538 201.356 379.936 206.054 380.386C206.077 381.437 206.099 382.49 206.119 383.546Z"
              fill="url(#paint9_linear_653_12489)"
            />
          </motion.g>
        </svg>

        {/* MAKNA (DEKSTOP) */}
        {!isMobile && (
          <AnimatePresence>
            {active && currentData && (
              <motion.div
                key={active}
                initial={{ opacity: 0, x: active === "api" ? 40 : -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className={cn("absolute top-1/2 -translate-y-1/2 flex items-center w-[30vw]", currentData.container)}
              >
                <div className="flex items-center shrink-0">
                  <svg width="80" height="20" className="overflow-visible">
                    <motion.path
                      d={currentData.path}
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                    />
                    <circle cx={currentData.cx} cy={currentData.cy} r="6" fill="white"/>
                  </svg>
                </div>

                <div className="pointer-events-auto overflow-hidden">
                  <h3 className="text-xl text-white font-semibold">{currentData.elemen}</h3>
                  <p className="text-white text-sm mt-2 max-w-86">{currentData.makna}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* MAKNA (MOBILE) */}
      {isMobile && (
        <div className="absolute w-full top-[120%] z-40 text-center">
          <AnimatePresence mode="wait">
            {active && currentData ? (
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="px-4"
              >
                <h3 className="text-2xl text-white font-semibold mb-2">{currentData.elemen}</h3>
                <p className="text-white text-sm">{currentData.makna}</p>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-black text-sm italic"
              ></motion.p>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
