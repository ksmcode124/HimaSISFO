'use client'
import { BackgroundLayer, ContentLayer, DecorationLayer } from "@/components/layout/Layer";
import { ShellLayer } from "@/components/layout/ShellLayer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter()
  return (
    <ShellLayer className="overflow-hidden">
      <BackgroundLayer>
        <div className="bg-[#3385FF] blur-3xl opacity-15 absolute rounded-full 
          -bottom-40 -left-20 w-160 h-160 
          lg:-bottom-48 lg:w-200 lg:h-200" />

        <div className="bg-[#3385FF] blur-3xl opacity-15 absolute rounded-full 
          top-24 -left-24 w-120 h-120 
          lg:top-32 lg:w-150 lg:h-150" />

        <div className="bg-[#3385FF] blur-3xl opacity-15 absolute rounded-full 
          top-40 -right-20 w-160 h-160 
          lg:top-48 lg:w-200 lg:h-200" />

        <div className="bg-[#3385FF] blur-3xl opacity-15 absolute rounded-full 
          -bottom-32 -right-32 w-120 h-120 
          lg:w-150 lg:h-150" />
      </BackgroundLayer>

      <DecorationLayer>
        <div className="absolute top-15 left-0 h-60 lg:h-80 aspect-video">
          <Image src="/assets/admin/bg-cloud-1.webp" alt="" fill />
        </div>
        <div className="absolute bottom-15 right-5 h-60 lg:h-80 aspect-video">
          <Image src="/assets/admin/bg-cloud-2.webp" alt="" fill />
        </div>
      </DecorationLayer>

      <ContentLayer>
        <div
          className="
            h-screen w-screen 
            flex flex-col items-center justify-center 
            text-[#2D2D51] gap-y-6
            max-w-360 mx-auto
          "
        >
          <h1 className="
            font-bold 
            text-7xl lg:text-8xl xl:text-9xl
            text-shadow-[5px_5px_8px_#000]/50
          ">
            404
          </h1>

          <h2 className="
            font-bold 
            text-3xl lg:text-4xl xl:text-5xl
            text-shadow-[5px_5px_8px_#000]/50
            text-center
          ">
            Oops... Page Not Found
          </h2>

          <Button
            className="
              px-6 py-3 w-40 h-14 
              rounded-full 
              bg-linear-to-t from-columbia-blue to-[#3385FF] 
              shadow-[5px_5px_8px_#000]/50
            "
            onClick={() => {
              if (window.history.length > 1) router.back();
              else router.replace("/admin");
            }}
          >
            Kembali
          </Button>
        </div>
      </ContentLayer>
    </ShellLayer>
  );
}
