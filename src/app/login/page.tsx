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
      router.push("/app");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-snow relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-gold/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-platinum/50 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-md p-8 bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)]">
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
              <p className="mt-2 text-sm text-red-500 animate-pulse">{error}</p>
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
    </div>
  );
}
