"use client";

import { useState } from "react";
import { loginAction } from "../../actions/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData();
    formData.append("password", password);
    
    const result = await loginAction(null, formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else if (result?.success) {
      setIsTransitioning(true);
      setTimeout(() => {
        router.push("/app");
        router.refresh();
      }, 600);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-snow relative overflow-hidden p-4 sm:p-8">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-platinum/50 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
             <Image 
               src="/logo.png" 
               alt="CITILEX ASIA Logo" 
               width={180} 
               height={60} 
               className="object-contain"
               priority
               style={{ width: "auto", height: "auto" }}
             />
          </div>
          <h1 className="text-3xl font-heading font-bold text-brand-onyx mb-2">WORKSPACE</h1>
          <p className="text-brand-onyx/60 text-sm">Enter your designated quote to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-5 py-4 bg-white/50 border border-brand-platinum rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent transition-all duration-300 backdrop-blur-sm text-brand-onyx placeholder-brand-onyx/40 shadow-inner group-hover:bg-white/80 pr-12"
                placeholder="Enter quote..."
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-onyx/50 hover:text-brand-onyx transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 animate-pulse text-center">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-brand-onyx hover:bg-black text-brand-gold-light font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 text-brand-gold-light" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span>Unlock Access</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-brand-onyx/40">Secure Area &copy; {new Date().getFullYear()} CITILEX ASIA</p>
        </div>
      </div>

      {/* Full-Screen Login Transition Overlay */}
      {isTransitioning && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-md"
          style={{
            background: 'rgba(26, 29, 37, 0.95)',
            animation: 'fadeIn 0.3s ease-out forwards',
          }}
        >
          {/* Inject keyframes */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes zoomIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
            @keyframes spinSlow { to { transform: rotate(360deg); } }
            @keyframes spinReverse { to { transform: rotate(-360deg); } }
            @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
          `}} />

          {/* Subtle dot pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div
            className="relative flex flex-col items-center gap-8"
            style={{ animation: 'zoomIn 0.5s ease-out 0.1s forwards', opacity: 0 }}
          >
            {/* Logo */}
            <img
              src="/login-logout.png"
              alt="Logo"
              className="h-10 w-auto"
              style={{ opacity: 0.85 }}
            />

            {/* Double-ring spinner */}
            <div className="relative h-14 w-14">
              <div className="absolute inset-0 rounded-full border-2 border-white/[0.08]" />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent"
                style={{
                  borderTopColor: '#b8975a',
                  animation: 'spinSlow 0.8s linear infinite'
                }}
              />
              <div
                className="absolute inset-2 rounded-full border-2 border-transparent"
                style={{
                  borderBottomColor: 'rgba(255,255,255,0.2)',
                  animation: 'spinReverse 1.2s linear infinite'
                }}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm font-medium tracking-wide" style={{ color: 'rgba(255,255,255,0.85)' }}>
                Signing you in...
              </span>
              <span
                className="text-xs"
                style={{ color: 'rgba(255,255,255,0.35)', animation: 'pulse 2s ease-in-out infinite' }}
              >
                Preparing your workspace ✨
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
