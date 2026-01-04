import { EventDetailSection } from "@/features/kegiatan/sections/EventDetailSection"
export default function Page({params} : {params: { detail: string }}) {
    return (
        <div>
            <div className="relative my-[150px] mx-20">
                <EventDetailSection searchKeyword={params.detail} />
            </div>
        </div>
    )
}