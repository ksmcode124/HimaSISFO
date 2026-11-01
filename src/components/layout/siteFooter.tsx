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
  { label: "Email", href: "mailto:himasisfo@upnyk.ac.id", icon: MdEmail },
  { label: "Youtube", href: "https://www.youtube.com/@himasisfoupnyk", icon: FaYoutube },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/himasisfoupnvy", icon: FaLinkedinIn },
];

const link_class =
  "body2 whitespace-nowrap text-white-light";

export default function SiteFooter() {
  return (
    <footer className="bg-black-darker px-6 py-8 text-white-light md:py-12">
      <div className="mx-auto flex max-w-sm w-full flex-col gap-6 md:max-w-4xl lg:max-w-[974px]">
        {/* title + logo*/}
        <div className='flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-12'>
          <div className='grid grid-cols-[1fr_auto_auto_1fr] gap-x-3 gap-y-6 md:grid-cols-[auto_1fr] md:gap-x-4 md:gap-y-3 lg:gap-x-6'>
            <Image
              src="/assets/shared/logos/logo-himasisfo.webp"
              alt='Himasisfo'
              width={150}
              height={150}
              className='col-start-2 size-[72px] self-center md:col-start-1 md:row-span-3 md:size-[110px] lg:size-[150px]'
            />
            <span className='title1 col-start-3 self-center leading-none md:col-start-2 md:-mb-1 md:self-auto'>
              HIMASISFO
            </span>

            {/* maps */}
            <a href={map_link} target='_blank' rel='noopener noreferrer' className='col-span-4 md:col-span-1 md:col-start-2'>
              <Image
                src="/assets/shared/decoratives/maps.webp"
                alt='Map Sistem Informasi'
                width={140}
                height={140}
                className='aspect-square w-full object-cover md:w-[140px]'
              />
            </a>

            {/* alamat */}
            <a href={map_link} target='_blank' rel='noopener noreferrer' className='font-title font-bold text-[8px] leading-normal col-span-4 flex items-start gap-2 md:col-span-1 md:col-start-2'>
              <MdLocationOn className='mt-0.5 size-4 shrink-0 text-white-light' />
              <span>{address}</span>
            </a>
          </div>

          {/* LINKS */}
          <div className='mt-2 grid w-full grid-cols-2 gap-6 md:mt-0 md:w-auto md:grid-cols-[auto_auto] md:gap-12 lg:gap-24'>
            {/* academics */}
            <div>
              <div className='body1-bold whitespace-nowrap'>
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
              <div className='body1-bold whitespace-nowrap'>
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
        </div>

        {/* garis */}
        <div className="h-px w-full bg-white-light/10 md:mt-6" />

        {/* copyright */}
        <p className="body4 font-bold text-white-darker md:text-center md:text-[16px]">
          © {new Date().getFullYear()} HIMASISFO UPN “Veteran” Yogyakarta.
          <br className='md:hidden' /> {" "}
          All rights reserved.
        </p>
      </div>
    </footer >
  );
}