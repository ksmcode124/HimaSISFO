'use client'

import { useEffect, useRef, useState } from 'react'
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react'
import { Slider } from '@/components/ui/slider'

export default function AudioPlayer({
  src,
  onPrevClick,
  onNextClick,
}: {
  src?: string,
  onPrevClick: () => void,
  onNextClick: () => void,
}) {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!audioRef.current) return

    const wasPlaying = isPlaying

    audioRef.current.currentTime = 0
    setCurrentTime(0)

    if (wasPlaying) {
      audioRef.current.play().catch(() => { })
    }
  }, [src])

  const togglePlay = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      await audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  const handleTimeUpdate = () => {
    if (!audioRef.current) return
    setCurrentTime(audioRef.current.currentTime)
  }

  const handleLoaded = () => {
    if (!audioRef.current) return
    setDuration(audioRef.current.duration)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return
    const time = Number(e.target.value)
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  return (
    <div className="w-full text-white h-fit">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoaded}
        />
      )}

      {/* Progress */}
      <div className="mb-1">
        <Slider
          value={[currentTime]}
          max={duration || 0}
          step={1}
          onValueChange={(value) => {
            if (!audioRef.current) return
            const time = value[0]
            audioRef.current.currentTime = time
            setCurrentTime(time)
          }}
          // dont mind me im just stylin' awokawok
          className='w-full
          **:data-[orientation=horizontal]:bg-white/10
          [&_[data-orientation=horizontal]>span]:bg-white
          **:[[role=slider]]:bg-white
          **:[[role=slider]]:ring-white'
        />

        <div className="flex justify-between text-xs text-white/90 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Play Pause */}
      <div className="flex justify-center gap-8">
        <button disabled={!src} onClick={() => { onPrevClick(); setIsPlaying(true) }} className='hover:scale-110 transition-transform'>
          <SkipBack className='fill-white' />
        </button>
        <button
          disabled={!src}
          onClick={togglePlay}
          className="p-4 rounded-full bg-white text-black hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause fill='black' size={28} /> : <Play fill='black' size={28} />}
        </button>
        <button disabled={!src} onClick={() => { onNextClick(); setIsPlaying(true) }} className='hover:scale-110 transition-transform'>
          <SkipForward className='fill-white' />
        </button>
      </div>
    </div>
  )
}