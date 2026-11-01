import Image from 'next/image';
import { FaInstagram, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const address =
  "Kampus Unit II (Prodi Sistem Informasi) Jl. Babarsari 2, Janti, Caturtunggal, Depok, Sleman Regency, Special Region of Yogyakarta 55281";

const map_link =
  `https://maps.app.goo.gl/zbXriBBbkukdoMKk9`

const academic_links = [
  { label: "Spada", href: "https://spada.upnyk.ac.id" },
  { label: "Bima", href: "https://bima.upnyk.ac.id" },
  { label: "AR-SI-P", href: "https://drive.google.com/drive/folders/1x2vYFJ4Qe5PF5X8BxADb3zF94AdJImuX" },
  { label: "Sadewa", href: "https://sadewa.upnyk.ac.id" },
];

const social_links = [
  { label: "Instagram", href: "https://www.instagram.com/himasisfoupnvyk", icon: FaInstagram },
  { label: "Email", href: "himasisfo@upnyk.ac.id", icon: MdEmail },
  { label: "Youtube", href: "https://www.youtube.com/@himasisfoupnyk", icon: FaYoutube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/himasisfoupnvy", icon: FaLinkedinIn },
];

const link_class =
  "body2 text-white-light";

export default function SideFooter() {
  return (
    <footer className="bg-black-darker px-6 py-8 text-white-light">
      <div className="max-auto flex mx-w-sm w-full flex-col gap-8">
        {/* title + logo*/}
        <div>
          <div className='flex items-center justify-center gap-3'>
            <Image
              src="/assets/shared/logos/logo-himasisfo.webp"
              alt='Himasisfo'
              width={72}
              height={72}
            />
            <span className='title1'>
              HIMASISFO
            </span>
          </div>

          {/* maps */}
          <a href={map_link} target='_blank' rel='noopener nonreferrer'>
            <Image
              src="/assets/shared/decoratives/maps.webp"
              alt='Map Sistem Informasi'
              width={516}
              height={516}
              className='aspect-square w-full object-cover mt-[32px]'
            />
          </a>

          {/* alamat */}
          <a href={map_link} target='_blank' rel='noopener nonreferrer' className='body4 flex items-start gap-2 mt-[16px]'>
            <MdLocationOn className='mt-0.5 size-4 shrink-0' />
            <span>{address}</span>
          </a>

          {/* LINKS */}
          <div className='mt-2 grid w-full w-full grid-cols-2 gap-6 mt-[32px]'>
            {/* academics */}
            <div>
              <div className='body1 font-semibold'>
                Tautan Akademik
              </div>
              <ul className='space-y-6 mt-5'>
                {academic_links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={link_class}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* socials */}
            <div>
              <div className='body1 font-semibold'>
                Media Sosial
              </div>
              <ul className='space-y-6 mt-5'>
                {social_links.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className={`${link_class} flex items-center gap-2`}
                    >
                      <Icon className='size-5' />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="h-px w-full bg-white-light/10 mt-[42px]" />

          <p className="body4 font-bold text-white-darker mt-[20px]">
            © {new Date().getFullYear()} HIMASISFO UPN “Veteran” Yogyakarta.
            <br />
            All rights reserved.
          </p>
        </div>
      </div>
    </footer >
  );
}