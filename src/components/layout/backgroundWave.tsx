export default function BackgroundWave({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 bottom-[-20vw] -z-10 [clip-path:inset(-200vh_0_20vw_0)]"
            >
                <div
                    className="aspect-[1283/991] w-full bg-[url('/assets/beranda/Background-Wave.svg')] bg-[length:100%_100%] bg-no-repeat md:sticky md:top-[calc(46vh_-_30vw)] md:mt-[calc(-107px_-_30vw)]"
                />
            </div>
            {children}
        </div>
    );
}