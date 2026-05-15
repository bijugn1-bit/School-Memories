'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()
      if (data.session?.user) {
        setIsAuthenticated(true)
        setUserName(data.session.user.user_metadata?.full_name || 'User')
      }
    }

    checkAuth()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setIsAuthenticated(false)
    router.push('/')
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-blue-600">📸 SchoolMemories</h1>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated && <span className="text-gray-700">Welcome, {userName}!</span>}
            {isAuthenticated ? (
              <Button onClick={handleLogout} variant="secondary" size="sm">
                Logout
              </Button>
            ) : (
              <div className="space-x-2">
                <Button onClick={() => router.push('/login')} variant="outline" size="sm">
                  Login
                </Button>
                <Button onClick={() => router.push('/signup')} size="sm">
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
