interface FolderCardProps {
  title?: string
  children: React.ReactNode
  hasLayer?: boolean

  /** layout */
  widthClass?: string
  maxHeightClass?: string
  headerWidthClass?: string
  layerOffsetClass?: string

  /** appearance */
  headerBgClass?: string
  contentBgClass?: string
  borderClass?: string
}

export default function FolderCard({
  title = "",
  children,
  hasLayer = false,

  widthClass = "lg:w-[60vw] max-w-3xl",
  maxHeightClass = "max-h-[75vh]",
  headerWidthClass = "max-w-[80%] lg:max-w-[70%]",
  layerOffsetClass = `
    translate-y-15 -translate-x-6
    sm:translate-y-17 sm:-translate-x-8
    lg:translate-y-25 lg:-translate-x-10
  `,

  headerBgClass = "bg-[#EDF3F6]",
  contentBgClass = "bg-[#EDF3F6]",
  borderClass = "border-[#404040]",
}: FolderCardProps) {
  return (
    <div
      className={`relative mx-auto ${widthClass} ${maxHeightClass}`}
    >
      <div className="relative">

        {/* background offset layer */}
        {hasLayer && (
          <div
            className={`
              absolute inset-0 h-[90%]
              bg-linear-to-r to-[#1B3C53] from-[#456882] from-50%-[#1F445F]
              rounded-xl
              border-2 border-[#D9D9D9]
              z-0
              ${layerOffsetClass}
            `}
          />
        )}

        {/* HEADER (always rendered → geometry preserved) */}
        <div
          className={`
            relative z-20
            ${headerBgClass}
            ${headerWidthClass}
            min-h-10 sm:min-h-11 md:min-h-12
            rounded-t-xl
            border-t-2 border-x-2 ${borderClass}
            px-4 md:px-5
            flex items-center
          `}
        >
          {title ? (
            <h1 className="text-base sm:text-md md:text-lg lg:text-xl font-medium truncate">
              {title}
            </h1>
          ) : (
            <span className="invisible">placeholder</span>
          )}
        </div>

        {/* CONTENT */}
        <div
          className={`
            relative z-10
            ${contentBgClass}
            border-2 ${borderClass}
            rounded-b-xl rounded-tr-xl
            -mt-0.5
            overflow-y-auto
            px-4 sm:px-6 md:px-8 lg:px-10
            pt-6 sm:pt-7 md:pt-8 lg:pt-9
            pb-8
          `}
        >
          {children}
        </div>

      </div>
    </div>
  )
}
