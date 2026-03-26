import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(formData.email, formData.password);

    if (success) {
      navigate('/dashboard');
    } else {
      setError('Email atau password salah. Gunakan demo: admin@desapujungan.bali / admin123');
    }

    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className="min-h-screen bg-[#151515] flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/hero-temple.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#151515]/90 via-[#151515]/95 to-[#151515]" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 border border-[#c68e51]/20 rounded-full animate-pulse" />
      <div className="absolute bottom-20 right-20 w-48 h-48 border border-[#c68e51]/10 rounded-full" />
      <div className="absolute top-1/2 left-10 w-2 h-2 bg-[#c68e51]/40 rounded-full" />
      <div className="absolute top-1/3 right-16 w-3 h-3 bg-[#c68e51]/30 rounded-full" />

      {/* Back Button */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Kembali ke Beranda</span>
        </Link>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <path
                  d="M20 2L4 12V28L20 38L36 28V12L20 2Z"
                  stroke="#c68e51"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M20 8L10 14V26L20 32L30 26V14L20 8Z"
                  stroke="#c68e51"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="20" cy="20" r="4" fill="#c68e51" />
              </svg>
            </div>
            <h1 
              className="text-2xl md:text-3xl font-bold text-white"
              style={{ fontFamily: 'Bodoni Moda, serif' }}
            >
              Desa Pujungan
            </h1>
            <p className="text-white/60 text-sm mt-2">Admin Panel Login</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80 text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" 
                />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@desapujungan.bali"
                  className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-[#c68e51] focus:ring-[#c68e51]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80 text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" 
                />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="pl-10 pr-10 bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-none focus:border-[#c68e51] focus:ring-[#c68e51]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                  }
                  className="border-white/30 data-[state=checked]:bg-[#c68e51] data-[state=checked]:border-[#c68e51]"
                />
                <Label 
                  htmlFor="rememberMe" 
                  className="text-white/60 text-sm cursor-pointer"
                >
                  Ingat saya
                </Label>
              </div>
              <Link
                to="#"
                className="text-[#c68e51] text-sm hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#c68e51] hover:bg-[#b07d45] text-[#151515] font-medium py-6 rounded-none transition-all duration-300"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-[#151515] border-t-transparent rounded-full animate-spin" />
                  Masuk...
                </span>
              ) : (
                'Masuk'
              )}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-[#c68e51]/10 border border-[#c68e51]/30">
            <p className="text-[#c68e51] text-xs text-center">
              <strong>Demo Credentials:</strong><br />
              Email: admin@desapujungan.bali<br />
              Password: admin123
            </p>
          </div>

          {/* Footer */}
          <p className="text-center text-white/40 text-sm mt-6">
            &copy; {new Date().getFullYear()} Desa Pujungan. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
