"use client"

import { DecorationLayer } from "@/components/layout/Layer";
import { CalendarDecoration } from "@/features/kegiatan/components/layer/DecorationLayer";

export default function test() {
  return (<DecorationLayer className="relative w-full">
    <CalendarDecoration />
  </DecorationLayer>);
}
