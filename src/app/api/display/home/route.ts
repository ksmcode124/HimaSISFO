import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Episode } from "@/lib/types/interface"; // pastiin ini sama antara response dan interfacemya
import { audio } from "framer-motion/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const showId = "4ne6bsylYJdVmMrfG3mLCG";

  if (!showId) {
    return NextResponse.json({ error: "Missing showId" }, { status: 400 });
  }

  try {
    // Get Spotify token
    const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            process.env.SPOTIFY_CLIENT_ID +
              ":" +
              process.env.SPOTIFY_CLIENT_SECRET
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Get Spotify episodes
    const spotifyRes = await fetch(
      `https://api.spotify.com/v1/shows/${showId}/episodes?limit=10`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const spotifyData = await spotifyRes.json();
    const episodes = (spotifyData.items || []).map((ep: Episode) => ({
      id: ep.id,
      name: ep.name,
      audio_preview_url: ep.audio_preview_url,
      release_date: ep.release_date,
      description: ep.description,
      images: ep.images || [],
      external_urls: ep.external_urls || { spotify: "" },
    }));

    // Get events from DB (limit 3)
    const events = await prisma.event.findMany({
      take: 3,
      orderBy: { tanggal_mulai: "desc" },
    });

    const mappedEvents = events.map((ev) => ({
      id: ev.id_event,
      title: ev.judul,
      start: ev.tanggal_mulai.toISOString(),
      end: ev.tanggal_berakhir.toISOString(),
      img: ev.gambar_event ?? null,
      description: ev.deskripsi ?? null,
      type: ev.kategori ?? null,
    }));

    return NextResponse.json({ episodes, events: mappedEvents });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
