import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'
import { getDeviceType, getBrowser, maskIP } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    const { linkId, clickType = 'link' } = await request.json()
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    
    const clickData = {
      type: 'click',
      linkId,
      clickType,
      country: request.headers.get('x-vercel-ip-country') || 'Unknown',
      city: request.headers.get('x-vercel-ip-city') || 'Unknown',
      device: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      ip: maskIP(ip),
      timestamp: new Date(),
    }

    await db.collection('analytics').insertOne(clickData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking click:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
