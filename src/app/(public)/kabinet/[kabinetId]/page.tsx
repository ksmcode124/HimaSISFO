"use client";

import { useParams } from "next/navigation";
import { useKabinetDisplay } from "@/features/kabinet/hooks/useKabinet";
import { Spinner } from "@/components/ui/spinner";
import {
  KabinetHeroSection,
  FilosofiSection,
  IntiHimpunanSection,
  DepartemenListSection,
} from "@/features/kabinet";
import { ShellLayer } from "@/components/layout/ShellLayer";

export default function Page() {
  const params = useParams();
  const kabinetId = params.kabinetId as string;

  const { displayData, isLoading, isError } = useKabinetDisplay(kabinetId);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="size-12" />
      </div>
    );
  }

  if (isError || !displayData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-center">
        <h1 className="text-md md:text-xl font-bold text-gray-800">
          Data Kabinet Tidak Ditemukan
        </h1>
      </div>
    );
  }

  const { currentKabinet, kabinetList, departemenList, raw } = displayData;

  return (
    <ShellLayer>
      <KabinetHeroSection
        currentKabinet={currentKabinet}
        kabinetList={kabinetList}
      />
      <FilosofiSection data={currentKabinet} />
      <IntiHimpunanSection data={raw.kabinet.departemenInti} />
      <DepartemenListSection data={departemenList} />
    </ShellLayer>
  );
}
