import HeroBeranda from "@/components/beranda/hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScaleCarousel } from "@/components/ui/scale-carousel";
import { cn } from "@/lib/utils/cn";
import { ArrowRight, Bookmark, Calendar } from "lucide-react";

const data = {
  "hero": {
    "title": "Selamat Datang di HIMASISFO",
    "description": "Organisasi kemahasiswaan yang bergerak di bidang eksekutif yang ada pada Program Studi Sistem Informasi Universitas Pembangunan Nasional \"Veteran\" Yogyakarta",
    "images_carousel": [
      "image_hero_1.jpg",
      "image_hero_2.jpg",
      "image_hero_3.jpg"
    ]
  },

  "visi_misi": {
    "visi": "Mewujudkan himpunan yang harmonis dan berdaya saing dengan menjunjung tinggi nilai kekeluargaan dan keseimbangan antara kerja dan istirahat",
    "misi": [
      "Mengimprovisasi pelaksanaan beberapa program agar lebih relevan dan optimal",
      "Menyediakan pelayanan yang responsif terhadap kebutuhan akademik, non-akademik, dan aspirasi mahasiswa",
      "Membuka ruang partisipasi aktif yang lebih luas bagi seluruh mahasiswa untuk terlibat aktif dalam kegiatan himpunan",
      "Membangun kolaborasi aktif dengan program studi untuk menyelaraskan kegiatan himpunan dengan visi akademik yang mendukung pengembangan mahasiswa",
      "Mengembangkan soft skill dan hard skill mahasiswa sistem informasi untuk mendukung kinerja organisasi dan pengembangan diri yang berkelanjutan"
    ],
    "tujuan": "HIMASISFO menampung seluruh elemen mahasiswa Program Studi Sistem Informasi Jurusan Informatika Fakultas Teknik Industri Universitas Pembangunan Nasional \"Veteran\" Yogyakarta menuju kehidupan kampus kritis yang bertanggung jawab, dinamis, demokratis, dan harmonis.",
  },


  "sejarah": {
    "title": "Sejarah HIMASISFO",
    "image_url": "image_sejarah.jpg",
    "content": "Sejarah Himpunan Mahasiswa Sistem Informasi (HIMASISFO) tidak dapat dipisahkan dari riwayat berdirinya Program Sistem Informasi di Universitas Pembangunan Nasional \"Veteran\" Yogyakarta. Prodi S1 Sistem Informasi secara resmi didirikan berdasarkan Surat Keputusan Pendirian Program Studi nomor 82/KPT/I/2016. UPN \"Veteran\" Yogyakarta mulai menerima mahasiswa baru pada tahun 2017. Proses perumusan organisasi dimotori oleh tujuh mahasiswa angkatan 2017: Azyumardi Azra, Lintang Hakimi, Fagil Arya Baskoro, Daffa Aulia Zakharia, Fairuz Akmal Lanang, Brilliant Hanif Almubarak, dan Naufal Fakhri. Setelah melalui proses diskusi dan perumusan intensif, HIMASISFO resmi diresmikan pada Jumat, 16 November 2018.",
  },

  "statistics": [
    {
      "label": "Est. 2017",
      "description": "Program studi yang berdiri sejak 2017 di UPN \"Veteran\" Yogyakarta"
    },
    {
      "label": "1000+",
      "description": "Memiliki lebih dari 1000 lulusan dan mahasiswa aktif hingga saat ini"
    }
  ],

  "informasi_terbaru": {
    "title": "Informasi Terbaru",
    "items": [
      {
        "title": "Judul Pengumuman",
        "date": "2025-05-11",
        "category": "Beasiswa",
        "image_url": "image_pengumuman.jpg",
        "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        "title": "Judul Pengumuman",
        "date": "2025-05-11",
        "category": "Beasiswa",
        "image_url": "image_pengumuman.jpg",
        "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      },
      {
        "title": "Judul Pengumuman",
        "date": "2025-05-11",
        "category": "Beasiswa",
        "image_url": "image_pengumuman.jpg",
        "excerpt": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      }
    ]
  },

  "kabinet": [
    {
      "name": "Kabinet Gelora Harmoni",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image_url": "image_kabinet_1.jpg"
    },
    {
      "name": "Kabinet 2",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image_url": "image_kabinet_2.jpg"
    },
    {
      "name": "Kabinet 3",
      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "image_url": "image_kabinet_3.jpg"
    },
  ],

  "behind_the_web": {
    "section_title": "Behind The Web",
    "author": "CODE124",
    "image_url": "image_behind_the_web.jpg"
  },
  "spotify": [
    {
      "title": "S2 Eps. 2: Maba 25 problematik??",
      "date": "2025-06-30",
      "images_carousel": [
        "image_media_1.jpg",
        "image_media_2.jpg"
      ]
    }
  ]
}


export default function Page() {
  return <>
    <HeroBeranda />
    <Pita />
    <VisiMisi />
    <Pita />
    <Sejarah />
    <Informasi />
    <Awan className="my-50" />
    <Kabinet />
    <Awan className="my-50" />
    <Graphics />
    <Awan className="my-50" />
    <Pita />
    <BehindTheWeb />
    <Pita />
    <Spotify />
    <Footer />
  </>
}

function Pita() {
  return <div className="relative">
    <img src="/assets/beranda/pita.png" className="-mt-10 sm:-mt-15 md:-mt-20 w-full absolute" alt="" />
  </div>
}

function VisiMisi() {
  return <div className="h-96 mt-20 mb-34 lg:my-60 mx-16">
    <div className="grid md:grid-cols-2 h-full">
      <div className="flex items-center justify-center">
        <img src={'/assets/shared/logos/logo-himasisfo.webp'}
          alt="" className="h-3/4" />
      </div>
      <div className="flex w-full items-center">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="visi">
            <AccordionTrigger>Visi</AccordionTrigger>
            <AccordionContent className="text-justify">
              {data.visi_misi.visi}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="misi">
            <AccordionTrigger>misi</AccordionTrigger>
            <AccordionContent className="text-justify">
              <ol className="gap-2 grid">

                {data.visi_misi.misi.map((misiPoint, index) => (
                  <li key={index}>{index + 1}. {misiPoint}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tujuan">
            <AccordionTrigger>tujuan</AccordionTrigger>
            <AccordionContent className="text-justify">
              {data.visi_misi.tujuan}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  </div>
}
function Sejarah() {
  return <div className="grid lg:grid-cols-2 my-60 mx-16 gap-8 relative">
    <img className="w-full" src="/assets/beranda/sejarah.png" alt="" />
    <div className="flex flex-col gap-10">
      <h2 className="text-4xl font-bold">SEJARAH <br /> HIMASISFO</h2>
      <p className="text-sm text-justify">{data.sejarah.content}</p>
    </div>
    <div className="absolute -bottom-20 flex gap-8 justify-end w-full right-20">
      {data.statistics.map((statistic, index) => (
        <div key={index} className="rounded-4xl w-sm border-gray-400 p-10 border bg-white">
          <span className="text-xl font-semibold">{statistic.label}</span>
          <p className="text-sm">{statistic.description}</p>
        </div>
      ))}
    </div>
  </div>
}

function Informasi() {
  return <div className="flex items-center flex-col justify-center">
    <h2 className="text-4xl font-bold">INFORMASI TERBARU</h2>
    <img src="/assets/beranda/informasi-decorative.png" className="-mb-200 mt-60 w-full" alt="" />
    <div className="grid md:grid-cols-3 px-12">
      {data.informasi_terbaru.items.map((info, i) => (
        <div key={i} className="h-fit bg-linear-to-tl from-[#000000] via-[#23445B] to-[#060400] m-8 rounded-2xl shadow-lg p-4 text-background">
          <img src="/assets/beranda/informasi.png" alt="" className="w-full aspect-3/2 bg-accent rounded-xl" />
          <div className="mt-4">
            <div className="flex gap-4">
              <span className="text-sm flex w-fit gap-2 items-center"><Calendar />{info.date}</span>
              <span className="text-sm flex w-fit gap-2 items-center"><Bookmark /> {info.category}</span>
            </div>
            <h3 className="font-semibold text-4xl mt-4">{info.title}</h3>
            <p className="text-sm mt-2 line-clamp-2">{info.excerpt}</p>
          </div>
        </div>
      ))}
    </div>
    <Button className="rounded-full py-4 px-5 mt-8 text-lg" size={'lg'}>Selengkapnya <ArrowRight /></Button>
  </div>
}

function Awan({ className }: { className?: string }) {
  return <svg width="1280" height="185" className={cn("w-full", className)} viewBox="0 0 1280 185" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M866.673 91.0616C871.54 89.0892 876.836 89.5836 882 90.1792C880.191 89.4701 878.445 88.6684 876.735 87.883C875.984 87.5377 875.232 87.1931 874.479 86.8579C867.809 83.8875 861.262 81.4143 854.529 83.7013C846.638 86.3813 839.669 92.7979 834.479 98.088C834.29 98.2814 834.14 98.5089 833.984 98.7301C833.677 99.1631 833.295 99.7016 832.755 100.186C823.002 108.956 803.533 118.322 789.897 108.195C785.463 104.904 782.283 100.401 779.651 96.4373C771.693 84.4546 762.276 74.0012 747.412 78.5752C747.059 78.6843 746.695 78.8563 746.274 79.0553C745.786 79.2864 745.297 79.5118 744.775 79.6923C744.565 79.7651 744.29 79.8735 743.982 79.9933C742.088 80.7345 740.641 81.2417 739.404 81.0691C738.571 80.9521 737.865 80.4099 737.547 79.6459C736.537 77.217 738.734 75.2896 739.915 74.2538C740.107 74.0869 740.281 73.9399 740.398 73.8165C741.124 73.0439 741.92 72.4376 742.691 71.8505C743.584 71.17 744.428 70.5266 744.915 69.7804C750.114 61.8188 750.243 53.9627 745.29 47.0603C737.666 36.4365 719.236 30.1783 705.044 33.4034C698.142 34.9692 689.498 39.3684 687.52 51.4282L686.065 60.2936C685.86 61.5562 684.666 62.4244 683.365 62.2225C682.079 62.027 681.193 60.8486 681.384 59.5831C682.53 51.991 683.829 43.3859 681.229 35.8166C679.573 30.9973 676.194 26.2235 670.898 21.2237C651.855 3.24314 623.014 -4.17708 597.438 2.31863C585.41 5.37389 575.563 11.6599 566.449 22.1018C560.583 28.823 553.519 37.8889 550.955 48.4307C547.227 63.7455 553.721 81.1076 567.116 91.6337C579.651 101.484 597.352 105.149 614.463 101.433C619.335 100.376 623.734 98.7814 627.574 96.7398C629.718 94.9286 632.105 93.2637 634.743 91.8013C635.278 91.3227 635.812 90.8426 636.304 90.3368C647.208 79.128 645.611 61.2759 637.878 51.1649C631.046 42.2339 620.926 40.2857 610.112 45.8149C606.744 47.5362 602.798 51.227 602.092 55.2588C601.725 57.3646 602.331 59.215 603.949 60.9164C604.842 61.8551 604.79 63.3275 603.834 64.2042C602.879 65.0794 601.382 65.0302 600.486 64.0908C597.865 61.3337 596.806 58.008 597.423 54.4727C598.405 48.848 603.405 43.9994 607.925 41.6889C620.813 35.1026 633.427 37.5993 641.665 48.3715C649.35 58.4189 651.708 75.1405 644.074 87.8708C651.419 85.6388 660.115 84.8049 670.217 86.0775C680.666 87.3936 694.605 93.5063 699.503 106.407C704.759 120.247 696.259 134.757 685.59 141.382C678.556 145.749 668.661 146.777 661.526 143.888C656.088 141.686 652.519 137.537 651.206 131.892C649.166 123.114 654.473 114.081 662.793 112.164C667.384 111.107 671.693 111.754 674.321 113.893C675.719 115.031 677.351 117.163 677.185 120.851C677.081 123.134 675.742 125.393 673.693 126.751C671.806 128 669.594 128.327 667.622 127.643C666.388 127.216 665.74 125.887 666.177 124.677C666.612 123.465 667.967 122.832 669.198 123.257C669.971 123.525 670.746 123.093 671.044 122.895C671.863 122.353 672.415 121.469 672.454 120.643C672.518 119.197 672.14 118.16 671.297 117.474C669.848 116.293 666.939 115.985 663.876 116.693C657.435 118.175 654.515 125.214 655.825 130.857C656.794 135.025 659.32 137.963 663.333 139.588C669.133 141.939 677.248 141.058 683.058 137.45C692.151 131.804 699.449 119.575 695.064 108.032C690.904 97.0744 678.756 91.842 669.617 90.6914C656.221 89.005 645.561 91.3055 637.476 95.6684C635.385 97.4724 633.006 99.0753 630.417 100.501C625.792 104.464 622.475 109.173 620.423 113.924C614.058 128.658 617.947 148.858 628.54 163.128C628.746 163.194 628.949 163.278 629.137 163.405C629.77 163.826 630.119 164.496 630.163 165.192C632.763 168.349 635.707 171.165 638.961 173.487C653.055 183.542 676.286 185.879 690.755 178.695C700.89 173.66 709.331 164.495 714.73 152.73C712.125 151.943 709.767 150.84 707.729 149.437C702.674 145.957 699.522 140.418 699.503 134.982C699.498 133.698 700.557 132.652 701.864 132.648C701.867 132.648 701.869 132.648 701.872 132.648C703.177 132.648 704.236 133.685 704.242 134.967C704.255 138.916 706.633 143.002 710.45 145.63C713.818 147.949 718.363 149.28 723.593 149.477C734.826 149.912 745.228 145.26 756.39 134.875C757.341 133.991 758.839 134.03 759.739 134.963C760.638 135.895 760.598 137.368 759.648 138.252C748.158 148.941 736.789 154.155 724.945 154.155C724.435 154.155 723.923 154.145 723.411 154.126C722.115 154.077 720.859 153.953 719.632 153.782C717.919 161.459 725.827 168.911 731.117 172.277C739.828 177.816 751.889 178.745 762.596 174.698C772.484 170.963 781.051 162.343 786.759 150.418C783.156 146.434 781.662 141.096 782.221 136.478C782.941 130.52 787.318 124.074 797.436 123.849C798.67 123.822 803.01 124.006 806.37 127.546C809.135 130.457 810.282 134.621 809.779 139.921C809.657 141.2 808.476 142.14 807.202 142.021C805.899 141.902 804.941 140.769 805.064 139.489C805.435 135.568 804.709 132.617 802.906 130.718C801.302 129.03 799.058 128.472 797.544 128.499C788.867 128.693 787.227 134.528 786.924 137.027C786.255 142.553 789.756 149.361 796.774 151.19C805.908 153.57 820.438 150.398 826.682 142.036C828.149 140.073 827.9 138.508 827.524 136.136C827.22 134.22 826.874 132.047 827.547 129.504C829.19 123.282 834.916 123.592 838.326 123.773C839.441 123.835 840.471 123.833 841.666 123.902C842.507 123.95 843.463 124.006 843.982 123.853C848.693 122.474 849.869 118.002 851.123 111.336C851.451 109.588 851.761 107.937 852.201 106.374C854.194 99.2958 859.064 94.1447 866.673 91.0616Z" fill="url(#paint0_linear_6508_15120)" />
    <path d="M616.062 112.106C617.14 109.61 618.531 107.125 620.226 104.729C618.686 105.192 617.117 105.621 615.484 105.975C596.982 109.991 577.795 105.984 564.155 95.2649C556.687 89.3969 551.174 81.5843 548.068 73.0977C536.11 73.3188 525.542 76.5389 518.234 82.2713C508.928 89.5688 500.559 103.826 502.562 116.957C503.487 123.023 506.821 128.695 511.709 132.518C518.658 137.952 532.006 139.451 540.858 135.792C546.381 133.509 549.459 129.656 550.01 124.337C550.728 117.389 545.662 112.672 540.65 111.23C536.312 109.982 530.569 110.81 527.445 116.867C526.854 118.015 525.424 118.47 524.262 117.891C523.094 117.311 522.627 115.911 523.219 114.765C526.876 107.678 534.238 104.536 541.983 106.765C548.815 108.731 555.717 115.214 554.723 124.806C554.006 131.746 549.734 137.17 542.697 140.078C538.832 141.676 534.309 142.44 529.727 142.44C521.936 142.44 513.971 140.233 508.758 136.155C502.946 131.608 498.979 124.861 497.878 117.645C497.471 114.984 497.45 112.287 497.725 109.606C488.118 102.949 474.184 103.161 464.53 110.134C460.445 113.086 457.563 117.264 454.513 121.689C450.636 127.313 446.627 133.129 439.875 136.453C436.573 138.079 432.914 138.476 429.449 138.744C423.735 139.184 420.075 137.584 416.19 135.891C414.685 135.236 413.129 134.557 411.368 133.963C410.7 133.738 410.055 133.485 409.415 133.234C407.902 132.639 406.594 132.126 405.147 132.082C402.509 132.006 400.509 132.217 398.463 132.799C398.309 132.843 398.155 132.886 398 132.929C404.647 135.247 407.973 142.502 409.833 146.557C414.279 156.26 419.113 162.389 429.453 162.964C438.902 163.487 446.202 158.817 453.917 153.868C458.047 151.22 462.318 148.482 467.018 146.519C468.281 145.991 469.525 145.591 470.762 145.245C471.076 144.959 471.47 144.747 471.923 144.662C473.753 144.318 475.526 144.167 477.249 144.167C487.928 143.612 497.701 148.824 507.224 153.925C514.541 157.844 522.105 161.896 529.762 162.996C541.572 164.69 553.177 161.65 560.833 154.865C561.803 154.002 563.3 154.077 564.178 155.033C565.055 155.986 564.978 157.456 564.006 158.317C556.879 164.636 546.812 168.107 536.151 168.107C533.813 168.107 531.447 167.94 529.077 167.6C520.649 166.39 512.769 162.194 505.146 158.112C506.658 159.54 508.091 160.958 509.445 162.3C511.574 164.41 513.586 166.404 515.422 167.961C516.482 168.86 517.502 169.739 518.496 170.595C526.453 177.453 532.2 182.408 542.753 184.298C549.521 185.51 557.041 184.749 563.377 182.205C569.951 179.567 573.683 175.263 578.005 170.28C578.767 169.401 579.545 168.505 580.355 167.595C580.357 167.593 580.358 167.59 580.361 167.588C581.22 166.624 582.72 166.525 583.703 167.371C584.356 167.932 584.619 168.766 584.471 169.545C585.313 170.683 588.266 173.084 591.254 175.023C603.379 182.899 616.669 175.963 624.574 165.753C613.005 150.211 608.982 128.495 616.062 112.106Z" fill="url(#paint1_linear_6508_15120)" />
    <path d="M388.17 115.361C378.423 117.931 370.484 123.578 362.806 129.039C357.718 132.658 352.912 136.076 347.609 138.685C333.791 145.48 320.958 148.04 309.478 146.291C302.04 145.161 294.973 140.863 286.56 132.355C286.478 132.272 286.369 132.235 286.277 132.163C285.689 129.377 284.099 126.821 281.763 125.071C279.188 123.139 275.99 122.406 272.773 123.006C268.857 123.737 266.452 126.206 266.648 129.297C266.735 130.731 268.036 131.819 269.613 131.742C271.16 131.658 272.34 130.427 272.249 128.993C272.227 128.638 273.078 128.257 273.88 128.108C275.86 127.734 277.345 128.451 278.235 129.117C279.87 130.343 280.902 132.381 280.93 134.438C280.986 138.705 279.064 141.99 275.217 144.2C269.077 147.725 258.788 147.882 251.795 144.559C245.907 141.76 241.062 137.195 235.932 132.359C232.183 128.824 228.305 125.169 223.951 122.242C212.754 114.712 200.82 110.804 188.479 110.629C174.363 110.442 162.718 115.033 150.422 119.909C147.875 120.918 145.306 121.937 142.694 122.917C131.247 127.213 119.837 130.595 108.779 132.965C85.4866 137.958 62.1464 139.208 39.4061 136.682C26.0411 135.197 12.6482 132.387 -0.404938 128.329C-15.0384 123.781 -29.6241 118.046 -43.7291 112.498C-50.6877 109.76 -57.8858 106.929 -64.9537 104.297C-72.833 101.36 -80.7631 99.0246 -88.5233 97.3551C-98.2133 95.2721 -107.486 94.2297 -116.269 94.2297C-123.897 94.2297 -131.154 95.0152 -138 96.5881C-138.046 96.5991 -138.094 96.612 -138.141 96.623C-116.579 88.6299 -95.2217 86.0616 -73.282 88.7864C-51.5549 91.4864 -29.5685 97.2575 -8.30815 102.839C1.39383 105.386 11.4255 108.019 21.3073 110.327C81.4232 124.372 126.602 121.013 159.427 100.061C184.026 84.3608 210.671 69.9224 242.154 80.5511C253.152 84.2659 262.434 90.4771 272.263 97.0531C279.173 101.677 286.318 106.459 294.055 110.229C312.831 119.376 336.15 120.489 358.028 113.282C359.545 112.782 361.091 112.248 362.666 111.706C375.354 107.335 388.475 102.809 399.207 110.407C401.505 112.034 403.379 113.814 405.001 115.776C399.639 113.981 393.561 113.942 388.17 115.361Z" fill="#013278" fillOpacity="0.25" />
    <path d="M-91.4844 110.443C-106.686 106.783 -121.909 104.954 -136.755 104.954C-140.869 104.954 -144.953 105.105 -149 105.386C-144.795 103.897 -140.688 102.568 -136.65 101.641C-122.795 98.4557 -107.031 98.7199 -89.7929 102.426C-82.3138 104.034 -74.6609 106.289 -67.0487 109.126C-60.0285 111.741 -52.8583 114.562 -45.9215 117.289C-31.7181 122.876 -17.0311 128.653 -2.19006 133.265C11.2227 137.433 24.992 140.321 38.7354 141.849C62.1173 144.448 86.111 143.167 110.041 138.036C121.384 135.604 133.079 132.14 144.798 127.741C147.447 126.748 150.046 125.717 152.627 124.694C164.36 120.043 175.505 115.646 188.392 115.834C195.668 115.937 202.809 117.518 209.739 120.494C209.885 120.6 210.044 120.694 210.215 120.774C220.267 125.433 225.58 141.205 224.682 149.592C224.04 155.621 222.349 160.902 219.658 165.289C212.891 176.322 198.527 183.137 184.756 181.843C172.395 180.69 161.376 170.257 160.692 159.061C160.3 152.636 162.392 146.519 166.288 142.696C169.557 139.489 174.035 137.862 179.597 137.862C179.961 137.862 180.306 137.793 180.626 137.676C185.662 139.136 190.025 141.768 191.503 145.783C192.586 148.715 191.507 153.02 189.099 155.381C188.226 156.238 185.383 157.245 183.228 156.892C181.992 156.686 181.739 156.135 181.631 155.899C181.028 154.575 179.378 153.957 177.954 154.52C176.527 155.081 175.86 156.608 176.465 157.93C177.46 160.108 179.508 161.558 182.235 162.013C185.989 162.637 190.794 161.297 193.177 158.956C196.995 155.213 198.559 148.825 196.815 144.099C192.727 133.007 175.723 129.957 165.508 131.399C157.33 132.548 150.01 136.057 142.933 139.448C140.084 140.814 137.39 142.105 134.652 143.246C121.321 148.8 110.913 152.402 100.907 154.927C74.0779 161.695 47.4551 162.668 19.5132 157.906C-1.61995 154.305 -19.4357 144.391 -38.2974 133.896C-54.8815 124.667 -72.0298 115.124 -91.4844 110.443Z" fill="#013278" fillOpacity="0.25" />
    <path d="M924.83 115.361C934.577 117.931 942.516 123.578 950.194 129.039C955.282 132.658 960.088 136.076 965.391 138.685C979.209 145.48 992.042 148.04 1003.52 146.291C1010.96 145.161 1018.03 140.863 1026.44 132.355C1026.52 132.272 1026.63 132.235 1026.72 132.163C1027.31 129.377 1028.9 126.821 1031.24 125.071C1033.81 123.139 1037.01 122.406 1040.23 123.006C1044.14 123.737 1046.55 126.206 1046.35 129.297C1046.26 130.731 1044.96 131.819 1043.39 131.742C1041.84 131.658 1040.66 130.427 1040.75 128.993C1040.77 128.638 1039.92 128.257 1039.12 128.108C1037.14 127.734 1035.66 128.451 1034.77 129.117C1033.13 130.343 1032.1 132.381 1032.07 134.438C1032.01 138.705 1033.94 141.99 1037.78 144.2C1043.92 147.725 1054.21 147.882 1061.21 144.559C1067.09 141.76 1071.94 137.195 1077.07 132.359C1080.82 128.824 1084.7 125.169 1089.05 122.242C1100.25 114.712 1112.18 110.804 1124.52 110.629C1138.64 110.442 1150.28 115.033 1162.58 119.909C1165.12 120.918 1167.69 121.937 1170.31 122.917C1181.75 127.213 1193.16 130.595 1204.22 132.965C1227.51 137.958 1250.85 139.208 1273.59 136.682C1286.96 135.197 1300.35 132.387 1313.4 128.329C1328.04 123.781 1342.62 118.046 1356.73 112.498C1363.69 109.76 1370.89 106.929 1377.95 104.297C1385.83 101.36 1393.76 99.0246 1401.52 97.3551C1411.21 95.2721 1420.49 94.2297 1429.27 94.2297C1436.9 94.2297 1444.15 95.0152 1451 96.5881C1451.05 96.5991 1451.09 96.612 1451.14 96.623C1429.58 88.6299 1408.22 86.0616 1386.28 88.7864C1364.55 91.4864 1342.57 97.2575 1321.31 102.839C1311.61 105.386 1301.57 108.019 1291.69 110.327C1231.58 124.372 1186.4 121.013 1153.57 100.061C1128.97 84.3608 1102.33 69.9224 1070.85 80.5511C1059.85 84.2659 1050.57 90.4771 1040.74 97.0531C1033.83 101.677 1026.68 106.459 1018.94 110.229C1000.17 119.376 976.85 120.489 954.972 113.282C953.455 112.782 951.909 112.248 950.334 111.706C937.646 107.335 924.525 102.809 913.793 110.407C911.495 112.034 909.621 113.814 907.999 115.776C913.361 113.981 919.439 113.942 924.83 115.361Z" fill="#013278" fillOpacity="0.25" />
    <path d="M1404.48 110.443C1419.69 106.783 1434.91 104.954 1449.76 104.954C1453.87 104.954 1457.95 105.105 1462 105.386C1457.79 103.897 1453.69 102.568 1449.65 101.641C1435.8 98.4557 1420.03 98.7199 1402.79 102.426C1395.31 104.034 1387.66 106.289 1380.05 109.126C1373.03 111.741 1365.86 114.562 1358.92 117.289C1344.72 122.876 1330.03 128.653 1315.19 133.265C1301.78 137.433 1288.01 140.321 1274.26 141.849C1250.88 144.448 1226.89 143.167 1202.96 138.036C1191.62 135.604 1179.92 132.14 1168.2 127.741C1165.55 126.748 1162.95 125.717 1160.37 124.694C1148.64 120.043 1137.5 115.646 1124.61 115.834C1117.33 115.937 1110.19 117.518 1103.26 120.494C1103.12 120.6 1102.96 120.694 1102.78 120.774C1092.73 125.433 1087.42 141.205 1088.32 149.592C1088.96 155.621 1090.65 160.902 1093.34 165.289C1100.11 176.322 1114.47 183.137 1128.24 181.843C1140.61 180.69 1151.62 170.257 1152.31 159.061C1152.7 152.636 1150.61 146.519 1146.71 142.696C1143.44 139.489 1138.97 137.862 1133.4 137.862C1133.04 137.862 1132.69 137.793 1132.37 137.676C1127.34 139.136 1122.98 141.768 1121.5 145.783C1120.41 148.715 1121.49 153.02 1123.9 155.381C1124.77 156.238 1127.62 157.245 1129.77 156.892C1131.01 156.686 1131.26 156.135 1131.37 155.899C1131.97 154.575 1133.62 153.957 1135.05 154.52C1136.47 155.081 1137.14 156.608 1136.53 157.93C1135.54 160.108 1133.49 161.558 1130.77 162.013C1127.01 162.637 1122.21 161.297 1119.82 158.956C1116 155.213 1114.44 148.825 1116.19 144.099C1120.27 133.007 1137.28 129.957 1147.49 131.399C1155.67 132.548 1162.99 136.057 1170.07 139.448C1172.92 140.814 1175.61 142.105 1178.35 143.246C1191.68 148.8 1202.09 152.402 1212.09 154.927C1238.92 161.695 1265.54 162.668 1293.49 157.906C1314.62 154.305 1332.44 144.391 1351.3 133.896C1367.88 124.667 1385.03 115.124 1404.48 110.443Z" fill="#013278" fillOpacity="0.25" />
    <defs>
      <linearGradient id="paint0_linear_6508_15120" x1="715.957" y1="0" x2="715.957" y2="182.863" gradientUnits="userSpaceOnUse">
        <stop stopColor="#BAC5D4" />
        <stop offset="0.466346" stopColor="#B5C0CE" stopOpacity="0.976923" />
        <stop offset="1" stopColor="#61666E" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="paint1_linear_6508_15120" x1="511.287" y1="73.0977" x2="511.287" y2="184.862" gradientUnits="userSpaceOnUse">
        <stop stopColor="#BAC5D4" />
        <stop offset="0.466346" stopColor="#B5C0CE" stopOpacity="0.976923" />
        <stop offset="1" stopColor="#61666E" stopOpacity="0.6" />
      </linearGradient>
    </defs>
  </svg>

}

function Kabinet() {
  return <div className="">
    <div className="grid lg:grid-cols-2 bg-[url('/assets/beranda/kabinet-bg.png')] bg-cover bg-center">
      <div className="flex items-center justify-center">
        <div className="w-sm text-justify">
          <h2 className="text-2xl font-bold">KABINET GELORA HARMONI</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident molestias ipsam molestiae autem harum repellat recusandae laudantium nobis! Non, quod?</p>
          <Button className="mt-4 rounded-full" size={"lg"}>Selengkapnya <ArrowRight /></Button>
        </div>
      </div>
      <ScaleCarousel>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-100 bg-amber-50 rounded-lg border"></div>
        ))}
      </ScaleCarousel>
    </div>
  </div>
}

function Graphics() {
  return <div className="h-100 bg-blue-100">
    <div className="flex items-center justify-center w-full h-full">
      <img src="/assets/beranda/web-prodi.png" className="w-full" alt="" />
    </div>
  </div>
}

function BehindTheWeb() {
  return <div className="h-300 bg-purple-100 py-50 px-12">
    <div className="flex flex-col h-full justify-end items-start">
      <p>Behind The Web</p>
      <div className="flex justify-between w-full items-center">
        <span className="text-[128px]">CODE124</span>
        <Button>Selengkapnya <ArrowRight /></Button>
      </div>
    </div>
  </div>
}

function Spotify() {
  return <div className="h-100 bg-black mt-50 text-white flex flex-col justify-center items-center perspective-distant">
    <span className="text-2xl mb-4">Dengarkan Podcast Kami di</span>
    <Button variant="secondary">Spotify <ArrowRight /></Button>
  </div>
}

function Footer() {
  return <img src={'/assets/beranda/footer.png'} className="w-screen" />
}