"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const callbackUrl = "/dashboard";

  const [email, setEmail] = useState("admin@desapujungan.bali");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Email atau password salah");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#151515] px-4 py-12">
      <div className="absolute inset-0">
        <img src="/images/hero-temple.jpg" alt="Background" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-linear-to-br from-[#151515]/90 via-[#151515]/95 to-[#151515]" />
      </div>

      <div className="absolute left-8 top-8 z-20 hidden sm:block">
        <Link href="/" className="text-sm text-white/70 transition hover:text-white">
          ← Kembali ke Beranda
        </Link>
      </div>

      <section className="relative z-10 w-full max-w-md border border-white/10 bg-white/5 p-8 backdrop-blur-lg md:p-10">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#c68e51]/70 bg-white/90 p-1">
            <Image
              src="/images/logo-desaadat.jpeg"
              alt="Logo Desa Adat Pujungan"
              width={56}
              height={56}
              className="h-14 w-14 object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Desa Pujungan</h1>
          <p className="mt-2 text-sm text-white/60">Admin Panel Login</p>
        </header>

        {error ? <p className="mb-5 border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{error}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-white/80">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-white/20 bg-white/5 px-3 py-2 text-white placeholder:text-white/30 focus:border-[#c68e51] focus:outline-none"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@desapujungan.bali"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-white/80">
              Password
            </label>
            <div className="flex border border-white/20 bg-white/5 focus-within:border-[#c68e51]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full bg-transparent px-3 py-2 text-white placeholder:text-white/30 focus:outline-none"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="px-3 text-xs font-medium text-white/70 transition hover:text-white"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            
            <span className="text-white/40">Lupa password?</span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#c68e51] py-3 font-semibold text-[#151515] transition hover:bg-[#b07d45] disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Masuk..." : "Masuk"}
          </button>
        </form>

       
      </section>
    </main>
  );
}
