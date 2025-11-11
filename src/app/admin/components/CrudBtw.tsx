'use client';

import { useState, useEffect } from 'react';

export default function CrudBtw() {
  const [activeTab, setActiveTab] = useState<'kepengurusan' | 'divisi' | 'anggota'>('kepengurusan');
  
  const [kepengurusanList, setKepengurusanList] = useState([]);
  const [divisiList, setDivisiList] = useState([]);
  const [anggotaList, setAnggotaList] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<any>(null);

  // Form state
  const [formData, setFormData] = useState({
    tahun_kerja: '',
    nama_divisi: '',
    id_btw: '',
    nama_anggota: '',
    jabatan: '',
    foto_anggota: '',
    id_divisi: '',
  });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/btw?type=${activeTab}`);
      const result = await response.json();
      
      if (result.success) {
        if (activeTab === 'kepengurusan') setKepengurusanList(result.data);
        if (activeTab === 'divisi') setDivisiList(result.data);
        if (activeTab === 'anggota') setAnggotaList(result.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = editData ? 'PUT' : 'POST';
    const body: any = {
      type: activeTab,
      data: {},
    };

    if (activeTab === 'kepengurusan') {
      body.data.tahun_kerja = formData.tahun_kerja;
      if (editData) body.id = editData.id_btw;
    } else if (activeTab === 'divisi') {
      body.data.nama_divisi = formData.nama_divisi;
      body.data.id_btw = parseInt(formData.id_btw);
      if (editData) body.id = editData.id_divisi;
    } else if (activeTab === 'anggota') {
      body.data.nama_anggota = formData.nama_anggota;
      body.data.jabatan = formData.jabatan;
      body.data.foto_anggota = formData.foto_anggota;
      body.data.id_divisi = parseInt(formData.id_divisi);
      if (editData) body.id = editData.id_anggota;
    }

    try {
      const response = await fetch('/api/btw', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        setShowModal(false);
        setEditData(null);
        resetForm();
        fetchData();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Gagal menyimpan data');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Yakin ingin menghapus data ini?')) return;

    try {
      const response = await fetch(`/api/btw?type=${activeTab}&id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        alert(result.message);
        fetchData();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data');
    }
  };

  const handleEdit = (data: any) => {
    setEditData(data);
    
    if (activeTab === 'kepengurusan') {
      setFormData({ ...formData, tahun_kerja: data.tahun_kerja });
    } else if (activeTab === 'divisi') {
      setFormData({
        ...formData,
        nama_divisi: data.nama_divisi,
        id_btw: data.id_btw.toString(),
      });
    } else if (activeTab === 'anggota') {
      setFormData({
        ...formData,
        nama_anggota: data.nama_anggota,
        jabatan: data.jabatan,
        foto_anggota: data.foto_anggota || '',
        id_divisi: data.id_divisi.toString(),
      });
    }
    
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      tahun_kerja: '',
      nama_divisi: '',
      id_btw: '',
      nama_anggota: '',
      jabatan: '',
      foto_anggota: '',
      id_divisi: '',
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">CRUD BTW</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab('kepengurusan')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'kepengurusan'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          Kepengurusan
        </button>
        <button
          onClick={() => setActiveTab('divisi')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'divisi'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          Divisi
        </button>
        <button
          onClick={() => setActiveTab('anggota')}
          className={`px-4 py-2 font-semibold ${
            activeTab === 'anggota'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600'
          }`}
        >
          Anggota
        </button>
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setEditData(null);
          resetForm();
          setShowModal(true);
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Tambah {activeTab === 'kepengurusan' ? 'Kepengurusan' : activeTab === 'divisi' ? 'Divisi' : 'Anggota'}
      </button>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                {activeTab === 'kepengurusan' && (
                  <>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Tahun Kerja</th>
                    <th className="border p-2">Actions</th>
                  </>
                )}
                {activeTab === 'divisi' && (
                  <>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nama Divisi</th>
                    <th className="border p-2">Kepengurusan</th>
                    <th className="border p-2">Actions</th>
                  </>
                )}
                {activeTab === 'anggota' && (
                  <>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Nama</th>
                    <th className="border p-2">Jabatan</th>
                    <th className="border p-2">Divisi</th>
                    <th className="border p-2">Actions</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeTab === 'kepengurusan' &&
                kepengurusanList.map((item: any) => (
                  <tr key={item.id_btw}>
                    <td className="border p-2">{item.id_btw}</td>
                    <td className="border p-2">{item.tahun_kerja}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_btw)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              
              {activeTab === 'divisi' &&
                divisiList.map((item: any) => (
                  <tr key={item.id_divisi}>
                    <td className="border p-2">{item.id_divisi}</td>
                    <td className="border p-2">{item.nama_divisi}</td>
                    <td className="border p-2">{item.btw_kepengurusan?.tahun_kerja}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_divisi)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              
              {activeTab === 'anggota' &&
                anggotaList.map((item: any) => (
                  <tr key={item.id_anggota}>
                    <td className="border p-2">{item.id_anggota}</td>
                    <td className="border p-2">{item.nama_anggota}</td>
                    <td className="border p-2">{item.jabatan}</td>
                    <td className="border p-2">{item.btw_divisi?.nama_divisi}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id_anggota)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

{/* Modal Form */}
{showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h3 className="text-xl font-bold mb-4">
        {editData ? 'Edit' : 'Tambah'}{' '}
        {activeTab === 'kepengurusan'
          ? 'Kepengurusan'
          : activeTab === 'divisi'
          ? 'Divisi'
          : 'Anggota'}
      </h3>

      <form onSubmit={handleSubmit}>
        {activeTab === 'kepengurusan' && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Tahun Kerja</label>
            <input
              type="text"
              value={formData.tahun_kerja}
              onChange={(e) =>
                setFormData({ ...formData, tahun_kerja: e.target.value })
              }
              className="w-full border rounded px-3 py-2"
              placeholder="2023/2024"
              required
            />
          </div>
        )}

        {activeTab === 'divisi' && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Nama Divisi</label>
              <input
                type="text"
                value={formData.nama_divisi}
                onChange={(e) =>
                  setFormData({ ...formData, nama_divisi: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Kepengurusan</label>
              <select
                value={formData.id_btw}
                onChange={(e) =>
                  setFormData({ ...formData, id_btw: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Pilih Kepengurusan</option>
                {kepengurusanList.map((k: any) => (
                  <option key={k.id_btw} value={k.id_btw}>
                    {k.tahun_kerja}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        {activeTab === 'anggota' && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Nama Anggota</label>
              <input
                type="text"
                value={formData.nama_anggota}
                onChange={(e) =>
                  setFormData({ ...formData, nama_anggota: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Jabatan</label>
              <input
                type="text"
                value={formData.jabatan}
                onChange={(e) =>
                  setFormData({ ...formData, jabatan: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Foto Anggota (URL)</label>
              <input
                type="text"
                value={formData.foto_anggota}
                onChange={(e) =>
                  setFormData({ ...formData, foto_anggota: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                placeholder="https://..."
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-semibold">Divisi</label>
              <select
                value={formData.id_divisi}
                onChange={(e) =>
                  setFormData({ ...formData, id_divisi: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Pilih Divisi</option>
                {divisiList.map((d: any) => (
                  <option key={d.id_divisi} value={d.id_divisi}>
                    {d.nama_divisi}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={() => {
              setShowModal(false);
              setEditData(null);
              resetForm();
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}