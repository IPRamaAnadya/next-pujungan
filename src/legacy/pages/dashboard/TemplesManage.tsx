import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2, 
  MapPin, 
  Calendar,
  ArrowLeft,
  Filter,
  X,
  Landmark
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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

interface Temple {
  uuid: string;
  nama_pura: string;
  deskripsi: string;
  alamat: string;
  latitude: number;
  longitude: number;
  foto_url: string;
  kategori_uuid: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

const TemplesManage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [templeToDelete, setTempleToDelete] = useState<Temple | null>(null);
  const [temples, setTemples] = useState<Temple[]>(templesData.pura);

  // Filter temples
  const filteredTemples = useMemo(() => {
    return temples.filter(temple => {
      const matchesSearch = temple.nama_pura.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          temple.alamat.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || temple.kategori_uuid === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [temples, searchQuery, selectedCategory]);

  const getCategoryName = (uuid: string) => {
    return templesData.kategori_pura.find(k => k.uuid === uuid)?.nama_kategori || '-';
  };

  const getCreatorName = (uuid: string) => {
    return templesData.admin.find(a => a.uuid === uuid)?.nama || '-';
  };

  const handleDeleteClick = (temple: Temple) => {
    setTempleToDelete(temple);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (templeToDelete) {
      setTemples(prev => prev.filter(t => t.uuid !== templeToDelete.uuid));
      setDeleteDialogOpen(false);
      setTempleToDelete(null);
    }
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
                Kelola Pura
              </h1>
              <p className="text-[#888888] text-sm">
                {filteredTemples.length} pura ditemukan
              </p>
            </div>
          </div>
          <Link
            to="/dashboard/pura/tambah"
            className="inline-flex items-center gap-2 bg-[#c68e51] text-[#151515] px-6 py-3 font-medium hover:bg-[#b07d45] transition-colors"
          >
            <Plus size={18} />
            Tambah Pura
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 shadow-md mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" size={20} />
              <Input
                type="text"
                placeholder="Cari pura..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#c0c0c0] focus:border-[#c68e51] focus:ring-[#c68e51] rounded-none"
              />
            </div>
            
            {/* Category Filter */}
            <div className="relative lg:w-64">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888888]" size={18} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#c0c0c0] focus:border-[#c68e51] focus:ring-1 focus:ring-[#c68e51] outline-none appearance-none bg-white"
              >
                <option value="all">Semua Kategori</option>
                {templesData.kategori_pura.map(cat => (
                  <option key={cat.uuid} value={cat.uuid}>{cat.nama_kategori}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            {(searchQuery || selectedCategory !== 'all') && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="border-[#c0c0c0] hover:bg-[#f8f3ec] rounded-none"
              >
                <X size={16} className="mr-2" />
                Reset
              </Button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#151515] text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium">Pura</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Kategori</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden lg:table-cell">Lokasi</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden md:table-cell">Dibuat Oleh</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden md:table-cell">Terakhir Update</th>
                  <th className="text-center px-6 py-4 text-sm font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTemples.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-[#888888]">
                      <Landmark size={48} className="mx-auto mb-4 opacity-30" />
                      <p>Tidak ada pura ditemukan</p>
                    </td>
                  </tr>
                ) : (
                  filteredTemples.map((temple) => (
                    <tr key={temple.uuid} className="border-b border-gray-100 hover:bg-[#f8f3ec]/50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={temple.foto_url}
                            alt={temple.nama_pura}
                            className="w-14 h-14 object-cover flex-shrink-0"
                          />
                          <div>
                            <p className="font-medium text-[#151515]">{temple.nama_pura}</p>
                            <p className="text-xs text-[#888888] line-clamp-1 lg:hidden">{temple.alamat}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-3 py-1 bg-[#c68e51]/10 text-[#c68e51] text-xs font-medium">
                          {getCategoryName(temple.kategori_uuid)}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2 text-[#888888] text-sm">
                          <MapPin size={14} />
                          <span className="line-clamp-1 max-w-[200px]">{temple.alamat}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-sm text-[#3c3c3c]">
                          {getCreatorName(temple.created_by)}
                        </span>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <div className="flex items-center gap-2 text-[#888888] text-sm">
                          <Calendar size={14} />
                          {new Date(temple.updated_at).toLocaleDateString('id-ID', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/dashboard/pura/edit/${temple.uuid}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(temple)}
                            className="p-2 text-red-600 hover:bg-red-50 transition-colors"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <DialogContent className="rounded-none">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Konfirmasi Hapus
              </DialogTitle>
              <DialogDescription>
                Apakah Anda yakin ingin menghapus pura <strong>{templeToDelete?.nama_pura}</strong>? 
                Tindakan ini tidak dapat dibatalkan.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <Button
                variant="outline"
                onClick={() => setDeleteDialogOpen(false)}
                className="rounded-none border-[#c0c0c0]"
              >
                Batal
              </Button>
              <Button
                onClick={handleConfirmDelete}
                className="rounded-none bg-red-600 hover:bg-red-700 text-white"
              >
                <Trash2 size={16} className="mr-2" />
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default TemplesManage;
