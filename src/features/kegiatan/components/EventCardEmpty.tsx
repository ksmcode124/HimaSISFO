

export function EventCardEmpty () {
    return (
        <div className="flex flex-col w-full bg-gradient-to-b from-[#486EAB] to-[#EDF3F6] border-gradient-y">
            <div className="flex flex-row w-full h-full border-b-1 border-white">
                <div className="bg-[url('/assets/kegiatan/Awan-Card.webp')] bg-contain bg-top mt-10 h-full w-1/2 bg-no-repeat"/>
                <div className="bg-[url('/assets/kegiatan/Awan-Card-2.webp')] bg-contain bg-bottom mb-20 h-full w-1/2 bg-no-repeat"/>
            </div>
            <div className="w-full px-[5px] md:px-[15px] py-10 md:py-20">
                <h1 className="text-sm md:text-3xl font-semibold text-[#323257]">Tidak ada kegiatan</h1>
            </div>
        </div>
    )
}