"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface DepartmentCardProps {
  id: string;
  nama: string;
  logo_url: string;
  className?: string;
}

export default function DepartmentCard({
  id,
  nama,
  logo_url,
  className = "w-[230px] h-[295px]",
}: DepartmentCardProps) {
  const params = useParams();
  const kabinetId = params.kabinetId;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <motion.div
      initial="rest"
      whileHover={isMobile ? "" : "hover"}
      animate={isMobile ? "hover" : "rest"}
      className="flex justify-center items-center w-fit"
    >
      <Card
        className={`overflow-hidden relative flex flex-col items-center justify-center text-center border-[3px] border-[#A43DA5] bg-white/60 backdrop-blur-2xl ${className}`}
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
              src={logo_url}
              alt={nama}
              width={130}
              height={130}
              className="object-contain"
            />
          </motion.div>
          <motion.div
            variants={{
              rest: { opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="font-bold text-[0.7rem] md:text-[0.85rem] px-6"
          >
            <p>{nama}</p>
          </motion.div>
        </CardContent>

        <CardFooter className="w-full p-0 mt-auto">
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
              className="w-full h-11 rounded-full font-light bg-linear-to-br from-[#E63258] to-[#A43DA5]"
            >
              <Link href={`/kabinet/${kabinetId}/${id}`}>Selengkapnya</Link>
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
