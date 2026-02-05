'use client';

import { Editor } from "@tinymce/tinymce-react";
import { useRef, useState, useEffect } from 'react';
import { eventSchema } from '@/schemas/event.schema';
import { ZodError } from 'zod';

interface Kabinet {
  id_kabinet: number;
  nama_kabinet: string;
  tahun_kerja: string;
}

interface FormErrors {
  [key: string]: string[];
}

const EventForm = () => {
  const editorRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    tanggal_mulai: '',
    tanggal_berakhir: '',
    gambar_event: '',
    id_kabinet: '',
  });
  const [kabinetList, setKabinetList] = useState<Kabinet[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  // Fetch kabinet list on mount
  useEffect(() => {
    fetch('/api/admin/kabinet')
      .then(res => res.json())
      .then(data => setKabinetList(data))
      .catch(err => console.error('Failed to fetch kabinet:', err));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setSuccess(false);
    
    try {
      const deskripsi = editorRef.current?.getContent() || '';

      // Validate using Zod schema
      const parsedData = eventSchema.parse({
        judul: formData.judul,
        deskripsi: deskripsi,
        tanggal_mulai: new Date(formData.tanggal_mulai),
        tanggal_berakhir: new Date(formData.tanggal_berakhir),
        gambar_event: formData.gambar_event || '',
        id_kabinet: parseInt(formData.id_kabinet),
      });

      setLoading(true);

      const res = await fetch('/api/admin/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedData),
      });

      if (res.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
          judul: '',
          deskripsi: '',
          tanggal_mulai: '',
          tanggal_berakhir: '',
          gambar_event: '',
          id_kabinet: '',
        });
        if (editorRef.current) editorRef.current.setContent('');

        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        const error = await res.json();
        if (error.errors) {
          setErrors(error.errors);
        } else {
          setServerError(error.message || 'Terjadi kesalahan pada server');
        }
      }
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors: FormErrors = {};
        error.issues.forEach((err) => {
          const path = err.path[0] as string;
          if (!formattedErrors[path]) {
            formattedErrors[path] = [];
          }
          formattedErrors[path].push(err.message);
        });
        setErrors(formattedErrors);
      } else {
        console.error('Submit error:', error);
        setServerError('Terjadi kesalahan saat mengirim data.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (fieldName: string) => {
    return errors[fieldName]?.[0] || '';
  };

  return (
    <div style={{ width: "90%", margin: "auto", marginTop: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Buat Event Baru</h1>

      {success && (
        <div style={{
          backgroundColor: "#d4edda",
          border: "1px solid #c3e6cb",
          color: "#155724",
          padding: "12px 20px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}>
          ✓ Event berhasil ditambahkan!
        </div>
      )}

      {serverError && (
        <div style={{
          backgroundColor: "#f8d7da",
          border: "1px solid #f5c6cb",
          color: "#721c24",
          padding: "12px 20px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}>
          ✗ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Judul:</label>
          <input
            type="text"
            name="judul"
            value={formData.judul}
            onChange={handleInputChange}
            required
            style={{ 
              width: "100%", 
              padding: "8px",
              border: getErrorMessage('judul') ? "1px solid #dc3545" : "1px solid #ddd",
            }}
          />
          {getErrorMessage('judul') && (
            <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px", display: "block" }}>
              {getErrorMessage('judul')}
            </span>
          )}
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
            style={{ 
              width: "100%", 
              padding: "8px",
              border: getErrorMessage('tanggal_mulai') ? "1px solid #dc3545" : "1px solid #ddd",
            }}
          />
          {getErrorMessage('tanggal_mulai') && (
            <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px", display: "block" }}>
              {getErrorMessage('tanggal_mulai')}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Tanggal Berakhir:</label>
          <input
            type="datetime-local"
            name="tanggal_berakhir"
            value={formData.tanggal_berakhir}
            onChange={handleInputChange}
            required
            style={{ 
              width: "100%", 
              padding: "8px",
              border: getErrorMessage('tanggal_berakhir') ? "1px solid #dc3545" : "1px solid #ddd",
            }}
          />
          {getErrorMessage('tanggal_berakhir') && (
            <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px", display: "block" }}>
              {getErrorMessage('tanggal_berakhir')}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Gambar Event (URL):</label>
          <input
            type="url"
            name="gambar_event"
            value={formData.gambar_event}
            onChange={handleInputChange}
            style={{ 
              width: "100%", 
              padding: "8px",
              border: getErrorMessage('gambar_event') ? "1px solid #dc3545" : "1px solid #ddd",
            }}
          />
          {getErrorMessage('gambar_event') && (
            <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px", display: "block" }}>
              {getErrorMessage('gambar_event')}
            </span>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Deskripsi:</label>
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue="<p>Deskripsi event...</p>"
            init={{
              height: 300,
              menubar: false,
              plugins: [
                'lists',
                'link',
                'image',
                'charmap',
                'anchor',
                'searchreplace',
                'visualblocks',
                'fullscreen',
                'insertdatetime',
                'media',
                'table',
                'help',
              ],
              toolbar:
                'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | fullscreen help',
              placeholder: "Start typing here...",
            }}
          />
          {getErrorMessage('deskripsi') && (
            <span style={{ color: "#dc3545", fontSize: "12px", marginTop: "5px", display: "block" }}>
              {getErrorMessage('deskripsi')}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: "10px", padding: "10px 20px", display: "block", marginLeft: "auto", marginRight: "auto", backgroundColor: loading ? "#6c757d" : "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? 'Menyimpan...' : 'Buat Event'}
        </button>
      </form>
    </div>
  );
};

export default EventForm;