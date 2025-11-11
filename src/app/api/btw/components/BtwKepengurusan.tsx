interface Props {
  tahunKerja: string;
}

export default function BtwKepengurusan({ tahunKerja }: Props) {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Behind The Work</h1>
        <p className="text-2xl">Kepengurusan Tahun {tahunKerja}</p>
      </div>
    </section>
  );
}