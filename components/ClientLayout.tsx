'use client'

import { useAppStore } from '@/store/store'
import { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import { usePathname } from 'next/navigation'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useAppStore()

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])


  const pathname = usePathname();


  const hideNavbarOn = ['/ourServices'];

  const shouldHideNavbar = hideNavbarOn.includes(pathname);
  return (
    <div className="min-h-screen bg-base-100">
      {!shouldHideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  )
}