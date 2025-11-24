'use client'

import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {



  const pathname = usePathname();


  const hideNavbarOn = ['/ourServices'];

  const shouldHideNavbar = hideNavbarOn.includes(pathname);
  return (
    <div className="min-h-screen bg-base-100" data-theme="light">
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  )
}