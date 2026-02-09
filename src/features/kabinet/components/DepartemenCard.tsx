"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface DepartemenCardProps {
  id: string | number;
  nama: string;
  logo: string | null;
  className?: string;
  buttonGradient: string
}

export default function DepartemenCard({
  id,
  nama,
  logo,
  className = "",
}: DepartemenCardProps) {
  const { kabinetId } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayLogo = useMemo(
    () => logo || "/assets/shared/logos/logo_himasisfo.webp",
    [logo],
  );

  const variants = useMemo(
    () => ({
      logo: {
        rest: { y: isMobile ? 0 : "60%", scale: isMobile ? 1 : 1.3 },
        hover: { y: 0, scale: 1 },
      },
      content: {
        rest: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 80 },
        hover: { opacity: 1, y: 0 },
      },
    }),
    [isMobile],
  );

  if (!mounted)
    return (
      <div className={`flex justify-center items-center ${className}`} />
    );

  return (
    <motion.div
      initial="rest"
      whileHover={isMobile ? "" : "hover"}
      animate={isMobile ? "hover" : "rest"}
      className="flex justify-center col-span-2 items-center w-full"
    >
      <Card
        className={`overflow-hidden aspect-3/4 w-full relative flex flex-col items-center text-center border-3 border-[#E63258] bg-white/50 backdrop-blur-xl p-1 md:p-6 ${className}`}
      >
        <CardContent className="flex flex-col items-center w-full p-0 flex-1">
          <motion.div
            variants={variants.logo}
            transition={{ type: "tween" }}
            className="relative w-[60%] aspect-square"
          >
            <Image
              src={displayLogo}
              alt={nama}
              fill
              sizes="(max-width: 768px) 30vw, 20vw"
              className="object-contain"
            />
          </motion.div>
          <motion.div
            variants={variants.content}
            transition={{ duration: 0.3 }}
            className="font-bold text-[0.65rem] md:text-[0.85rem] px-2 flex items-center justify-center h-8 md:h-16"
          >
            <p className="line-clamp-3 md:line-clamp-4 mt-5">{nama}</p>
          </motion.div>
        </CardContent>

        <CardFooter className="w-full p-0 mt-auto -pt-12">
          <motion.div
            variants={variants.content}
            transition={{ duration: 0.3 }}
            className="w-full md:px-6 px-2"
          >
            <Button
              asChild
              className="w-full h-11 rounded-full font-light text-2xs md:text-sm bg-linear-to-br from-[#E63258] to-[#A43DA5] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)]"
            >
              <Link href={`/kabinet/${kabinetId}/${id}`}>Selengkapnya</Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
