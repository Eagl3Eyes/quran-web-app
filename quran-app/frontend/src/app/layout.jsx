import { Inter, Amiri, Noto_Naskh_Arabic, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import { SettingsProvider } from "@/context/SettingsContext";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter" });
const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-amiri" });
const notoArabic = Noto_Naskh_Arabic({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-noto-arabic" });
const notoBengali = Noto_Serif_Bengali({ subsets: ["bengali"], weight: ["400", "600"], variable: "--font-noto-bengali" });

export const metadata = {
  title: "Quran Web Application",
  description: "Read, study, and search the Holy Quran with high-quality translations natively built in.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${amiri.variable} ${notoArabic.variable} ${notoBengali.variable} font-sans antialiased text-emerald-950 bg-[#FDFCFA] relative overflow-x-hidden`}>
        {/* Animated Background Layers */}
        <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
          {/* Subtle Radial Glows */}
          <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-emerald-500/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-full h-full bg-amber-400/5 blur-[100px] rounded-full"></div>
          
          {/* Floating "Noor" Particles */}
          <div className="noor-particle w-4 h-4 top-[20%] left-[15%]" style={{ animationDelay: '0s' }}></div>
          <div className="noor-particle w-6 h-6 top-[60%] left-[80%]" style={{ animationDelay: '2s' }}></div>
          <div className="noor-particle w-3 h-3 top-[80%] left-[30%]" style={{ animationDelay: '4s' }}></div>
          <div className="noor-particle w-5 h-5 top-[10%] left-[90%]" style={{ animationDelay: '1s' }}></div>

          {/* Mihrab / Mosque Dome SVG Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <svg width="800" height="1000" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[120vw] h-[120vh] md:w-[80vw] md:h-[100vh]">
              <path 
                className="mihrab-path"
                d="M10 120 V50 C10 20 50 -10 90 50 V120" 
                stroke="#065f46" 
                strokeWidth="0.5" 
                vectorEffect="non-scaling-stroke"
              />
              <path 
                className="mihrab-path"
                d="M0 120 V60 C0 30 50 0 100 60 V120" 
                stroke="#065f46" 
                strokeWidth="0.2" 
                vectorEffect="non-scaling-stroke"
                style={{ animationDelay: '0.5s' }}
              />
            </svg>
          </div>

          {/* Geometric Pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23065f46' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundAttachment: 'fixed',
            backgroundSize: '150px'
          }}></div>
        </div>

        <SettingsProvider>
          <div className="min-h-screen flex flex-col relative z-10">
            {children}
          </div>
        </SettingsProvider>
      </body>
    </html>
  );
}
