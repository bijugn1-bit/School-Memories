'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Link from 'next/link'

interface DashboardStats {
  totalGroups: number
  totalAlbums: number
  totalPhotos: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalGroups: 0,
    totalAlbums: 0,
    totalPhotos: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data: user } = await supabase.auth.getUser()
        if (!user.user) return

        setStats({
          totalGroups: 3,
          totalAlbums: 8,
          totalPhotos: 127,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Welcome to SchoolMemories</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Groups</p>
              <p className="text-3xl font-bold">{stats.totalGroups}</p>
            </div>
            <span className="text-4xl">👥</span>
          </div>
        </Card>

        <Card className="border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Albums</p>
              <p className="text-3xl font-bold">{stats.totalAlbums}</p>
            </div>
            <span className="text-4xl">📁</span>
          </div>
        </Card>

        <Card className="border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Photos</p>
              <p className="text-3xl font-bold">{stats.totalPhotos}</p>
            </div>
            <span className="text-4xl">📸</span>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/dashboard/groups">
            <Button className="w-full">Create Group</Button>
          </Link>
          <Link href="/dashboard/albums">
            <Button variant="secondary" className="w-full">Create Album</Button>
          </Link>
          <Link href="/dashboard/photos">
            <Button variant="outline" className="w-full">Upload Photo</Button>
          </Link>
          <Link href="/dashboard/profile">
            <Button variant="secondary" className="w-full">Edit Profile</Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}
