import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const groupId = searchParams.get('groupId')

    if (!groupId) {
      return NextResponse.json(
        { error: 'Missing groupId parameter' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('albums')
      .select('*')
      .eq('group_id', groupId)
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json({ albums: data })
  } catch (error) {
    console.error('Error fetching albums:', error)
    return NextResponse.json(
      { error: 'Failed to fetch albums' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, description, groupId } = body

    if (!name || !groupId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('albums')
      .insert([
        {
          name,
          description,
          group_id: groupId,
          created_by: user.id,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json({ album: data[0] })
  } catch (error) {
    console.error('Error creating album:', error)
    return NextResponse.json(
      { error: 'Failed to create album' },
      { status: 500 }
    )
  }
}
