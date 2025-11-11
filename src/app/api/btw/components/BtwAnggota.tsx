import Image from 'next/image';

interface Anggota {
  id_anggota: number;
  nama_anggota: string;
  jabatan: string;
  foto_anggota: string | null;
}

interface Props {
  anggota: Anggota[];
}

export default function BtwAnggota({ anggota }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {anggota.map((member) => (
        <div
          key={member.id_anggota}
          className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
        >
          {/* Foto */}
          <div className="relative h-48 bg-gradient-to-br from-blue-400 to-purple-500">
            {member.foto_anggota ? (
              <Image
                src={member.foto_anggota}
                alt={member.nama_anggota}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-white text-6xl font-bold">
                  {member.nama_anggota.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 text-center">
            <h3 className="font-bold text-lg mb-1">{member.nama_anggota}</h3>
            <p className="text-gray-600 text-sm">{member.jabatan}</p>
          </div>
        </div>
      ))}
    </div>
  );
}