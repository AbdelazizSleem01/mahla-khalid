'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/store'
import {
    FaSync,
    FaEye,
    FaMousePointer,
    FaGlobe,
    FaUser,
    FaLink,
    FaMapMarkerAlt,
    FaDesktop,
    FaChrome,
    FaCalendarAlt,
    FaShieldAlt,
    FaKey,
    FaClock
} from 'react-icons/fa'
import { motion } from 'framer-motion'
import Swal from 'sweetalert2'

interface AnalyticsData {
    totalVisits: number
    totalClicks: number
    totalTabs: number
    clicksPerLink: Array<{ _id: string; count: number }>
    clicksPerTab: Array<{ _id: string; count: number }>
    topCountries: Array<{ _id: string; count: number }>
    recentVisits: Array<any>
}

export default function AdminDashboard() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [visitsPage, setVisitsPage] = useState(1)
    const { adminSession } = useAppStore()

    useEffect(() => {
        fetchAnalytics()
        const interval = setInterval(fetchAnalytics, 30000)
        return () => clearInterval(interval)
    }, [])

    const fetchAnalytics = async () => {
        try {
            setRefreshing(true)
            const response = await fetch('/api/analytics', {
                headers: {
                    Authorization: `Bearer ${adminSession.token}`,
                },
            })

            if (response.ok) {
                const data = await response.json()
                setAnalytics(data)
            }
        } catch (error) {
            console.error('Analytics fetch error:', error)
        } finally {
            setRefreshing(false)
        }
    }

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/admin/update-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                    token: adminSession.token,
                }),
            })

            if (response.ok) {
                Swal.fire({
                    title: 'نجح',
                    text: 'تم تحديث كلمة المرور بنجاح',
                    icon: 'success',
                    confirmButtonText: 'موافق'
                })
                setCurrentPassword('')
                setNewPassword('')
            } else {
                const error = await response.json()
                Swal.fire({
                    title: 'خطأ',
                    text: error.error || 'فشل في تحديث كلمة المرور',
                    icon: 'error',
                    confirmButtonText: 'موافق'
                })
            }
        } catch (error) {
            console.error('Password update error:', error)
            Swal.fire({
                title: 'خطأ',
                text: 'فشل في تحديث كلمة المرور',
                icon: 'error',
                confirmButtonText: 'موافق'
            })
        } finally {
            setLoading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getCountryName = (code: string) => {
        const countryNames: { [key: string]: string } = {
            'SA': 'السعودية',
            'AE': 'الإمارات',
            'EG': 'مصر',
            'QA': 'قطر',
            'KW': 'الكويت',
            'BH': 'البحرين',
            'OM': 'عمان',
            'JO': 'الأردن',
            'LB': 'لبنان',
            'US': 'الولايات المتحدة',
            'GB': 'المملكة المتحدة',
            'FR': 'فرنسا',
            'DE': 'ألمانيا',
            'IT': 'إيطاليا',
            'ES': 'إسبانيا',
            'CA': 'كندا',
            'MX': 'المكسيك',
            'BR': 'البرازيل',
            'IN': 'الهند',
            'ID': 'اندونيسيا',
            'CN': 'الصين',
            'JP': 'اليابان',
            'KR': 'كوريا الجنوبية',
            'RU': 'روسيا',
            'TR': 'تركيا',
            'IR': 'ايران',
            'PK': 'باكستان',
            'AF': 'افغانستان',
            'MY': 'ماليزيا',
            'VN': 'فيتنام',
            'TH': 'تايلاند',
            'PH': 'الفلبين',
            'SG': 'سنغافورة',
            'HK': 'هونغ كونغ',
            'TW': 'تايوان',
            'Unknown': 'غير معروف'
        }
        return countryNames[code] || code
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    لوحة التحكم
                </h1>
                <motion.button
                    onClick={fetchAnalytics}
                    className="btn btn-outline btn-sm border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={refreshing}
                >
                    <FaSync className={`ml-2 ${refreshing ? 'animate-spin' : ''}`} />
                    {refreshing ? 'جاري التحديث...' : 'تحديث البيانات'}
                </motion.button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <motion.div
                    className="stat bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="stat-figure text-blue-500">
                        <FaEye className="text-2xl" />
                    </div>
                    <div className="stat-title text-blue-600">إجمالي الزيارات</div>
                    <div className="stat-value text-blue-700">{analytics?.totalVisits || 0}</div>
                </motion.div>

                <motion.div
                    className="stat bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="stat-figure text-green-500">
                        <FaMousePointer className="text-2xl" />
                    </div>
                    <div className="stat-title text-green-600">إجمالي النقرات</div>
                    <div className="stat-value text-green-700">{analytics?.totalClicks || 0}</div>
                </motion.div>

                <motion.div
                    className="stat bg-linear-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 rounded-2xl shadow-lg border border-cyan-200 dark:border-cyan-700"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="stat-figure text-cyan-500">
                        <FaShieldAlt className="text-2xl" />
                    </div>
                    <div className="stat-title text-cyan-600">نقرات التبويبات</div>
                    <div className="stat-value text-cyan-700">{analytics?.totalTabs || 0}</div>
                </motion.div>

                <motion.div
                    className="stat bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="stat-figure text-purple-500">
                        <FaGlobe className="text-2xl" />
                    </div>
                    <div className="stat-title text-purple-600">الدولة الأكثر زيارة</div>
                    <div className="stat-value text-lg text-purple-700">
                        {analytics?.topCountries[0] ? getCountryName(analytics.topCountries[0]._id) : 'غير معروف'}
                    </div>
                    <div className="stat-desc text-purple-600">
                        {analytics?.topCountries[0]?.count || 0} زيارة
                    </div>
                </motion.div>

                <motion.div
                    className="stat bg-linear-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl shadow-lg border border-orange-200 dark:border-orange-700"
                    whileHover={{ scale: 1.02 }}
                >
                    <div className="stat-figure text-orange-500">
                        <FaUser className="text-2xl" />
                    </div>
                    <div className="stat-title text-orange-600">الحالة</div>
                    <div className="stat-value text-sm text-orange-700">مدير</div>
                    <div className="stat-desc text-orange-600">نشط</div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Clicks by Link */}
                <motion.div
                    className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white">
                            <FaLink className="ml-2 text-blue-600" />
                            النقرات حسب الرابط
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full ">
                                <thead >
                                    <tr className='flex justify-between'>
                                        <th>الرابط</th>
                                        <th>عدد النقرات</th>
                                    </tr>
                                </thead>
                                <tbody >
                                    {analytics?.clicksPerLink.filter(item => !item._id.includes('maps')).map((item) => (
                                        <tr key={item._id} className='flex justify-between '>
                                            <td className="max-w-xs truncate font-medium">
                                                {item._id}
                                            </td>
                                            <td>
                                                <span className="badge bg-blue-500 text-white badge-lg">
                                                    {item.count}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* Clicks by Tab */}
                <motion.div
                    className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white">
                            <FaShieldAlt className="ml-2 text-cyan-600" />
                            النقرات حسب التبويبات
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr className='flex justify-between'>
                                        <th>التبويب</th>
                                        <th>عدد النقرات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics?.clicksPerTab?.map((item) => {
                                        const tabNames: { [key: string]: string } = {
                                            'terms': 'شروط البيع',
                                            'hours': 'أوقات الدوام ',
                                            'insinstallment': 'التقسيط',
                                            'address': 'العنوان',
                                            'locations': 'الموقع',
                                            'banking': 'البنوك',
                                            'contact': 'التواصل'
                                        }

                                        return (
                                            <tr key={item._id} className='flex justify-between'>
                                                <td className="max-w-xs truncate font-medium">
                                                    {tabNames[item._id] || item._id}
                                                </td>
                                                <td>
                                                    <span className="badge bg-cyan-500 text-white badge-lg">
                                                        {item.count}
                                                    </span>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </motion.div>

                {/* Top Countries */}
                <motion.div
                    className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white">
                            <FaMapMarkerAlt className="ml-2 text-blue-600" />
                            أفضل الدول
                        </h3>
                        <div className="space-y-4">
                            {analytics?.topCountries.map((country, index) => (
                                <div key={country._id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-linear-to-r text-center pt-1 from-blue-500 to-blue-600 text-white rounded-full w-8">
                                                <span className="text-xs font-bold">{index + 1}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{getCountryName(country._id)}</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold badge badge-outline bg-blue-500 text-white ">{country.count}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                {/* Recent Visits */}
                <motion.div
                    className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white">
                            <FaCalendarAlt className="ml-2 text-blue-600" />
                            الزيارات الحديثة
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>البلد والمدينة</th>
                                        <th>الجهاز</th>
                                        <th>المتصفح</th>
                                        <th>الوقت</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {analytics?.recentVisits?.slice((visitsPage - 1) * 10, visitsPage * 10).map((visit) => (
                                        <tr key={visit._id}>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    <FaGlobe className=" text-blue-500" />
                                                    <span >{visit.country}</span>
                                                    |
                                                    <span className='text-blue-700 mr-2 text-sm'>{visit.city}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    <FaDesktop className=" text-blue-500" />
                                                    <span className="badge badge-outline bg-blue-500 text-white">{visit.device}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex items-center space-x-2">
                                                    <FaChrome className=" text-blue-500" />
                                                    <span className="badge badge-ghost">{visit.browser}</span>
                                                </div>
                                            </td>
                                            <td className="text-xs text-gray-500">
                                                <div className="flex items-center space-x-2">
                                                    <FaClock className=" text-blue-500 mx-2" />
                                                    {formatDate(visit.timestamp)}

                                                </div>


                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="flex justify-center items-center space-x-4 mt-4">
                                <button
                                    className="btn btn-sm btn-outline btn-primary"
                                    onClick={() => setVisitsPage(Math.max(1, visitsPage - 1))}
                                    disabled={visitsPage === 1}
                                >
                                    السابق
                                </button>

                                <span className="text-sm text-gray-600">
                                    صفحة {visitsPage} من {Math.ceil((analytics?.recentVisits?.length || 0) / 10)}
                                </span>

                                <button
                                    className="btn btn-sm btn-outline btn-primary"
                                    onClick={() => setVisitsPage(Math.min(Math.ceil((analytics?.recentVisits?.length || 0) / 10), visitsPage + 1))}
                                    disabled={visitsPage === Math.ceil((analytics?.recentVisits?.length || 0) / 10)}
                                >
                                    التالي
                                </button>
                            </div>

                            <div className="text-center text-xs text-gray-500 mt-2">
                                عرض {Math.min((visitsPage - 1) * 10 + 1, analytics?.recentVisits?.length || 0)} - {Math.min(visitsPage * 10, analytics?.recentVisits?.length || 0)} من إجمالي {analytics?.recentVisits?.length || 0} زيارة
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Password Update */}
                <motion.div
                    className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="card-body">
                        <h3 className="card-title text-gray-800 dark:text-white">
                            <FaShieldAlt className="ml-2 text-blue-600" />
                            تغيير كلمة المرور
                        </h3>
                        <form onSubmit={handlePasswordUpdate}>
                            <div className="form-control">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold">كلمة المرور الحالية</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="input input-bordered border border-blue-500 outline-blue-500 w-full pr-10 bg-white/50 dark:bg-gray-700/50"
                                        value={currentPassword}
                                        placeholder='أدخل كلمة المرور الحالية'
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        required
                                    />
                                    <FaKey className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div className="form-control mt-4">
                                <label className="label mb-2">
                                    <span className="label-text font-semibold">كلمة المرور الجديدة</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="password"
                                        className="input input-bordered border-blue-500 outline-blue-500 w-full pr-10 bg-white/50 dark:bg-gray-700/50"
                                        value={newPassword}
                                        placeholder='أدخل كلمة المرور الجديدة'
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                    <FaShieldAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <motion.button
                                    type="submit"
                                    className="btn bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white shadow-lg"
                                    disabled={loading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {loading ? (
                                        <>
                                            <FaSync className="animate-spin ml-2" />
                                            جاري التحديث...
                                        </>
                                    ) : (
                                        <>
                                            <FaShieldAlt className="ml-2" />
                                            تحديث كلمة المرور
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
