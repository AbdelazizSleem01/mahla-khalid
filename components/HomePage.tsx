'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  FaStar,
  FaHeart,
  FaMap,
  FaCreditCard,
  FaCalculator,
  FaMobile,
  FaPhone,
  FaWhatsapp,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
  FaChevronDown,
  FaSnapchat
} from 'react-icons/fa'
import HomeNavbar from './HomeNavbar'
import Link from 'next/link'
import Image from 'next/image'
import Footer from './Footer'

interface PageData {
  sections: Array<{
    id: string
    type: string
    content: any
  }>
}

export default function HomePage() {
  const [pageData, setPageData] = useState<PageData | null>(null)

  useEffect(() => {
    fetch('/page-content.json')
      .then(res => res.json())
      .then(data => setPageData(data))
      .catch(err => console.error('Failed to load page data:', err))
  }, [])

  const getServiceIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'credit-card': FaCreditCard,
      'calculator': FaCalculator,
      'smartphone': FaMobile
    }
    return icons[iconName] || FaCreditCard
  }

  const getFeatureIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      'star': FaStar,
      'heart': FaHeart,
      'map': FaMap
    }
    return icons[iconName] || FaStar
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'whatsapp': return FaWhatsapp
      case 'phone': return FaPhone
      case 'snapchat': return FaSnapchat
      default: return FaPhone
    }
  }

  if (!pageData) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 w-full">
      <HomeNavbar />

      {/* Hero Section */}
      {pageData.sections.find(s => s.type === 'hero') && (
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden ">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 bg-[url('/images/background.jpg')] bg-cover bg-center opacity-10"></div>
            <div className="absolute inset-0 bg-linear-to-b from-black/30 to-black/70"></div>
          </div>

          <div className=" mx-auto px-4 mt-12 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.h1
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              >
                مهله خالد للتجارة
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-yellow-400 font-semibold mb-6"
              >
                شركة متخصصة في بيع البطاقات والكروت مسبقة الدفع بجميع أنواعها
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg sm:text-xl text-slate-300 mb-12 max-w-2xl mx-auto"
              >
                نقدم أفضل الخدمات والجودة العالية لعملائنا الراغبين في التعامل مع البطاقات والكروت التجارية
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg shadow-xl flex items-center justify-center space-x-2"
                >
                  <span>خدماتنا</span>
                  <FaArrowRight />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <FaPhone />
                  <span>تواصل معنا</span>
                </motion.button>
              </motion.div>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-yellow-400"
            >
              <FaChevronDown size={24} className="sm:size-8" />
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Services Section */}
      {pageData.sections.find(s => s.type === 'services') && (
        <section id="services" className="py-20 bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">خدماتنا</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                نقدم مجموعة متكاملة من الخدمات بأعلى مستويات الجودة والموثوقية
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pageData.sections.find(s => s.type === 'services')?.content.services.map((service: any, index: number) => {
                const ServiceIcon = getServiceIcon(service.icon)
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-slate-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-600 hover:border-yellow-500 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-400 transition-colors duration-300"
                    >
                      <ServiceIcon className="text-slate-900" size={28} />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                    <p className="text-slate-400 mb-6 leading-relaxed">{service.description}</p>

                    <div className="space-y-3">
                      {service.features.map((feature: string, featureIndex: number) => (
                        <motion.div
                          key={feature}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
                          className="flex items-center space-x-3"
                        >
                          <FaCheckCircle className="text-yellow-500 shrink-0" size={16} />
                          <span className="text-slate-300 text-right">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Branches Section */}
      {pageData.sections.find(s => s.type === 'branches') && (
        <section id="branches" className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">فروعنا</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                موجودون في أكثر من موقع لنخدم عامت عملائنا في جميع أرجاء المنطقة
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {pageData.sections.find(s => s.type === 'branches')?.content.branches.map((branch: any, index: number) => (
                <motion.div
                  key={branch.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-700 hover:border-yellow-500 transition-all duration-300"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center">
                      <Image width={48} height={48} src={branch.image} alt={branch.name} className="w-12 h-12 object-contain rounded-lg" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{branch.name}</h3>
                      <p className="text-yellow-400 font-medium">{branch.manager}</p>
                    </div>
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed">{branch.address}</p>

                  <div className="flex space-x-4 mb-6">
                    <motion.a
                      href={`https://wa.me/${branch.phone.replace('+', '')}`}
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg text-center transition-colors duration-300 flex items-center justify-center space-x-2"
                    >
                      <FaWhatsapp size={16} />
                      <span>واتس اب</span>
                    </motion.a>
                  </div>

                  <div className="h-48 w-full rounded-xl overflow-hidden border border-slate-600">
                    <iframe
                      src={branch.map}
                      width="100%"
                      height="100%"
                      style={{ border: 'none' }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      {pageData.sections.find(s => s.type === 'about') && (
        <section id="about" className="py-20 bg-slate-800">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">من نحن</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                تعرف أكثر على شركتنا وخدماتنا المتميزة
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <h3 className="text-3xl font-bold text-white mb-6">شركة مهله خالد للتجارة</h3>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  {pageData.sections.find(s => s.type === 'about')?.content.description}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <img src="/images/Logo.png" alt="مهله خالد" className="w-full max-w-md mx-auto" />
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {pageData.sections.find(s => s.type === 'about')?.content.stats.map((stat: any, index: number) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-700 p-6 rounded-xl text-center border border-slate-600 hover:border-yellow-500 transition-colors duration-300"
                >
                  <div className="text-4xl font-bold text-yellow-500 mb-2">
                    {stat.number}<span className="text-yellow-400">{stat.suffix}</span>
                  </div>
                  <div className="text-slate-300">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pageData.sections.find(s => s.type === 'about')?.content.features.map((feature: any, index: number) => {
                const FeatureIcon = getFeatureIcon(feature.icon)
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-slate-700 p-6 rounded-xl text-center border border-slate-600 hover:border-yellow-500 transition-all duration-300 group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="bg-yellow-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-slate-900 group-hover:bg-yellow-400 transition-colors duration-300"
                    >
                      <FeatureIcon size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-slate-400">{feature.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      {pageData.sections.find(s => s.type === 'contact') && (
        <section id="contact" className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">تواصل معنا</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                نحن هنا للمساعدة والإجابة على استفساراتكم
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageData.sections.find(s => s.type === 'contact')?.content.contacts.map((contact: any, index: number) => {
                  const ContactIcon = getContactIcon(contact.type)
                  return (
                    <motion.div
                      key={contact.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-slate-800 p-6 rounded-xl shadow-xl border border-slate-700 hover:border-yellow-500 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className={`p-3 rounded-lg ${contact.type === 'whatsapp' ? 'bg-green-500' :
                            contact.type === 'phone' ? 'bg-blue-500' : 'bg-yellow-500'
                            } text-white`}
                        >
                          <ContactIcon size={20} />
                        </motion.div>

                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-2">{contact.label}</h3>
                          <p className="text-slate-400 mb-4">{contact.description}</p>

                          {contact.type === 'whatsapp' && (
                            <Link
                              href={`https://wa.me/${contact.value.replace('+', '')}`}
                              target="_blank"
                              className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                            >
                              ابدأ المحادثة
                            </Link>
                          )}

                          {contact.type === 'phone' && (
                            <Link
                              href={`tel:${contact.value}`}
                              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                            >
                              اتصل الآن
                            </Link>
                          )}

                          {contact.type === 'snapchat' && (
                            <Link
                              href={contact.value}
                              target="_blank"
                              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                            >
                              تابعنا على سناب شات
                            </Link>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hours Section */}
      {pageData.sections.find(s => s.type === 'hours') && (
        <section className="py-12 bg-slate-800 border-t border-slate-700">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto"
            >
              <div className="flex items-center justify-center mb-8">
                <FaClock className="text-yellow-400 ml-3" size={24} />
                <h3 className="text-2xl font-bold text-white">أوقات العمل</h3>
              </div>

              <div className="space-y-4">
                {pageData.sections.find(s => s.type === 'hours')?.content.schedules.map((schedule: any, index: number) => (
                  <motion.div
                    key={schedule.days}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center bg-slate-700 p-4 rounded-lg"
                  >
                    <span className="text-white font-medium">{schedule.days}</span>
                    <span className="text-yellow-400 font-semibold">{schedule.hours}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}
