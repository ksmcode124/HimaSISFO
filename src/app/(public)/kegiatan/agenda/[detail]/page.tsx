import { EventDetailSection } from "@/features/kegiatan/sections/EventDetailSection"
export default function Page({ params }: { params: { detail: string } }) {
    return (
        <div className="relative my-[150px]">
            <EventDetailSection searchKeyword={params.detail} />
        </div>
    )
}