'use client'

import { useAppStore } from '@/store/store'
import { FaBars, FaTimes, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  const { theme, setTheme } = useAppStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

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

  const navItems = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/ourServices' },
  ]

  return (
    <>
      <motion.nav
        className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-400 shadow-lg  ${scrolled
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl border-b border-blue-200 dark:border-blue-800'
          : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-b border-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className=" mx-auto px-8 w-full">
          <div className="flex items-center justify-between w-full">
            {/* Logo and Brand */}
            <motion.div
              className="flex items-center space-x-4 space-x-reverse"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="relative  dark:bg-gray-800 rounded-2xl p-2 mx-4shadow-2xl ">
                <div className="w-14 h-14 relative  rounded-xl flex items-center justify-center shadow-inner">
                  <Image
                    src="/images/logo3.jpeg"
                    alt="مهلة خالد"
                    width={52}
                    height={52}
                    className="w-12 h-12 object-contain drop-shadow-lg rounded-full"
                    priority
                  />
                </div>

              </div>

              <div className="flex flex-col text-right">
                <span className="text-lg font-bold bg-linear-to-r from-blue-600 to-blue-600 bg-clip-text text-transparent">
                  مؤسسة مهلة خالد للتجارة
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-1">
                  مركز متكامل للخدمات
                </span>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center ">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}

                  className="text-gray-800 mx-2 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-semibold transition-all duration-400 relative py-2 px-1 group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={item.href} key={item.name}
                  >{item.name}</Link>
                  <motion.div
                    className="absolute bottom-0 right-0 w-0 h-1 bg-linear-to-r from-blue-500 to-blue-500 rounded-full group-hover:w-full transition-all duration-400"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-6 space-x-reverse">
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

              {/* Theme Toggle */}
              {/* <motion.button
                className="btn  btn-circle relative overflow-hidden group mx-4"
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                title={theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-6 h-6">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: theme === 'light' ? 1 : 1.1
                    }}
                    transition={{ duration: 0.5, type: "spring" }}
                  >
                    {theme === 'light' ? (
                      <FaMoon className="text-blue-600 group-hover:text-blue-700 mx-auto pt-1" size={20} />
                    ) : (
                      <FaSun className="text-blue-400 group-hover:text-blue-400 mx-auto pt-1" size={20} />
                    )}
                  </motion.div>
                </div>
              </motion.button> */}

              {/* Contact Button */}
              <motion.a
                href="https://wa.me/+966542497637"
                target="_blank"
                className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-none shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-400 font-bold px-6 rounded-2xl"
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

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden btn btn-circle group p-2 w-12 h-12"
              onClick={toggleMenu}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="relative w-8 h-8">
                <motion.div
                  animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isMenuOpen ? (
                    <FaTimes className="text-blue-600 group-hover:text-blue-700" size={28} />
                  ) : (
                    <FaBars className="text-blue-600 group-hover:text-blue-700" size={28} />
                  )}
                </motion.div>
              </div>
            </motion.button>
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
              className="fixed top-0 right-0 h-full w-full max-w-full bg-white dark:bg-gray-900 shadow-2xl z-50 lg:hidden border-l border-blue-100 dark:border-blue-900"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
            >
              <div className="flex flex-col h-full p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8  pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-3  space-x-reverse">
                    <div className="w-14 h-14 relative bg-linear-to-br from-blue-500 to-blue-500 rounded-xl flex items-center justify-center shadow-inner">
                      <Image
                        src="/images/Logo3.png"
                        alt="مهلة خالد"
                        width={52}
                        height={52}
                        className="w-12 h-12 object-contain drop-shadow-lg rounded-full"
                        priority
                      />
                    </div>
                    <div className="flex flex-col mx-4">
                      <span className="text-lg font-bold text-gray-800 dark:text-white">
                        مهلة خالد
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        مركز متكامل للخدمات
                      </span>
                    </div>
                  </div>
                  <motion.button
                    onClick={toggleMenu}
                    className="btn blue btn-circle"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTimes size={20} className="text-blue-600" />
                  </motion.button>
                </div>

                {/* Contact Info Mobile */}
                <div className="bg-linear-to-r from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 rounded-2xl p-4 mb-6 space-y-3">
                  <div className="flex items-center    text-sm">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaPhone className="text-white text-lg" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <span className="text-gray-600 dark:text-gray-400">اتصل بنا</span>
                      <span className="font-bold text-gray-800 dark:text-white">+966542497637</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <FaMapMarkerAlt className="text-white text-lg" />
                    </div>
                    <div className="flex flex-col mr-3">
                      <span className="text-gray-600 dark:text-gray-400">الموقع</span>
                      <span className="font-bold text-gray-800 dark:text-white">المملكة العربية السعودية</span>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between py-4 px-4 text-gray-700 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-400 group border-r-4 border-transparent hover:border-blue-500 hover:shadow-lg"
                      onClick={toggleMenu}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: -5 }}
                    >
                      <span className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {item.name}
                      </span>
                      <div className="w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Actions */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                  {/* Theme Toggle */}
                  {/* <motion.button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-400 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-gray-700 dark:text-gray-400 font-semibold">
                      {theme === 'light' ? 'الوضع الليلي' : 'الوضع النهاري'}
                    </span>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {theme === 'light' ? (
                        <FaMoon className="text-blue-600 group-hover:text-blue-700 text-xl" />
                      ) : (
                        <FaSun className="text-blue-400 group-hover:text-blue-400 text-xl" />
                      )}
                    </div>
                  </motion.button> */}

                  {/* Contact Button */}
                  <motion.a
                    href="https://wa.me/+966542497637"
                    className="block w-full text-center py-4 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-400 font-bold group"
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FaPhone className="inline ml-2 group-hover:scale-110 transition-transform duration-400" />
                    تواصل معنا
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-20 lg:h-24"></div>
    </>
  )
}