'use client';

import { useState } from 'react';
import { createKabinetSchema } from '@/schemas/kabinet.schema';
import { ZodError } from 'zod';

interface FormErrors {
  [key: string]: string[];
}

export default function KabinetForm() {
  const [formData, setFormData] = useState({
    nama_kabinet: '',
    tahun_kerja: '',
    foto_kabinet: '',
    gambar_logo: '',
    deskripsi: '',
    visi: '',
    misi: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: [],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setServerError('');
    setSuccess(false);

    try {
      const parsedData = createKabinetSchema.parse(formData);
      setLoading(true);

      const response = await fetch('/api/admin/kabinet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        const data = await response.json();
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setServerError(data.message || 'Terjadi kesalahan pada server');
        }
        return;
      }

      setSuccess(true);
      setFormData({
        nama_kabinet: '',
        tahun_kerja: '',
        foto_kabinet: '',
        gambar_logo: '',
        deskripsi: '',
        visi: '',
        misi: '',
      });

      setTimeout(() => {
        setSuccess(false);
      }, 3000);
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
        setServerError('Terjadi kesalahan saat validasi form');
      }
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (fieldName: string) => {
    return errors[fieldName]?.[0] || '';
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px' }}>
      <h1>Buat Kabinet Baru</h1>

      {success && (
        <div
          style={{
            backgroundColor: '#d4edda',
            color: '#155724',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #c3e6cb',
          }}
        >
          ✓ Kabinet berhasil ditambahkan!
        </div>
      )}

      {serverError && (
        <div
          style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #f5c6cb',
          }}
        >
          ✗ {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Nama Kabinet */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="nama_kabinet">
            Nama Kabinet <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="nama_kabinet"
            name="nama_kabinet"
            value={formData.nama_kabinet}
            onChange={handleChange}
            placeholder="Masukkan nama kabinet"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('nama_kabinet')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          {getErrorMessage('nama_kabinet') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('nama_kabinet')}
            </span>
          )}
        </div>

        {/* Tahun Kerja */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="tahun_kerja">
            Tahun Kerja <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            id="tahun_kerja"
            name="tahun_kerja"
            value={formData.tahun_kerja}
            onChange={handleChange}
            placeholder="Contoh: 2024/2025"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('tahun_kerja')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          {getErrorMessage('tahun_kerja') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('tahun_kerja')}
            </span>
          )}
        </div>

        {/* Foto Kabinet */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="foto_kabinet">Foto Kabinet (URL)</label>
          <input
            type="url"
            id="foto_kabinet"
            name="foto_kabinet"
            value={formData.foto_kabinet}
            onChange={handleChange}
            placeholder="https://example.com/foto.jpg"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('foto_kabinet')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          {getErrorMessage('foto_kabinet') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('foto_kabinet')}
            </span>
          )}
        </div>

        {/* Gambar Logo */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="gambar_logo">Gambar Logo (URL)</label>
          <input
            type="url"
            id="gambar_logo"
            name="gambar_logo"
            value={formData.gambar_logo}
            onChange={handleChange}
            placeholder="https://example.com/logo.jpg"
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('gambar_logo')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
            }}
          />
          {getErrorMessage('gambar_logo') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('gambar_logo')}
            </span>
          )}
        </div>

        {/* Deskripsi */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="deskripsi">Deskripsi</label>
          <textarea
            id="deskripsi"
            name="deskripsi"
            value={formData.deskripsi}
            onChange={handleChange}
            placeholder="Masukkan deskripsi kabinet"
            rows={3}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('deskripsi')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          {getErrorMessage('deskripsi') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('deskripsi')}
            </span>
          )}
        </div>

        {/* Visi */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="visi">Visi</label>
          <textarea
            id="visi"
            name="visi"
            value={formData.visi}
            onChange={handleChange}
            placeholder="Masukkan visi kabinet"
            rows={3}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('visi')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          {getErrorMessage('visi') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('visi')}
            </span>
          )}
        </div>

        {/* Misi */}
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="misi">Misi</label>
          <textarea
            id="misi"
            name="misi"
            value={formData.misi}
            onChange={handleChange}
            placeholder="Masukkan misi kabinet"
            rows={3}
            style={{
              width: '100%',
              padding: '8px',
              marginTop: '5px',
              border: getErrorMessage('misi')
                ? '1px solid #dc3545'
                : '1px solid #ddd',
              borderRadius: '4px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
            }}
          />
          {getErrorMessage('misi') && (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>
              {getErrorMessage('misi')}
            </span>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: loading ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            marginTop: '20px',
          }}
        >
          {loading ? 'Menyimpan...' : 'Buat Kabinet'}
        </button>
      </form>
    </div>
  );
}
