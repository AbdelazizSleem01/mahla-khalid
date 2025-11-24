import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className = "bg-slate-950 py-8 border-t border-slate-800 px-6" >
            <div className=" mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center space-x-3 mb-4 md:mb-0">
                        <Image width={32} height={32} src="/images/Logo.png" alt="مهله خالد" className="h-8 w-auto" />
                        <span className="text-white font-semibold">مهله خالد للتجارة</span>
                    </div>
                    <div className="text-slate-400  mb-4 md:mb-0">
                        Made with ❤️ by
                        <Link href="https://abdelaziz-sleem.vercel.app/" target="_blank" className="text-slate-400 hover:text-yellow-400 mx-2 transition-colors duration-300">
                            Abdelaziz Sleem
                        </Link>
                    </div>
                    <p className="text-slate-400 text-center md:text-right">
                        جميع الحقوق محفوظة © {new Date().getFullYear()} مهله خالد للتجارة
                    </p>
                </div>
            </div>
      </footer >
  )
}