import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'


export const metadata: Metadata = {
  title: 'مؤسسة مهله خالد للتجارة',
  description: 'روابط ومعلومات مهمة',
}


export default function RootLayout({

  children,
}: {
  children: React.ReactNode

}) {
  return (
    <html lang="ar" dir="rtl" data-theme="light">
      <head >
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />

      </head>
      <body >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}