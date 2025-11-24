'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FaBars,
  FaTimes,
  FaPhone,
  FaWhatsapp
} from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'

interface NavbarData {
  logo: string
  links: Array<{
    name: string
    href: string
  }>
}

export default function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [navbarData, setNavbarData] = useState<NavbarData | null>(null)

  useEffect(() => {
    fetch('/page-content.json')
      .then(res => res.json())
      .then(data => setNavbarData(data.navbar))
      .catch(err => console.error('Failed to load navbar data:', err))

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    try {
      if (href === '/') {
        window.location.href = '/'
        return
      }

      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } catch (error) {
      console.warn('Could not scroll to section:', href, error)
    }
    setIsOpen(false)
  }

  if (!navbarData) {
    return (
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full z-50 bg-slate-900 backdrop-blur-xl border-b border-slate-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="w-32 h-8 bg-slate-700 animate-pulse rounded"></div>
            <div className="flex space-x-4">
              <div className="w-16 h-8 bg-slate-700 animate-pulse rounded"></div>
              <div className="w-16 h-8 bg-slate-700 animate-pulse rounded"></div>
            </div>
          </div>
        </div>
      </motion.nav>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full  overflow-hidden z-50 transition-all duration-500 ${isScrolled
        ? 'bg-slate-900/50 backdrop-blur-xl border-b b border-slate-700 shadow-xl'
        : 'bg-slate-900 '
        }`}
    >
      <div className=" mx-auto px-4 sm:px-6 py-7">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <Image
              width={32}
              height={32}
              src={navbarData.logo}
              alt="مهله خالد للتجارة"
              className="h-8 sm:h-10 w-auto"
            />
            <span className="text-lg sm:text-xl font-bold text-white">مؤسسة مهله خالد للتجارة</span>
          </motion.div>

          <div className="hidden lg:flex items-center space-x-7 mx-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white hover:text-yellow-400 transition-colors duration-300 text-base xl:text-lg font-medium relative group"
            >
              <Link href="/">
                الرئيسية
              </Link>
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"
                whileHover={{ width: '100%' }}
              />
            </motion.button>
            {navbarData.links.map((link) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-yellow-400 transition-colors duration-300 text-base xl:text-lg font-medium relative group"
              >
                <Link href={link.href}>{link.name}</Link>
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"
                  whileHover={{ width: '100%' }}
                />
              </motion.button>
            ))}
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">

            {/* Contact Buttons */}
            <div className="flex items-center space-x-3 ml-4">
              <motion.a
                href="https://wa.me/966542497637"
                target="_blank"
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp size={14} className="sm:size-4" />
                <span className="hidden sm:inline text-sm">واتس اب</span>
              </motion.a>
              <motion.a
                href="tel:+966542497637"
                className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone size={14} className="sm:size-4" />
                <span className="hidden sm:inline text-sm">اتصل بنا</span>
              </motion.a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white hover:text-yellow-400 transition-colors p-2"
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-slate-800 rounded-lg mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-2 p-4">
                {navbarData.links.map((link) => (
                  <motion.button
                    key={link.name}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-200 hover:text-yellow-400 transition-colors duration-300 text-right py-3 px-4 border-b border-slate-700 last:border-b-0"
                  >
                    {link.name}
                  </motion.button>
                ))}

                {/* Mobile Contact Buttons */}
                <div className="flex flex-col sm:flex-row sm:space-x-2 space-y-2 sm:space-y-0 mt-4 pt-4 border-t border-slate-700">
                  <motion.a
                    href="https://wa.me/966542497637"
                    target="_blank"
                    className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-colors duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaWhatsapp size={16} />
                    <span>واتس اب</span>
                  </motion.a>
                  <motion.a
                    href="tel:+966542497637"
                    className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-colors duration-300"
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaPhone size={16} />
                    <span>اتصل بنا</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
