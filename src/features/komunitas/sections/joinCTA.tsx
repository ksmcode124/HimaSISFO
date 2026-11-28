import { get_komunitas } from "../data/komunitas";

type JoinCTAProps = {
  komunitasId: string;
};

export default function JoinCTA({ komunitasId }: JoinCTAProps) {
  if(komunitasId == "arak-arakan") return null;

  const komunitas = get_komunitas(komunitasId);

  if (!komunitas) return null;

  const { desc, href } = komunitas.links;

  return (
    <section
      className="
        -mt-px flex w-full items-start overflow-x-clip
        min-h-[293px]
        lg:min-h-[499px]
        bg-[#90CAF9]
        px-4 pt-4 pb-8
        sm:px-8 sm:pt-6 sm:pb-12
        lg:pt-8 lg:pb-14
      "
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="relative mx-auto w-full max-w-[305px] lg:max-w-[1055px]">
          {/* Card abu-abu */}
          <div
            aria-hidden="true"
            className="
              absolute z-0
              top-[8px] left-[10px]
              w-full h-full
              rounded-[24px]
              bg-[#CCDAE4]
              lg:top-[14px] lg:left-[14px]
            "
          />

          {/* Card putih */}
          <div
            className="
              relative z-10
              flex flex-col justify-between gap-4
              w-full min-h-[217px]
              rounded-[24px]
              bg-white
              px-5 py-6

              lg:min-h-[301px]
              lg:rounded-[24px]
              lg:px-10
              lg:py-8
              lg:flex-row
              lg:items-end
            "
          >
            {/* Judul dan Deskripsi */}
            <div className="max-w-[760px]">
              <h2
                className="
                  font-['Coolvetica']
                  font-normal
                  text-[32px]
                  leading-[1.04]
                  tracking-normal
                  text-[#2196F3]
                  drop-shadow-[2px_2px_7px_#0000004D]
                  lg:text-[84px]
                  xl:text-[90px]
                  lg:leading-none
                "
              >
                <span className="block whitespace-nowrap">
                  MARI BERGABUNG
                </span>
                <span className="block whitespace-nowrap">
                  BERSAMA KAMI
                </span>
              </h2>

              <p
                className="
                  mt-3 lg:mt-4
                  w-full max-w-[257px]
                  font-['Poppins']
                  text-[14px]
                  font-normal
                  leading-[1.25]
                  tracking-[0px]
                  text-[#2196F3]

                  lg:max-w-[471px]
                  lg:text-[22px]
                  lg:font-semibold
                  lg:leading-[1.2]
                  lg:tracking-[0px]
                "
              >
                {desc}
              </p>
            </div>

            {/* Button */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex w-fit shrink-0
                items-center justify-center gap-2
                self-start lg:self-end
                rounded-lg bg-[#2196F3]
                px-4 py-2.5
                text-[12px] font-medium text-white
                transition-all duration-200
                hover:bg-[#1685DC]
                hover:shadow-md
                active:scale-95
                lg:mb-4 lg:px-5 lg:py-3 lg:text-[16px]
              "
            >
              <span>Gabung Tim</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}