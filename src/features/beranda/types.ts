export interface HeroSection {
    title: string
    description: string
    images: string[]
}

export interface VisionMission {
    vision: string
    missions: string[]
    objective: string
}

export interface HistorySection {
    title: string
    image_url: string
    content: string
}

export interface StatisticItem {
    label: string
    description: string
}

export interface NewsItem {
    title: string
    date: string // ISO date
    category: string
    image_url: string
    excerpt: string
}

export interface LatestInformation {
    title: string
    items: NewsItem[]
}

export interface Cabinet {
    name: string
    description: string
    image_url: string
}

export interface BehindTheWeb {
    title: string
    author: string
    image_url: string
}

export interface SpotifyMedia {
    title: string
    date: string
    images: string[]
}

export interface MediaSection {
    spotify: SpotifyMedia[]
}

export interface HimasisfoProfile {
    hero: HeroSection
    vision_mission: VisionMission
    history: HistorySection
    statistics: StatisticItem[]
    latest_information: LatestInformation
    cabinets: Cabinet[]
    behind_the_web: BehindTheWeb
    media: MediaSection
}