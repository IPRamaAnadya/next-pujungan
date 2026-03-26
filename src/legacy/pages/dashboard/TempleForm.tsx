import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, MapPin, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import templesData from '@/data/temples.json';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/context/AuthContext';

interface TempleFormData {
  nama_pura: string;
  deskripsi: string;
  alamat: string;
  latitude: string;
  longitude: string;
  foto_url: string;
  kategori_uuid: string;
}

const TempleForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState<TempleFormData>({
    nama_pura: '',
    deskripsi: '',
    alamat: '',
    latitude: '',
    longitude: '',
    foto_url: '',
    kategori_uuid: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof TempleFormData, string>>>({});

  useEffect(() => {
    if (isEditMode && id) {
      const temple = templesData.pura.find(t => t.uuid === id);
      if (temple) {
        setFormData({
          nama_pura: temple.nama_pura,
          deskripsi: temple.deskripsi,
          alamat: temple.alamat,
          latitude: temple.latitude.toString(),
          longitude: temple.longitude.toString(),
          foto_url: temple.foto_url,
          kategori_uuid: temple.kategori_uuid,
        });
      } else {
        navigate('/dashboard/pura');
      }
    }
  }, [id, isEditMode, navigate]);

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof TempleFormData, string>> = {};

    if (!formData.nama_pura.trim()) {
      newErrors.nama_pura = 'Nama pura wajib diisi';
    }
    if (!formData.deskripsi.trim()) {
      newErrors.deskripsi = 'Deskripsi wajib diisi';
    }
    if (!formData.alamat.trim()) {
      newErrors.alamat = 'Alamat wajib diisi';
    }
    if (!formData.latitude.trim() || isNaN(Number(formData.latitude))) {
      newErrors.latitude = 'Latitude tidak valid';
    }
    if (!formData.longitude.trim() || isNaN(Number(formData.longitude))) {
      newErrors.longitude = 'Longitude tidak valid';
    }
    if (!formData.foto_url.trim()) {
      newErrors.foto_url = 'URL foto wajib diisi';
    }
    if (!formData.kategori_uuid) {
      newErrors.kategori_uuid = 'Kategori wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would save to backend
    console.log('Saving temple:', formData);

    setIsSubmitting(false);
    navigate('/dashboard/pura');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof TempleFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate('/dashboard/pura')}
            className="p-2 hover:bg-[#151515]/5 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-[#151515]" />
          </button>
          <div>
            <h1 
              className="text-3xl font-bold text-[#151515]"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              {isEditMode ? 'Edit Pura' : 'Tambah Pura Baru'}
            </h1>
            <p className="text-[#888888] text-sm">
              {isEditMode ? 'Perbarui informasi pura' : 'Isi detail pura baru'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="max-w-4xl">
          <div className="bg-white shadow-md p-6 lg:p-8 space-y-6">
            {/* Nama Pura */}
            <div className="space-y-2">
              <Label htmlFor="nama_pura" className="text-[#151515] font-medium">
                Nama Pura <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nama_pura"
                name="nama_pura"
                type="text"
                value={formData.nama_pura}
                onChange={handleChange}
                placeholder="Contoh: Pura Penataran Agung"
                className={`border-${errors.nama_pura ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none`}
              />
              {errors.nama_pura && (
                <p className="text-red-500 text-sm">{errors.nama_pura}</p>
              )}
            </div>

            {/* Kategori */}
            <div className="space-y-2">
              <Label htmlFor="kategori_uuid" className="text-[#151515] font-medium">
                Kategori <span className="text-red-500">*</span>
              </Label>
              <select
                id="kategori_uuid"
                name="kategori_uuid"
                value={formData.kategori_uuid}
                onChange={handleChange}
                className={`w-full px-4 py-2 border border-${errors.kategori_uuid ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-1 focus:ring-[#c68e51] outline-none bg-white`}
              >
                <option value="">Pilih Kategori</option>
                {templesData.kategori_pura.map(cat => (
                  <option key={cat.uuid} value={cat.uuid}>{cat.nama_kategori}</option>
                ))}
              </select>
              {errors.kategori_uuid && (
                <p className="text-red-500 text-sm">{errors.kategori_uuid}</p>
              )}
            </div>

            {/* Deskripsi */}
            <div className="space-y-2">
              <Label htmlFor="deskripsi" className="text-[#151515] font-medium">
                Deskripsi <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi lengkap tentang pura... (dapat menggunakan HTML)"
                rows={8}
                className={`border-${errors.deskripsi ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none resize-none font-mono text-sm`}
              />
              {errors.deskripsi && (
                <p className="text-red-500 text-sm">{errors.deskripsi}</p>
              )}
              <p className="text-[#888888] text-xs">
                Tips: Gunakan tag HTML seperti &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt; untuk formatting.
              </p>
            </div>

            {/* Alamat */}
            <div className="space-y-2">
              <Label htmlFor="alamat" className="text-[#151515] font-medium">
                Alamat Lengkap <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-[#888888]" size={18} />
                <Textarea
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  placeholder="Alamat lengkap pura..."
                  rows={3}
                  className={`pl-10 border-${errors.alamat ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none resize-none`}
                />
              </div>
              {errors.alamat && (
                <p className="text-red-500 text-sm">{errors.alamat}</p>
              )}
            </div>

            {/* Koordinat */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="latitude" className="text-[#151515] font-medium">
                  Latitude <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="latitude"
                  name="latitude"
                  type="text"
                  value={formData.latitude}
                  onChange={handleChange}
                  placeholder="Contoh: -8.2674"
                  className={`border-${errors.latitude ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none`}
                />
                {errors.latitude && (
                  <p className="text-red-500 text-sm">{errors.latitude}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="longitude" className="text-[#151515] font-medium">
                  Longitude <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="longitude"
                  name="longitude"
                  type="text"
                  value={formData.longitude}
                  onChange={handleChange}
                  placeholder="Contoh: 115.5167"
                  className={`border-${errors.longitude ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none`}
                />
                {errors.longitude && (
                  <p className="text-red-500 text-sm">{errors.longitude}</p>
                )}
              </div>
            </div>

            {/* Foto URL */}
            <div className="space-y-2">
              <Label htmlFor="foto_url" className="text-[#151515] font-medium">
                URL Foto <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" size={18} />
                <Input
                  id="foto_url"
                  name="foto_url"
                  type="text"
                  value={formData.foto_url}
                  onChange={handleChange}
                  placeholder="/images/nama-gambar.jpg"
                  className={`pl-10 border-${errors.foto_url ? 'red-500' : '[#c0c0c0]'} focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none`}
                />
              </div>
              {errors.foto_url && (
                <p className="text-red-500 text-sm">{errors.foto_url}</p>
              )}
              
              {/* Image Preview */}
              {formData.foto_url && (
                <div className="mt-4">
                  <p className="text-sm text-[#888888] mb-2">Pratinjau:</p>
                  <img
                    src={formData.foto_url}
                    alt="Preview"
                    className="w-full max-w-md h-48 object-cover border border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/hero-temple.jpg';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="bg-[#f8f3ec] p-4 text-sm text-[#888888]">
              <p>Dibuat oleh: <span className="text-[#151515] font-medium">{user?.nama}</span></p>
              {isEditMode && (
                <p className="mt-1">ID: <span className="text-[#151515]">{id}</span></p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-8">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#c68e51] hover:bg-[#b07d45] text-[#151515] font-medium px-8 py-6 rounded-none"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#151515] border-t-transparent rounded-full animate-spin" />
                  Menyimpan...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Save size={18} />
                  Simpan
                </span>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/dashboard/pura')}
              className="border-[#151515] text-[#151515] hover:bg-[#151515] hover:text-white px-8 py-6 rounded-none"
            >
              Batal
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default TempleForm;
