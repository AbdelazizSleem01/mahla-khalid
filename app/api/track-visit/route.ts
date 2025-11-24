import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'
import { getDeviceType, getBrowser, maskIP } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const { db } = await connectToDatabase()
    
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown'
    const userAgent = request.headers.get('user-agent') || 'Unknown'
    
    const analyticsData = {
      type: 'visit',
      country: request.headers.get('x-vercel-ip-country') || 'Unknown',
      city: request.headers.get('x-vercel-ip-city') || 'Unknown',
      device: getDeviceType(userAgent),
      browser: getBrowser(userAgent),
      ip: maskIP(ip),
      timestamp: new Date(),
    }

    await db.collection('analytics').insertOne(analyticsData)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error tracking visit:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
