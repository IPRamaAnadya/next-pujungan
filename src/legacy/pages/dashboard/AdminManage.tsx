import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Plus, 
  Edit2, 
  Trash2, 
  Shield,
  UserCircle,
  X,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { useAuth } from '@/context/AuthContext';

interface Admin {
  uuid: string;
  nama: string;
  email: string;
  password: string;
  role: string;
  created_at: string;
  updated_at: string;
}

const AdminManage = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState<Admin[]>(templesData.admin);
  
  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    role: 'editor',
  });
  const [formErrors, setFormErrors] = useState<Partial<Record<keyof typeof formData, string>>>({});

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof typeof formData, string>> = {};
    
    if (!formData.nama.trim()) {
      errors.nama = 'Nama wajib diisi';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Email tidak valid';
    }
    if (!formData.password.trim() && !isEditDialogOpen) {
      errors.password = 'Password wajib diisi';
    } else if (formData.password && formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAdd = () => {
    if (!validateForm()) return;

    const newAdmin: Admin = {
      uuid: `adm-${Date.now()}`,
      nama: formData.nama,
      email: formData.email,
      password: formData.password, // In real app, this would be hashed
      role: formData.role,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setAdmins(prev => [...prev, newAdmin]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = () => {
    if (!validateForm() || !selectedAdmin) return;

    setAdmins(prev => 
      prev.map(admin => 
        admin.uuid === selectedAdmin.uuid 
          ? { 
              ...admin, 
              nama: formData.nama, 
              email: formData.email,
              ...(formData.password && { password: formData.password }),
              role: formData.role,
              updated_at: new Date().toISOString() 
            }
          : admin
      )
    );
    setIsEditDialogOpen(false);
    setSelectedAdmin(null);
  };

  const handleDelete = () => {
    if (selectedAdmin) {
      // Prevent deleting yourself
      if (selectedAdmin.uuid === currentUser?.uuid) {
        alert('Anda tidak dapat menghapus akun sendiri!');
        setIsDeleteDialogOpen(false);
        setSelectedAdmin(null);
        return;
      }

      setAdmins(prev => prev.filter(admin => admin.uuid !== selectedAdmin.uuid));
      setIsDeleteDialogOpen(false);
      setSelectedAdmin(null);
    }
  };

  const openEditDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setFormData({
      nama: admin.nama,
      email: admin.email,
      password: '',
      role: admin.role,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (admin: Admin) => {
    setSelectedAdmin(admin);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({ nama: '', email: '', password: '', role: 'editor' });
    setFormErrors({});
    setShowPassword(false);
  };

  const getRoleBadge = (role: string) => {
    if (role === 'admin') {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#c68e51]/10 text-[#c68e51] text-xs font-medium">
          <Shield size={12} />
          Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-medium">
        <UserCircle size={12} />
        Editor
      </span>
    );
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
                Kelola Admin
              </h1>
              <p className="text-[#888888] text-sm">
                {admins.length} pengguna admin
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
            Tambah Admin
          </Button>
        </div>

        {/* Admins Table */}
        <div className="bg-white shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#151515] text-white">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium">Pengguna</th>
                  <th className="text-left px-6 py-4 text-sm font-medium">Role</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden md:table-cell">Dibuat</th>
                  <th className="text-left px-6 py-4 text-sm font-medium hidden md:table-cell">Terakhir Update</th>
                  <th className="text-center px-6 py-4 text-sm font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {admins.map((admin) => (
                  <tr 
                    key={admin.uuid} 
                    className={`border-b border-gray-100 hover:bg-[#f8f3ec]/50 ${
                      admin.uuid === currentUser?.uuid ? 'bg-[#c68e51]/5' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#c68e51] flex items-center justify-center">
                          <span className="text-[#151515] font-bold">
                            {admin.nama.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-[#151515] flex items-center gap-2">
                            {admin.nama}
                            {admin.uuid === currentUser?.uuid && (
                              <span className="text-xs text-[#c68e51]">(Anda)</span>
                            )}
                          </p>
                          <p className="text-xs text-[#888888]">{admin.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getRoleBadge(admin.role)}
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-[#888888]">
                        {new Date(admin.created_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-sm text-[#888888]">
                        {new Date(admin.updated_at).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditDialog(admin)}
                          className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => openDeleteDialog(admin)}
                          disabled={admin.uuid === currentUser?.uuid}
                          className="p-2 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                          title="Hapus"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Role Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-[#c68e51]" size={24} />
              <h3 
                className="text-lg font-bold text-[#151515]"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Admin
              </h3>
            </div>
            <p className="text-[#888888] text-sm">
              Memiliki akses penuh ke semua fitur dashboard. Dapat menambah, mengedit, 
              dan menghapus data pura, kategori, serta mengelola pengguna admin lainnya.
            </p>
          </div>
          
          <div className="bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <UserCircle className="text-blue-500" size={24} />
              <h3 
                className="text-lg font-bold text-[#151515]"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Editor
              </h3>
            </div>
            <p className="text-[#888888] text-sm">
              Memiliki akses terbatas. Dapat menambah dan mengedit data pura dan kategori, 
              tetapi tidak dapat mengelola pengguna admin.
            </p>
          </div>
        </div>

        {/* Add Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="rounded-none max-w-md">
            <DialogHeader>
              <DialogTitle style={{ fontFamily: 'Bodoni Moda, serif' }}>
                Tambah Admin Baru
              </DialogTitle>
              <DialogDescription>
                Buat akun admin baru untuk mengelola konten.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap <span className="text-red-500">*</span></Label>
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nama: e.target.value }));
                    setFormErrors(prev => ({ ...prev, nama: undefined }));
                  }}
                  placeholder="Contoh: I Made Wijaya"
                  className="rounded-none"
                />
                {formErrors.nama && <p className="text-red-500 text-sm">{formErrors.nama}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    setFormErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  placeholder="admin@desapujungan.bali"
                  className="rounded-none"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, password: e.target.value }));
                      setFormErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Minimal 6 karakter"
                    className="rounded-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-[#c0c0c0] focus:border-[#c68e51] focus:ring-1 focus:ring-[#c68e51] outline-none bg-white"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
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
                Edit Admin
              </DialogTitle>
              <DialogDescription>
                Perbarui informasi pengguna admin.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit_nama">Nama Lengkap <span className="text-red-500">*</span></Label>
                <Input
                  id="edit_nama"
                  value={formData.nama}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, nama: e.target.value }));
                    setFormErrors(prev => ({ ...prev, nama: undefined }));
                  }}
                  className="rounded-none"
                />
                {formErrors.nama && <p className="text-red-500 text-sm">{formErrors.nama}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_email">Email <span className="text-red-500">*</span></Label>
                <Input
                  id="edit_email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData(prev => ({ ...prev, email: e.target.value }));
                    setFormErrors(prev => ({ ...prev, email: undefined }));
                  }}
                  className="rounded-none"
                />
                {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_password">Password Baru</Label>
                <div className="relative">
                  <Input
                    id="edit_password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => {
                      setFormData(prev => ({ ...prev, password: e.target.value }));
                      setFormErrors(prev => ({ ...prev, password: undefined }));
                    }}
                    placeholder="Kosongkan jika tidak ingin mengubah"
                    className="rounded-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#888888]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit_role">Role</Label>
                <select
                  id="edit_role"
                  value={formData.role}
                  onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-4 py-2 border border-[#c0c0c0] focus:border-[#c68e51] focus:ring-1 focus:ring-[#c68e51] outline-none bg-white"
                >
                  <option value="editor">Editor</option>
                  <option value="admin">Admin</option>
                </select>
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
                Apakah Anda yakin ingin menghapus admin <strong>{selectedAdmin?.nama}</strong>?
                Tindakan ini tidak dapat dibatalkan.
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
                className="bg-red-600 hover:bg-red-700 text-white rounded-none"
              >
                <Trash2 size={16} className="mr-2" />
                Hapus
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default AdminManage;
