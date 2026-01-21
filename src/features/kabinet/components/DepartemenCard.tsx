"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DepartemenCardProps {
  id: string | number;
  nama: string;
  logo: string | null;
  className?: string;
}
export default function DepartemenCard({
  id,
  nama,
  logo,
  className = "w-30 h-42 md:w-56 md:h-72",
}: DepartemenCardProps) {
  const params = useParams();
  const kabinetId = params.kabinetId;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayLogo = logo || "/assets/shared/logos/logo_himasisfo.webp";

  return (
    <motion.div
      initial="rest"
      whileHover={isMobile ? "" : "hover"}
      animate={isMobile ? "hover" : "rest"}
      className="flex justify-center items-center w-fit"
    >
      <Card
        className={`overflow-hidden relative flex flex-col items-center text-center border-[3px] border-[#A43DA5] bg-white/60 backdrop-blur-2xl p-1 md:p-6 ${className}`}
      >
        <CardContent className="flex flex-col items-center w-full p-0">
          <motion.div
            variants={{
              rest: { y: isMobile ? 0 : "40%", scale: isMobile ? 1 : 1.3 },
              hover: { y: 0, scale: 1 },
            }}
            transition={{ type: "tween" }}
            className="relative w-[60%] aspect-square"
          >
            <Image
              src={displayLogo}
              alt={nama}
              fill
              className="object-contain"
            />
          </motion.div>
          <motion.div
            variants={{
              rest: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 80 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="font-bold text-[0.65rem] md:text-[0.85rem] px-2 flex items-center justify-center"
          >
            <p className="line-clamp-3 md:line-clamp-4 mt-2">{nama}</p>
          </motion.div>
        </CardContent>

        <CardFooter className="w-full p-0 -mt-2 md:mt-auto">
          <motion.div
            variants={{
              rest: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 80 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="w-full md:px-6 px-2"
          >
            <Button
              asChild
              variant="default"
              className="w-full h-8 md:h-11 rounded-full font-light text-2xs md:text-sm bg-linear-to-br from-[#E63258] to-[#A43DA5] hover:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)]"
            >
              <Link href={`/kabinet/${kabinetId}/${id}`}>Selengkapnya</Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
