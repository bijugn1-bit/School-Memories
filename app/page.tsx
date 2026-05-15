'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Button from '@/components/ui/Button'

const features = [
  {
    icon: '📸',
    title: 'Upload Photos',
    description: 'Easily upload and organize your school memories in one place',
  },
  {
    icon: '👥',
    title: 'Create Groups',
    description: 'Create groups for different batches, classes, or friend circles',
  },
  {
    icon: '📁',
    title: 'Organize Albums',
    description: 'Create albums within groups to keep memories organized by events or occasions',
  },
  {
    icon: '🔗',
    title: 'Share Memories',
    description: 'Share albums with friends and classmates to relive memories together',
  },
  {
    icon: '💾',
    title: 'Download & Backup',
    description: 'Download your photos anytime to keep backups of precious moments',
  },
  {
    icon: '🔒',
    title: 'Privacy Control',
    description: 'Control who can see and download your memories with flexible permissions',
  },
]

export default function HomePage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      setIsAuthenticated(!!data.session?.user)
    }

    checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Preserve Your School Memories</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            A digital archive platform to save, organize, and share your precious school days
          </p>
          <div className="flex justify-center gap-4">
            {isAuthenticated ? (
              <Button onClick={() => router.push('/dashboard')} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button onClick={() => router.push('/signup')} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Get Started
                </Button>
                <Button onClick={() => router.push('/login')} size="lg" variant="outline" className="border-white text-white hover:bg-blue-600">
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose SchoolMemories?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Preserve Your Memories?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of students preserving their school days</p>
          {!isAuthenticated && (
            <Button onClick={() => router.push('/signup')} size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Start Free Today
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}
