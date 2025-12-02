'use client'

import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/ourServices' },
  ]

  return (
    <>
      <motion.nav
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-400 shadow-lg ${
          scrolled
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-blue-200 dark:border-blue-800'
            : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between w-full">
            {/* Logo and Brand */}
            <motion.div
              className="flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative ml-2 dark:bg-gray-800 rounded-2xl p-1 sm:p-2 shadow-2xl">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 relative rounded-xl flex items-center justify-center shadow-inner">
                  <Image
                    src="/images/logo3.jpeg"
                    alt="مهلة خالد"
                    width={56}
                    height={56}
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain drop-shadow-lg rounded-full"
                    priority
                  />
                </div>
              </div>

              <div className="flex flex-col text-right">
                <span className="text-sm sm:text-base md:text-lg font-bold bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  مؤسسة مهلة خالد للتجارة
                </span>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mt-0.5">
                  مركز متكامل للخدمات
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  className="relative"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    href={item.href}
                    className="text-gray-800 mx-2 px-3 py-2 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-400 relative group block"
                  >
                    {item.name}
                    <motion.div
                      className="absolute bottom-0 right-0 w-0 h-1 bg-linear-to-r from-blue-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-400"
                      whileHover={{ width: '100%' }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              {/* Contact Info */}
              <div className="hidden xl:flex items-center space-x-4 space-x-reverse text-sm">
                <div className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-400">
                  <FaPhone className="text-blue-500 text-lg" />
                  <span className="font-medium">+966542497637</span>
                </div>
                <div className="w-px h-6 bg-gray-400 dark:bg-gray-600"></div>
                <div className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-400">
                  <FaMapMarkerAlt className="text-blue-500 text-lg" />
                  <span className="font-medium">المملكة العربية السعودية</span>
                </div>
              </div>

              {/* Contact Button */}
              <motion.a
                href="https://wa.me/+966542497637"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-400 font-bold px-4 py-2 md:px-6 rounded-2xl text-sm md:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FaPhone className="ml-2" />
                تواصل معنا
              </motion.a>
            </div>

            {/* Mobile Contact Button - Visible on small screens */}
            <div className="flex lg:hidden items-center ">
              <motion.a
                href="https://wa.me/+966542497637"
                target="_blank"
                rel="noopener noreferrer"
                className="btn bg-linear-to-r ml-2 from-blue-500 to-blue-600 text-white border-none shadow-lg px-3 py-2 rounded-xl text-xs font-bold"
                whileTap={{ scale: 0.95 }}
              >
                <FaPhone className="text-xs " />
                <span className="hidden xs:inline">اتصل</span>
              </motion.a>

              {/* Mobile Menu Button */}
              <motion.button
                className="btn btn-circle group p-2 w-10 h-10"
                onClick={toggleMenu}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="relative w-6 h-6">
                  <motion.div
                    animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isMenuOpen ? (
                      <FaTimes className="text-blue-600 group-hover:text-blue-700" size={24} />
                    ) : (
                      <FaBars className="text-blue-600 group-hover:text-blue-700" size={24} />
                    )}
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />

            {/* Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden border-l border-blue-100 dark:border-blue-900 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              <div className="flex flex-col h-full w-full p-4 sm:p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 ml-3 relative bg-linear-to-br from-blue-500 to-blue-500 rounded-xl flex items-center justify-center shadow-inner">
                      <Image
                        src="/images/logo3.jpeg"
                        alt="مهلة خالد"
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain drop-shadow-lg rounded-full"
                        priority
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-base font-bold text-gray-800 dark:text-white">
                        مؤسسة مهلة خالد
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        مركز متكامل للخدمات
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={toggleMenu}
                    className="btn btn-circle w-10 h-10"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes size={18} className="text-blue-600" />
                  </motion.button>
                </div>

                {/* Contact Info Mobile */}
                <div className="bg-linear-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 rounded-2xl p-4 mb-6 space-y-3">
                  <div className="flex items-center text-sm">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">اتصل بنا</span>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">+966542497637</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <span className="text-gray-600 dark:text-gray-400 text-xs">الموقع</span>
                      <span className="font-bold text-gray-800 dark:text-white text-sm">المملكة العربية السعودية</span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className="flex items-center justify-between py-3 px-4 text-gray-700 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-400 group border-r-4 border-transparent hover:border-blue-500 hover:shadow-lg"
                        onClick={handleLinkClick}
                      >
                        <span className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 text-sm">
                          {item.name}
                        </span>
                        <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {/* Contact Button */}
                  <motion.a
                    href="https://wa.me/+966542497637"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-400 font-bold group text-sm"
                    onClick={handleLinkClick}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="inline ml-2 group-hover:scale-110 transition-transform duration-400" />
                    تواصل معنا عبر الواتساب
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16 sm:h-20 lg:h-24"></div>
    </>
  )
}