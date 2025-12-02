import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'مؤسسة مهله خالد للتجارة',
  description: 'مؤسسة مهله خالد للتجارة - روابط ومعلومات مهمة للتواصل والتعامل مع المؤسسة',
  keywords: ['مهله خالد', 'التجارة', 'مؤسسة', 'روابط', 'معلومات', 'تواصل'],
  authors: [{ name: 'مؤسسة مهله خالد للتجارة' }],
  creator: 'مؤسسة مهله خالد للتجارة',
  publisher: 'مؤسسة مهله خالد للتجارة',
  
  openGraph: {
    type: 'website',
    url: 'https://mahla-khalid-com.vercel.app/',
    title: 'مؤسسة مهله خالد للتجارة',
    description: 'مؤسسة مهله خالد للتجارة - روابط ومعلومات مهمة للتواصل والتعامل مع المؤسسة',
    siteName: 'مؤسسة مهله خالد للتجارة',
    images: [
      {
        url: '/images/Logo.png', 
        width: 1200,
        height: 630,
        alt: 'مؤسسة مهله خالد للتجارة',
      },
    ],
    locale: 'ar_AR',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'مؤسسة مهله خالد للتجارة',
    description: 'مؤسسة مهله خالد للتجارة - روابط ومعلومات مهمة للتواصل والتعامل مع المؤسسة',
    images: ['/images/Logo.png'], 
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

 

  alternates: {
    canonical: 'https://mahla-khalid-com.vercel.app/',
    languages: {
      'ar': 'https://mahla-khalid-com.vercel.app/',
    },
  },

  category: 'business',
  classification: 'تجارة وأعمال',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}