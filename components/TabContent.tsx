'use client'

import { motion } from 'framer-motion'
import {
    FaWhatsapp,
    FaExternalLinkAlt,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaCreditCard,
    FaIdCard,
    FaFileAlt,
    FaStore,
    FaQrcode,
    FaUserTie,
    FaMapPin,
    FaLandmark,
    FaComments,
    FaBusinessTime,
    FaLocationArrow,
    FaCopy,
    FaSnapchat,
    FaPhoneAlt,
    FaEnvelope
} from 'react-icons/fa'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Footer from './Footer'
import tabsConfig from '@/config/tabs.json'

interface TabContentProps {
    tabId: string
}

export default function TabContent({ tabId }: TabContentProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [copiedItem, setCopiedItem] = useState<string | null>(null)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleCopy = async (text: string, label: string) => {
        try {
            await navigator.clipboard.writeText(text.replace(/\n/g, ' '))
            setCopiedItem(label)
            setTimeout(() => setCopiedItem(null), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    const handleLinkClick = async (linkId: string) => {
        try {
            await fetch('/api/track-click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ linkId, clickType: 'link' }),
            })
        } catch (error) {
            console.error('Error tracking click:', error)
        }
    }

    const getContentIcon = (type: string, label?: string) => {
        if (label?.includes('QR')) return FaQrcode
        if (label?.includes('واتساب')) return FaWhatsapp
        if (label?.includes('موقع')) return FaMapMarkerAlt
        if (label?.includes('سناب شات')) return FaSnapchat


        switch (type) {
            case 'text':
                if (label?.includes('الراتب')) return FaMoneyBillWave
                if (label?.includes('تقرير')) return FaFileAlt
                if (label?.includes('بطاقات')) return FaCreditCard
                if (label?.includes('تعريف')) return FaIdCard
                if (label?.includes('واتساب')) return FaWhatsapp
                if (label?.includes('موقع')) return FaMapMarkerAlt
                if (label?.includes('البريد الإلكتروني')) return FaEnvelope
                if (label?.includes('مستندات')) return FaFileAlt
                if (label?.includes('الهاتف')) return FaPhoneAlt
                if (label?.includes('موظف')) return FaUserTie

                return FaFileAlt
            case 'whatsapp': return FaWhatsapp
            case 'image': return FaQrcode
            default: return FaFileAlt
        }
    }

    const getTabColor = (tabId: string) => {
        const colors: { [key: string]: string } = {
            'terms': 'from-blue-400 to-blue-500',
            'hours': 'from-blue-500 to-blue-600',
            'address': 'from-blue-500 to-blue-400',
            'locations': 'from-blue-600 to-blue-500',
            'banking': 'from-blue-500 to-blue-300',
            'contact': 'from-blue-500 to-blue-500'
        }
        return colors[tabId] || 'from-blue-500 to-blue-500'
    }

    const renderContent = (content: any, index: number) => {
        const IconComponent = getContentIcon(content.type, content.label)
        const tabColor = getTabColor(tabId)

        switch (content.type) {
            case 'text':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 shadow-lg hover:shadow-xl transition-all duration-500 border-l-4 border-blue-500"
                    >
                        <div className="absolute top-0 right-0 w-20 h-20 bg-linear-to-bl from-blue-500 to-transparent opacity-10"></div>
                        <div className="card-body p-6">
                            <div className="flex items-start space-x-4 space-x-reverse">
                                <div className={`p-3 ml-2 bg-linear-to-r ${tabColor} rounded-xl text-white shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent size={20} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="card-title text-lg font-bold text-blue-600 dark:text-black">{content.label}</h3>
                                        {(content.accountNumber || content.iban) && (
                                            <div className="flex gap-2">
                                                {content.accountNumber && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleCopy(content.accountNumber, `${content.label}-account`)}
                                                        className={`btn btn-sm  text-white ${copiedItem === `${content.label}-account` ? 'btn-success ' : 'btn bg-blue-500 border-blue-500'} hover:scale-105 transition-transform duration-200 px-3`}
                                                    >
                                                        {copiedItem === `${content.label}-account` ? (
                                                            <>
                                                                <FaCopy className="ml-1" size={12} />
                                                                تم نسخ الحساب!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaCopy className="ml-1" size={12} />
                                                                نسخ الحساب
                                                            </>
                                                        )}
                                                    </motion.button>
                                                )}
                                                {content.iban && (
                                                    <motion.button
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleCopy(content.iban, `${content.label}-iban`)}
                                                        className={`btn btn-sm  text-white ${copiedItem === `${content.label}-iban` ? 'btn-success ' : 'btn bg-blue-500 border-blue-500'} hover:scale-105 transition-transform duration-200 px-3`}
                                                    >
                                                        {copiedItem === `${content.label}-iban` ? (
                                                            <>
                                                                <FaCopy className="ml-1" size={12} />
                                                                تم نسخ الـ IBAN!
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaCopy className="ml-1" size={12} />
                                                                نسخ الـ IBAN
                                                            </>
                                                        )}
                                                    </motion.button>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-black dark:text-blue-300 text-right leading-7 text-lg whitespace-pre-line">
                                        {content.accountNumber ? content.accountNumber : content.iban ? content.iban : content.value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )

            case 'link':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={content.value}
                            target="_blank"
                            id='services'
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick(content.value)}
                            className={`group relative  overflow-hidden rounded-2xl bg-linear-to-r ${tabColor} text-white shadow-2xl hover:shadow-3xl transition-all duration-500 block`}
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                            <div className="card-body p-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="p-3 ml-2 bg-white/20 rounded-xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent size={24} />
                                        </div>
                                        <div>
                                            <span className="text-lg font-bold group-hover:underline block">{content.label}</span>
                                            <span className="text-sm opacity-90 mt-1 block ">{content.value}</span>
                                        </div>
                                    </div>
                                    <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform duration-300 ml-2" />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )

            case 'whatsapp':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={`https://wa.me/${content.value}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('whatsapp')}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-green-500 to-green-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 block"
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                            <div className="card-body p-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="p-3 ml-2 bg-white/20 rounded-xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent size={24} />
                                        </div>
                                        <div>
                                            <span className="text-lg font-bold group-hover:underline block">{content.label}</span>
                                            <span className="text-sm opacity-90 mt-1 block">{content.value}</span>
                                        </div>
                                    </div>
                                    <FaWhatsapp className="group-hover:scale-110 transition-transform duration-300 ml-2" size={24} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )

            case 'snapchat':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Link
                            href={content.value}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => handleLinkClick('snapchat')}
                            className="group relative overflow-hidden rounded-2xl bg-linear-to-r from-yellow-400 to-yellow-500 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 block"
                        >
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                            <div className="card-body p-6 relative z-10">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 space-x-reverse">
                                        <div className="p-3 ml-2 bg-white/20 rounded-xl backdrop-blur-sm transform group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent size={24} />
                                        </div>
                                        <div>
                                            <span className="text-lg font-bold group-hover:underline block">{content.label}</span>
                                            <span className="text-sm opacity-90 mt-1 block">اضغط للتواصل عبر سناب شات</span>
                                        </div>
                                    </div>
                                    <IconComponent className="group-hover:scale-110 transition-transform duration-300 ml-2" size={24} />
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )

            case 'image':
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 shadow-xl border border-blue-500 dark:border-blue-500"
                    >
                        <div className="card-body p-6">
                            <div className="flex items-center space-x-3 space-x-reverse mb-4">
                                <div className={`p-3 ml-2 bg-linear-to-r ${tabColor} rounded-xl text-white shadow-lg`}>
                                    <IconComponent size={18} />
                                </div>
                                {content.label && (
                                    <h3 className="card-title text-blue-600 dark:text-black text-lg font-bold">{content.label}</h3>
                                )}
                            </div>
                            <div className="flex justify-center">
                                <motion.img
                                    src={content.value}
                                    alt={content.label}
                                    className="rounded-xl shadow-lg border-4 border-blue-100 dark:border-blue-600 max-w-full h-auto max-h-80  transform group-hover:scale-105 transition-transform duration-500"
                                    whileHover={{ scale: 1.05 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )

            case 'map':
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-blue-50 to-blue-50 dark:from-blue-900/20 dark:to-blue-900/20 shadow-xl border border-blue-500 dark:border-blue-500"
                    >
                        <div className="card-body p-0">
                            <div className="flex items-center space-x-3 space-x-reverse p-6 pb-4">
                                <div className={`p-3 ml-2 bg-linear-to-r ${tabColor} rounded-xl text-white shadow-lg`}>
                                    <FaMapMarkerAlt size={18} />
                                </div>
                                {content.label && (
                                    <h3 className="card-title text-blue-600 dark:text-black text-lg font-bold">{content.label}</h3>
                                )}
                            </div>
                            <div className="h-80 w-full relative">
                                {isMounted && (
                                    <>
                                        <iframe
                                            src={content.value}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 'none' }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="rounded-b-2xl"
                                        />

                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )

            default:
                return null
        }
    }

    const tab = tabsConfig.tabs.find(t => t.id === tabId)

    if (!tab) {
        return (
            <>
                <div className="w-full max-w-7xl mx-auto p-4 mb-12 mt-6">
                    <h1 className="text-center text-2xl font-bold">Tab not found</h1>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <div className="w-full max-w-7xl mx-auto p-4 mb-12 mt-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, type: "spring", stiffness: 500 }}
                    className="space-y-6"
                >
                    {tab.content.map((content, index) => (
                        <div key={index}>
                            {renderContent(content, index)}
                        </div>
                    ))}
                </motion.div>
            </div>
            <Footer />
        </>
    )
}
