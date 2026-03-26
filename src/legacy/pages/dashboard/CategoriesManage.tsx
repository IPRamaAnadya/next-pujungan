import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Folder,
  X,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import templesData from '@/data/temples.json';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Category {
  uuid: string;
  nama_kategori: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
}

const CategoriesManage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(templesData.kategori_pura);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nama_kategori: '',
    deskripsi: '',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const getTempleCount = (categoryUuid: string) => {
    return templesData.pura.filter(t => t.kategori_uuid === categoryUuid).length;
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof typeof formData, string>> = {};
    if (!formData.nama_kategori.trim()) {
      errors.nama_kategori = 'Nama kategori wajib diisi';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

    const newCategory: Category = {
      uuid: `kat-${Date.now()}`,
      nama_kategori: formData.nama_kategori,
      deskripsi: formData.deskripsi,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setCategories(prev => [...prev, newCategory]);
    setFormData({ nama_kategori: '', deskripsi: '' });
    setIsAddDialogOpen(false);
  };

  const handleEdit = () => {
    if (!validateForm() || !selectedCategory) return;

    setCategories(prev => 
      prev.map(cat => 
        cat.uuid === selectedCategory.uuid 
          ? { ...cat, nama_kategori: formData.nama_kategori, deskripsi: formData.deskripsi, updated_at: new Date().toISOString() }
          : cat
      )
    );
    setIsEditDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = () => {
    if (selectedCategory) {
      // Check if category is in use
      const templeCount = getTempleCount(selectedCategory.uuid);
      if (templeCount > 0) {
        alert(`Kategori ini digunakan oleh ${templeCount} pura. Pindahkan pura ke kategori lain sebelum menghapus.`);
        setIsDeleteDialogOpen(false);
        setSelectedCategory(null);
        return;
      }

      setCategories(prev => prev.filter(cat => cat.uuid !== selectedCategory.uuid));
      setIsDeleteDialogOpen(false);
      setSelectedCategory(null);
    }
  };

  const openEditDialog = (category: Category) => {
    setSelectedCategory(category);
    setFormData({
      nama_kategori: category.nama_kategori,
      deskripsi: category.deskripsi,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ nama_kategori: '', deskripsi: '' });
    setFormErrors({});
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 hover:bg-[#151515]/5 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-[#151515]" />
            </button>
            <div>
              <h1 
                className="text-3xl font-bold text-[#151515]"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Kelola Kategori
              </h1>
              <p className="text-[#888888] text-sm">
                {categories.length} kategori tersedia
              </p>
            </div>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setIsAddDialogOpen(true);
            }}
            className="bg-[#c68e51] hover:bg-[#b07d45] text-[#151515] font-medium"
          >
            <Plus size={18} className="mr-2" />
            Tambah Kategori
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const templeCount = getTempleCount(category.uuid);
            return (
              <div 
                key={category.uuid} 
                className="bg-white shadow-md hover:shadow-xl transition-all duration-300 p-6 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-[#c68e51]/10 flex items-center justify-center">
                    <Folder size={24} className="text-[#c68e51]" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditDialog(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => openDeleteDialog(category)}
                      className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <h3 
                  className="text-xl font-bold text-[#151515] mb-2"
                  style={{ fontFamily: 'Bodoni Moda, serif' }}
                >
                  {category.nama_kategori}
                </h3>
                
                <p className="text-[#888888] text-sm line-clamp-2 mb-4">
                  {category.deskripsi || 'Tidak ada deskripsi'}
                </p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm text-[#888888]">
                    {templeCount} pura
                  </span>
                  <span className="text-xs text-[#c0c0c0]">
                    {new Date(category.updated_at).toLocaleDateString('id-ID')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="rounded-none max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Tambah Kategori Baru
              </DialogTitle>
              <DialogDescription>
                Isi informasi kategori pura baru.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama_kategori">Nama Kategori <span className="text-red-500">*</span></Label>
                <Input
                  id="nama_kategori"
                  value={formData.nama_kategori}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nama_kategori: e.target.value }));
                    setFormErrors(prev => ({ ...prev, nama_kategori: undefined }));
                  }}
                  placeholder="Contoh: Pura Kahyangan Jagat"
                  className="rounded-none"
                />
                {formErrors.nama_kategori && (
                  <p className="text-red-500 text-sm">{formErrors.nama_kategori}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="deskripsi">Deskripsi</Label>
                <Textarea
                  id="deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  placeholder="Deskripsi singkat tentang kategori ini..."
                  rows={3}
                  className="rounded-none resize-none"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
                className="rounded-none"
              >
                <X size={16} className="mr-2" />
                Batal
              </Button>
              <Button
                onClick={handleAdd}
                className="bg-[#c68e51] hover:bg-[#b07d45] text-[#151515] rounded-none"
              >
                <Save size={16} className="mr-2" />
                Simpan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="rounded-none max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Edit Kategori
              </DialogTitle>
              <DialogDescription>
                Perbarui informasi kategori.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_nama_kategori">Nama Kategori <span className="text-red-500">*</span></Label>
                <Input
                  id="edit_nama_kategori"
                  value={formData.nama_kategori}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nama_kategori: e.target.value }));
                    setFormErrors(prev => ({ ...prev, nama_kategori: undefined }));
                  }}
                  className="rounded-none"
                />
                {formErrors.nama_kategori && (
                  <p className="text-red-500 text-sm">{formErrors.nama_kategori}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_deskripsi">Deskripsi</Label>
                <Textarea
                  id="edit_deskripsi"
                  value={formData.deskripsi}
                  onChange={(e) => setFormData(prev => ({ ...prev, deskripsi: e.target.value }))}
                  rows={3}
                  className="rounded-none resize-none"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="rounded-none"
              >
                <X size={16} className="mr-2" />
                Batal
              </Button>
              <Button
                onClick={handleEdit}
                className="bg-[#c68e51] hover:bg-[#b07d45] text-[#151515] rounded-none"
              >
                <Save size={16} className="mr-2" />
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="rounded-none max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Konfirmasi Hapus
              </DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus kategori <strong>{selectedCategory?.nama_kategori}</strong>?
                {getTempleCount(selectedCategory?.uuid || '') > 0 && (
                  <span className="block mt-2 text-red-500">
                    Kategori ini digunakan oleh {getTempleCount(selectedCategory?.uuid || '')} pura. 
                    Pindahkan pura ke kategori lain sebelum menghapus.
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
                className="rounded-none"
              >
                Batal
              </Button>
              <Button
                onClick={handleDelete}
                disabled={getTempleCount(selectedCategory?.uuid || '') > 0}
                className="bg-red-600 hover:bg-red-700 text-white rounded-none disabled:opacity-50"
              >
                <Trash2 size={16} className="mr-2" />
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default CategoriesManage;
