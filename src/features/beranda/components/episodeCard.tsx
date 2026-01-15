// components/EpisodeCard.tsx
type EpisodeCardProps = {
    title: string;
    episode?: string;
    season?: string;
    image: string;
    active?: boolean;
};

export default function EpisodeCard({
    title,
    episode,
    season,
    image,
    active,
}: EpisodeCardProps) {
    return (
        <div
            className={`relative aspect-square w-64 shrink-0 rounded-2xl overflow-hidden transition-all duration-300
        ${active ? "scale-110 z-10" : "scale-95 opacity-70"}
      `}
        >
            <img
                src={image}
                alt={title}
                className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 text-white">
                {season && (
                    <span className="inline-block text-xs bg-yellow-400 text-black px-2 py-0.5 rounded">
                        {season} · {episode}
                    </span>
                )}
                <h3 className="mt-2 text-lg font-bold leading-tight">
                    {title}
                </h3>
            </div>
        </div>
    );
}
