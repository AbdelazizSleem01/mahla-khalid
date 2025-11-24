// app/admin-1432-secret/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAppStore } from '@/store/store'
import { useRouter } from 'next/navigation'
import AdminDashboard from '@/components/AdminDashboard'
import Analytics from '@/components/Analytics'
import {
  FaHome,
  FaSignOutAlt,
  FaBars,
  FaChartBar,
  FaCog,
  FaShieldAlt,
  FaSync,
  FaUserShield,
  FaGlobe,
  FaClock
} from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import Swal from 'sweetalert2'

type TabType = 'dashboard' | 'analytics'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')
  const [loading, setLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { adminSession, setAdminSession } = useAppStore()
  const router = useRouter()

  useEffect(() => {
    if (adminSession.isLoggedIn && adminSession.token) {
      verifySession()
    }
  }, [])

  const verifySession = async () => {
    try {
      const response = await fetch('/api/analytics', {
        headers: {
          Authorization: `Bearer ${adminSession.token}`,
        },
      })

      if (response.ok) {
        setIsLoggedIn(true)
      } else {
        setAdminSession({ isLoggedIn: false })
        setIsLoggedIn(false)
      }
    } catch (error) {
      console.error('Session verification error:', error)
      setAdminSession({ isLoggedIn: false })
      setIsLoggedIn(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        const data = await response.json()
        setAdminSession({ isLoggedIn: true, token: data.token })
        setIsLoggedIn(true)
      } else {
        const error = await response.json()
        Swal.fire({
          title: 'خطأ',
          text: error.error || 'كلمة المرور غير صحيحة',
          icon: 'error',
          confirmButtonText: 'موافق'
        })
      }
    } catch (error) {
      Swal.fire({
        title: 'خطأ',
        text: 'فشل في تسجيل الدخول',
        icon: 'error',
        confirmButtonText: 'موافق'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setAdminSession({ isLoggedIn: false })
    setIsLoggedIn(false)
    setPassword('')
    setMobileMenuOpen(false)
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center p-4 -mt-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border border-white/20"
        >
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <FaUserShield className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                تسجيل الدخول للإدارة
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                أدخل كلمة المرور للوصول إلى لوحة التحكم
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text font-semibold">كلمة المرور</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="input input-bordered border-blue-500 border outline-blue-400 w-full pr-10 backdrop-blur-sm py-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="أدخل كلمة المرور السرية"
                  />
                  <FaShieldAlt className="absolute z-10 right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="form-control mt-6">
                <motion.button
                  type="submit"
                  className="btn bg-linear-to-r w-full from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-none text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <FaSync className="animate-spin ml-2" />
                      جاري التسجيل...
                    </>
                  ) : (
                    <>
                      <FaUserShield className="ml-2" />
                      تسجيل الدخول
                    </>
                  )}
                </motion.button>
              </div>
            </form>

            <div className="divider my-6">أو</div>

            <div className="text-center">
              <motion.button
                onClick={() => router.push('/')}
                className="btn  btn-sm  hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaHome className="ml-2" />
                العودة إلى الموقع الرئيسي
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen -mt-2 bg-linear-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20">
      {/* Header */}
      <nav className="navbar bg-white/80 dark:bg-gray-800 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className=" mx-auto px-4">
          <div className="navbar-start">
            {/* Mobile Menu Button */}
            <div className="dropdown lg:hidden">
              <motion.button
                tabIndex={0}
                className="btn blue btn-circle"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <FaBars className="text-blue-600" />
              </motion.button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl border border-gray-200 dark:border-gray-700"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <li>
                      <button
                        className={activeTab === 'dashboard' ? 'active bg-blue-50 text-blue-700' : ''}
                        onClick={() => {
                          setActiveTab('dashboard')
                          setMobileMenuOpen(false)
                        }}
                      >
                        <FaCog />
                        لوحة التحكم
                      </button>
                    </li>
                    <li>
                      <button
                        className={activeTab === 'analytics' ? 'active bg-blue-50 text-blue-700' : ''}
                        onClick={() => {
                          setActiveTab('analytics')
                          setMobileMenuOpen(false)
                        }}
                      >
                        <FaChartBar />
                        التحليلات
                      </button>
                    </li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>


          </div>

          {/* Desktop Navigation */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 space-x-2 ">
              <li>
                <motion.button
                  className={`btn rounded-xl ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
                  onClick={() => setActiveTab('dashboard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCog className="ml-2" />
                  لوحة التحكم
                </motion.button>
              </li>
              <li>
                <motion.button
                  className={`btn rounded-xl ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-700 border-blue-200' : ''}`}
                  onClick={() => setActiveTab('analytics')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaChartBar className="ml-2" />
                  التحليلات
                </motion.button>
              </li>
            </ul>
          </div>

          {/* User Menu */}
          <div className="navbar-end">
            <div className="dropdown dropdown-end">

              <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow-2xl border border-gray-200 dark:border-gray-700">
                <li>
                  <button onClick={() => router.push('/')}>
                    <FaHome />
                    الموقع الرئيسي
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600 hover:text-red-700">
                    <FaSignOutAlt />
                    تسجيل الخروج
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-2xl mb-6 overflow-hidden"
        >
          <div className="card-body">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-center md:text-right">
                <h2 className="card-title text-2xl mb-2">مرحباً بك في لوحة التحكم</h2>
                <p className="opacity-90">إدارة وتحليل أداء موقع مهلة خالد</p>

              </div>
            </div>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6"
        >
          {activeTab === 'dashboard' && <AdminDashboard />}
          {activeTab === 'analytics' && <Analytics />}
        </motion.div>

        {/* Quick Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20">
            <div className="text-sm text-gray-500 mb-2">الرابط السري</div>
            <div className="font-mono text-xs text-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg mt-2">
              admin-1432-secret
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20">
            <div className="text-sm text-gray-500 mb-2">آخر تحديث</div>
            <div className="font-bold text-blue-600">
              {new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-white/20">
            <div className="text-sm text-gray-500 mb-2">الحماية</div>
            <div className="text-green-600 font-bold flex items-center justify-center">
              <FaShieldAlt className="ml-1" />
              مفعلة ✓
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
