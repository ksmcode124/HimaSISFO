interface FolderCardProps {
  title?: string
  children: React.ReactNode
  hasLayer?: boolean

  /** layout */
  widthClass?: string
  heightClass?: string
  maxHeightClass?: string
  layerOffsetClass?: string

  /** appearance */
  headerBgClass?: string
  contentBgClass?: string
  borderClass?: string
}

export function FolderCard({
  title = "",
  children,
  hasLayer = false,

  widthClass = "w-[90%]",
  heightClass = "h-[30svh] lg:h-[40vh]",
  maxHeightClass,
  layerOffsetClass = `
    translate-y-10 -translate-x-6
    sm:translate-y-13 sm:-translate-x-8
    lg:translate-y-20 lg:-translate-x-5
    xl:translate-y-15 xl:-translate-x-10
  `,

  headerBgClass = "bg-[#EDF3F6]",
  contentBgClass = "bg-[#EDF3F6]",
  borderClass = "border-[#404040]",
}: FolderCardProps) {
  return (
    <div
      className={`relative flex justify-center items-center text-[#323257] ${widthClass} ${heightClass} ${maxHeightClass ?? ""}`}
    >
      <div className="relative h-full w-[80%] flex flex-col">

        {/* background offset layer */}
        {hasLayer && (
          <div
            className={`
              absolute inset-0
              bg-linear-to-r to-[#1B3C53] from-[#456882]
              rounded-xl
              border-2 border-[#D9D9D9]
              z-0
              ${layerOffsetClass}
            `}
          />
        )}

        {/* HEADER (fixed height naturally) */}
        <div
          className={`
            relative z-20
            ${headerBgClass}
            w-[70%]
            min-h-10 sm:min-h-11 md:min-h-12
            rounded-t-xl overflow-hidden
            translate-y-[1px]
            border-t-2 border-x-2 ${borderClass}
            px-4 md:px-5
            flex items-center
            shrink-0
          `}
        >
          {title ? (
            <h1 className="text-sm sm:text-lg md:text-xl lg:text-3xl font-semibold truncate">
              {title}
            </h1>
          ) : (
            <span className="invisible">placeholder</span>
          )}
        </div>

        {/* CONTENT (auto ambil sisa tinggi) */}
        <div
          className={`
            relative z-10
            ${contentBgClass}
            border-2 ${borderClass}
            rounded-b-xl rounded-tr-xl
            -mt-0.5
            h-full
            px-4 sm:px-6 md:px-8 lg:px-10
          `}
        >
          <div className="max-h-full overflow-y-auto">
            {children}
          </div>
        </div>

      </div>
    </div>
  )
}
