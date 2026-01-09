'use client';

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from 'react';

interface Kabinet {
  id_kabinet: number;
  nama_kabinet: string;
  tahun_kerja: string;
}

const EventForm = () => {
  const editorRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState({
    judul: '',
    tanggal_mulai: '',
    tanggal_berakhir: '',
    kategori: '',
    gambar_event: '',
    id_kabinet: '',
  });
  const [kabinetList, setKabinetList] = useState<Kabinet[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch kabinet list on mount
  useEffect(() => {
    fetch('/api/kabinet')
      .then(res => res.json())
      .then(data => setKabinetList(data))
      .catch(err => console.error('Failed to fetch kabinet:', err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const deskripsi = editorRef.current?.getContent() || '';

    const payload = {
      ...formData,
      deskripsi,
      id_kabinet: Number(formData.id_kabinet),
      tanggal_mulai: new Date(formData.tanggal_mulai),
      tanggal_berakhir: new Date(formData.tanggal_berakhir),
    };

    try {
      const res = await fetch('/api/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert('Event berhasil dibuat!');
        // Reset form
        setFormData({
          judul: '',
          tanggal_mulai: '',
          tanggal_berakhir: '',
          kategori: '',
          gambar_event: '',
          id_kabinet: '',
        });
        if (editorRef.current) editorRef.current.setContent('');
      } else {
        const error = await res.json();
        alert('Error: ' + error.message);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Terjadi kesalahan saat mengirim data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Buat Event Baru</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Judul:</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Kabinet:</label>
          <select
            name="id_kabinet"
            value={formData.id_kabinet}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Pilih Kabinet</option>
            {kabinetList.map(kabinet => (
              <option key={kabinet.id_kabinet} value={kabinet.id_kabinet}>
                {kabinet.nama_kabinet} ({kabinet.tahun_kerja})
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Tanggal Mulai:</label>
          <input
            type="datetime-local"
            name="tanggal_mulai"
            value={formData.tanggal_mulai}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Tanggal Berakhir:</label>
          <input
            type="datetime-local"
            name="tanggal_berakhir"
            value={formData.tanggal_berakhir}
            onChange={handleInputChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Kategori:</label>
          <input
            type="text"
            name="kategori"
            value={formData.kategori}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Gambar Event (URL):</label>
          <input
            type="url"
            name="gambar_event"
            value={formData.gambar_event}
            onChange={handleInputChange}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Deskripsi:</label>
          <Editor
            apiKey="z14g1fyeux6z9luyg731oowgfv6r1eo843fyzdatthryv6qh"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Deskripsi event...</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'a11ychecker', 'advlist', 'advcode', 'advtable', 'autolink', 'checklist', 'export',
                'lists', 'link', 'image', 'charmap', 'preview', 'anchor', 'searchreplace',
                'visualblocks', 'powerpaste', 'fullscreen', 'formatpainter', 'insertdatetime',
                'media', 'table', 'help', 'wordcount',
              ],
              toolbar: 'undo redo | image | preview | casechange blocks | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
              placeholder: "Start typing here...",
            }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", padding: "10px 20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
        >
          {loading ? 'Menyimpan...' : 'Buat Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;