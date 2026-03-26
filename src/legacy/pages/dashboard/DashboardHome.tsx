import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Landmark, 
  Tags, 
  Users, 
  TrendingUp, 
  Eye,
  Calendar,
  ArrowRight,
  Plus
} from 'lucide-react';
import templesData from '@/data/temples.json';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalTemples: 0,
    totalCategories: 0,
    totalAdmins: 0,
    recentTemples: [] as typeof templesData.pura,
  });

  useEffect(() => {
    // Sort temples by updated_at (most recent first)
    const sortedTemples = [...templesData.pura].sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );

    setStats({
      totalTemples: templesData.pura.length,
      totalCategories: templesData.kategori_pura.length,
      totalAdmins: templesData.admin.length,
      recentTemples: sortedTemples.slice(0, 5),
    });
  }, []);

  const statCards = [
    {
      title: 'Total Pura',
      value: stats.totalTemples,
      icon: Landmark,
      color: 'bg-[#c68e51]',
      link: '/dashboard/pura',
    },
    {
      title: 'Kategori',
      value: stats.totalCategories,
      icon: Tags,
      color: 'bg-emerald-500',
      link: '/dashboard/kategori',
    },
    {
      title: 'Admin',
      value: stats.totalAdmins,
      icon: Users,
      color: 'bg-blue-500',
      link: '/dashboard/admin',
    },
  ];

  const getCategoryName = (uuid: string) => {
    return templesData.kategori_pura.find(k => k.uuid === uuid)?.nama_kategori || '-';
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-10">
        {/* Header */}
        <div className="mb-10">
          <h1 
            className="text-3xl lg:text-4xl font-bold text-[#151515]"
            style={{ fontFamily: 'Bodoni Moda, serif' }}
          >
            Dashboard
          </h1>
          <p className="text-[#888888] mt-2">
            Selamat datang kembali, berikut ringkasan data Desa Pujungan.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statCards.map((stat) => (
            <Link
              key={stat.title}
              to={stat.link}
              className="bg-white p-6 shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[#888888] text-sm mb-1">{stat.title}</p>
                  <p 
                    className="text-4xl font-bold text-[#151515]"
                    style={{ fontFamily: 'Bodoni Moda, serif' }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} w-12 h-12 flex items-center justify-center`}>
                  <stat.icon size={24} className="text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-[#c68e51] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Lihat Detail
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 shadow-md mb-10">
          <h2 
            className="text-xl font-bold text-[#151515] mb-4"
            style={{ fontFamily: 'Bodoni Moda, serif' }}
          >
            Aksi Cepat
          </h2>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/dashboard/pura/tambah"
              className="inline-flex items-center gap-2 bg-[#c68e51] text-[#151515] px-6 py-3 font-medium hover:bg-[#b07d45] transition-colors"
            >
              <Plus size={18} />
              Tambah Pura Baru
            </Link>
            <Link
              to="/dashboard/kategori/tambah"
              className="inline-flex items-center gap-2 border-2 border-[#151515] text-[#151515] px-6 py-3 font-medium hover:bg-[#151515] hover:text-white transition-colors"
            >
              <Plus size={18} />
              Tambah Kategori
            </Link>
          </div>
        </div>

        {/* Recent Temples Table */}
        <div className="bg-white shadow-md">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 
              className="text-xl font-bold text-[#151515]"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Pura Terbaru Diperbarui
            </h2>
            <Link
              to="/dashboard/pura"
              className="text-[#c68e51] text-sm font-medium hover:underline flex items-center gap-1"
            >
              Lihat Semua
              <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f8f3ec]">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#888888]">Pura</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#888888]">Kategori</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#888888]">Terakhir Diperbarui</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-[#888888]">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentTemples.map((temple) => (
                  <tr key={temple.uuid} className="border-b border-gray-100 hover:bg-[#f8f3ec]/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={temple.foto_url}
                          alt={temple.nama_pura}
                          className="w-12 h-12 object-cover"
                        />
                        <div>
                          <p className="font-medium text-[#151515]">{temple.nama_pura}</p>
                          <p className="text-xs text-[#888888] line-clamp-1">{temple.alamat}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-[#c68e51]/10 text-[#c68e51] text-xs font-medium">
                        {getCategoryName(temple.kategori_uuid)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
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
                      <Link
                        to={`/dashboard/pura/edit/${temple.uuid}`}
                        className="text-[#c68e51] hover:underline text-sm font-medium"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          <div className="bg-gradient-to-br from-[#151515] to-[#2a2a2a] p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="text-[#c68e51]" size={24} />
              <h3 
                className="text-lg font-bold"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Tips Pengelolaan
              </h3>
            </div>
            <ul className="space-y-3 text-white/70 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-[#c68e51] mt-1">•</span>
                Pastikan foto pura berkualitas tinggi untuk tampilan terbaik
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c68e51] mt-1">•</span>
                Gunakan deskripsi yang informatif dan menarik
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c68e51] mt-1">•</span>
                Perbarui informasi secara berkala untuk akurasi data
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#c68e51] mt-1">•</span>
                Koordinat lokasi harus akurat untuk peta
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="text-[#c68e51]" size={24} />
              <h3 
                className="text-lg font-bold text-[#151515]"
                style={{ fontFamily: 'Bodoni Moda, serif' }}
              >
                Pratinjau Cepat
              </h3>
            </div>
            <p className="text-[#888888] text-sm mb-4">
              Lihat bagaimana website terlihat dari sisi pengunjung.
            </p>
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center gap-2 text-[#c68e51] font-medium hover:underline"
            >
              Buka Website
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
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

export default DashboardHome;
