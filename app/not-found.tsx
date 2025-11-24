'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHome, FaArrowRight, FaExclamationTriangle } from 'react-icons/fa';
import { IoArrowBack } from 'react-icons/io5';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-8 p-8 max-w-2xl w-full"
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2
          }}
          className="flex justify-center"
        >
          <div className="relative">
            <motion.div
             
          
              className="text-8xl mb-4"
            >
              <Image
                src="/images/error-404.png"
                alt="404"
                width={300}
                height={300}
                className="w-auto h-auto"
              />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-2 -right-2"
            >
              <FaExclamationTriangle className="text-warning text-2xl" />
            </motion.div>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <motion.h1 
            className="text-8xl font-bold text-blue-600"
            animate={{ 
              textShadow: [
                "0 0 0px rgba(0,0,0,0)",
                "0 0 20px rgba(100,100,255,0.3)",
                "0 0 0px rgba(0,0,0,0)"
              ]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            {/* 404 */}
          </motion.h1>
          
          <motion.h2 
            className="text-3xl font-semibold text-base-content"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            الصفحة غير موجودة
          </motion.h2>
          
          <motion.p 
            className="text-lg text-base-content/70 max-w-md mx-auto leading-relaxed"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            عذراً، الصفحة التي تبحث عنها غير متوفرة أو تم نقلها. 
            يبدو أنك ضللت الطريق!
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Link href="/" className="w-full sm:w-auto">
            <motion.button 
              className="btn bg-blue-600 text-white btn-lg w-full gap-2"
              whileHover={{ 
                scale: 1.05,
                transition: { type: "spring", stiffness: 400, damping: 10 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FaHome className="text-lg" />
              العودة للرئيسية
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <FaArrowRight className="text-lg" />
              </motion.span>
            </motion.button>
          </Link>
          
          <motion.button 
            onClick={() => window.history.back()} 
            className="btn btn-outline border border-blue-600 text-blue-600 btn-lg w-full sm:w-auto gap-2"
            whileHover={{ 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400, damping: 10 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <IoArrowBack className="text-lg" />
            العودة للخلف
          </motion.button>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div 
          className="flex justify-center space-x-2 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[1, 2, 3].map((dot) => (
            <motion.div
              key={dot}
              className="w-2 h-2 bg-blue-600 rounded-full"
              animate={{ 
                y: [0, -10, 0],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: dot * 0.2
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}