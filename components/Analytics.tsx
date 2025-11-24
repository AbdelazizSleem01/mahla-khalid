'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/store'
import {
  FaChartLine,
  FaMousePointer,
  FaHeart,
  FaGlobe,
  FaDesktop,
  FaMobile,
  FaTablet,
  FaChrome,
  FaFirefox,
  FaSafari,
  FaEdge,
  FaSync
} from 'react-icons/fa'
import { motion } from 'framer-motion'

interface AnalyticsStats {
  totalVisits: number
  totalClicks: number
  totalTabs: number
  clicksPerLink: Array<{ _id: string; count: number }>
  clicksPerTab: Array<{ _id: string; count: number }>
  topCountries: Array<{ _id: string; count: number }>
  devices: Array<{ _id: string; count: number }>
  browsers: Array<{ _id: string; count: number }>
}

export default function Analytics() {
  const [stats, setStats] = useState<AnalyticsStats | null>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [loading, setLoading] = useState(true)
  const { adminSession } = useAppStore()

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics?range=${timeRange}`, {
        headers: {
          Authorization: `Bearer ${adminSession.token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Analytics fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const getProgressPercentage = (count: number, total: number) => {
    return total > 0 ? (count / total) * 100 : 0
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
      'Unknown': 'غير معروف'
    }
    return countryNames[code] || code
  }

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'desktop': return <FaDesktop className="text-blue-500" />
      case 'mobile': return <FaMobile className="text-green-500" />
      case 'tablet': return <FaTablet className="text-purple-500" />
      default: return <FaDesktop className="text-gray-500" />
    }
  }

  const getBrowserIcon = (browser: string) => {
    switch (browser.toLowerCase()) {
      case 'chrome': return <FaChrome className="text-green-500" />
      case 'firefox': return <FaFirefox className="text-orange-500" />
      case 'safari': return <FaSafari className="text-blue-500" />
      case 'edge': return <FaEdge className="text-blue-600" />
      default: return <FaChrome className="text-gray-500" />
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FaSync className="text-blue-500 text-2xl" />
          </motion.div>
          <p className="text-lg text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
          التحليلات
        </h2>
        <div className="join">
          {['24h', '7d', '30d'].map((range) => (
            <motion.button
              key={range}
              className={`join-item btn btn-sm text-black  ${timeRange === range ?
                'bg-blue-500 text-white border-blue-500' :
                'bg-white/50 border-gray-300'
                }`}
              onClick={() => setTimeRange(range)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {range === '24h' ? '24 ساعة' : range === '7d' ? '7 أيام' : '30 يوم'}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          className="stat bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl shadow-lg border border-blue-200 dark:border-blue-700"
          whileHover={{ scale: 1.02 }}
        >
          <div className="stat-figure text-blue-500">
            <FaChartLine className="text-2xl" />
          </div>
          <div className="stat-title text-blue-600">إجمالي الزيارات</div>
          <div className="stat-value text-blue-700">{stats?.totalVisits || 0}</div>
          <div className="stat-desc text-blue-600">زيارة</div>
        </motion.div>

        <motion.div
          className="stat bg-linear-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl shadow-lg border border-green-200 dark:border-green-700"
          whileHover={{ scale: 1.02 }}
        >
          <div className="stat-figure text-green-500">
            <FaMousePointer className="text-2xl" />
          </div>
          <div className="stat-title text-green-600">إجمالي النقرات</div>
          <div className="stat-value text-green-700">{stats?.totalClicks || 0}</div>
          <div className="stat-desc text-green-600">نقرة</div>
        </motion.div>

        <motion.div
          className="stat bg-linear-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl shadow-lg border border-purple-200 dark:border-purple-700"
          whileHover={{ scale: 1.02 }}
        >
          <div className="stat-figure text-purple-500">
            <FaHeart className="text-2xl" />
          </div>
          <div className="stat-title text-purple-600">معدل النقر</div>
          <div className="stat-value text-purple-700">
            {stats && stats.totalVisits > 0
              ? ((stats.totalClicks / stats.totalVisits) * 100).toFixed(1)
              : '0'}%
          </div>
          <div className="stat-desc text-purple-600">نقرة/زيارة</div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clicks by Link */}
        <motion.div
          className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card-body">
            <h3 className="card-title text-gray-800 dark:text-white">
              <FaMousePointer className="ml-2 text--600" />
              النقرات حسب الرابط
            </h3>
            <div className="space-y-4">
              {stats?.clicksPerLink.map((item, index) => {
                const percentage = getProgressPercentage(item.count, stats.totalClicks)
                const colors = [
                  'bg-blue-500', 'bg-blue-500', 'bg-orange-500',
                  'bg-red-500', 'bg-pink-500'
                ]

                return (
                  <div key={item._id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium truncate max-w-xs">
                        {item._id === 'whatsapp' ? 'واتساب' :
                          item._id.includes('maps') ? 'خرائط جوجل' : item._id}
                      </span>
                      <span className="text-sm font-bold text-blue-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-left">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Clicks by Tab */}
        <motion.div
          className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card-body">
            <h3 className="card-title text-gray-800 dark:text-white">
              <FaGlobe className="ml-2 text-blue-600" />
              النقرات حسب التبويبات
            </h3>
            <div className="space-y-4">
              {stats?.clicksPerTab.map((item, index) => {
                const percentage = getProgressPercentage(item.count, stats.totalTabs)
                const colors = [
                  'bg-blue-500', 'bg-cyan-500', 'bg-teal-500',
                  'bg-blue-500', 'bg-purple-500'
                ]

                const tabNames: { [key: string]: string } = {
                  'terms': 'الشروط',
                  'hours': 'ساعات العمل',
                  'address': 'العنوان',
                  'locations': 'الموقع',
                  'banking': 'البنوك',
                  'contact': 'التواصل'
                }

                return (
                  <div key={item._id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        {tabNames[item._id] || item._id}
                      </span>
                      <span className="text-sm font-bold text-blue-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 text-left">
                      {percentage.toFixed(1)}%
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Geographic Distribution */}
        <motion.div
          className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="card-body">
            <h3 className="card-title text-gray-800 dark:text-white">
              <FaGlobe className="ml-2 text-blue-600" />
              التوزيع الجغرافي
            </h3>
            <div className="space-y-4">
              {stats?.topCountries.map((country, index) => {
                const percentage = getProgressPercentage(country.count, stats.totalVisits)

                return (
                  <div key={country._id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">
                          {getCountryName(country._id)}
                        </span>
                        <span className="badge bg-blue-100 text-blue-800 border-none badge-sm">
                          {country.count}
                        </span>
                      </div>
                      <span className="text-sm font-bold text-blue-600">{percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devices */}
        <motion.div
          className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card-body">
            <h3 className="card-title text-gray-800 dark:text-white">
              <FaDesktop className="ml-2 text-blue-600" />
              أنواع الأجهزة
            </h3>
            <div className="space-y-4">
              {stats?.devices?.map((device) => {
                const percentage = getProgressPercentage(device.count, stats.totalVisits)

                return (
                  <div key={device._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getDeviceIcon(device._id)}
                      <span className="capitalize font-medium">{device._id}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-blue-600">{device.count}</span>
                      <span className="text-sm text-gray-500 w-12 text-left">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Browsers */}
        <motion.div
          className="card bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl border border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="card-body">
            <h3 className="card-title text-gray-800 dark:text-white">
              <FaChrome className="ml-2 text-blue-600" />
              المتصفحات
            </h3>
            <div className="space-y-4">
              {stats?.browsers?.map((browser) => {
                const percentage = getProgressPercentage(browser.count, stats.totalVisits)

                return (
                  <div key={browser._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getBrowserIcon(browser._id)}
                      <span className="font-medium">{browser._id}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-blue-600">{browser.count}</span>
                      <span className="text-sm text-gray-500 w-12 text-left">
                        ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {!stats && (
        <motion.div
          className="alert alert-info bg-blue-50 border-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaChartLine className="text-blue-500" />
          <span className="text-blue-700">لا توجد بيانات تحليلية متاحة حالياً.</span>
        </motion.div>
      )}
    </div>
  )
}
