'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      // Check if page is tall enough (more than 150% of viewport height)
      const pageHeight = document.documentElement.scrollHeight
      const viewportHeight = window.innerHeight
      const isPageLongEnough = pageHeight > viewportHeight * 1.5

      // Check if user has scrolled past halfway point
      const scrolledHalfway = window.scrollY > pageHeight / 2

      setIsVisible(isPageLongEnough && scrolledHalfway)
    }

    // Check on mount and scroll
    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <AnimatePresence>
      {
        isVisible && (
            <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={ () => scrollToTop() }
                className="fixed bottom-[10%] right-8 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                aria-label="Scroll to top"
            >
                Top
            </motion.button>
        )
      }
    </AnimatePresence>
  )
}