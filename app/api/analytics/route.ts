import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'

export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    const { searchParams } = new URL(request.url)
    const range = searchParams.get('range') || '7d'
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    
    const session = await db.collection('sessions').findOne({
      token,
      expiresAt: { $gt: new Date() },
    })

    if (!session) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 })
    }

    const dateFilter = getDateFilter(range)

    const visits = await db.collection('analytics')
      .find({ 
        type: 'visit',
        ...dateFilter
      })
      .count()

    const clicks = await db.collection('analytics')
      .find({
        type: 'click',
        ...dateFilter
      })
      .count()

    const tabs = await db.collection('analytics')
      .find({
        type: 'click',
        clickType: 'tab',
        ...dateFilter
      })
      .count()

    const clicksPerLink = await db.collection('analytics')
      .aggregate([
        {
          $match: {
            type: 'click',
            clickType: { $ne: 'tab' },
            ...dateFilter
          }
        },
        { $group: { _id: '$linkId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray()

    const clicksPerTab = await db.collection('analytics')
      .aggregate([
        {
          $match: {
            type: 'click',
            clickType: 'tab',
            ...dateFilter
          }
        },
        { $group: { _id: '$linkId', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray()

    const topCountries = await db.collection('analytics')
      .aggregate([
        { 
          $match: { 
            type: 'visit',
            ...dateFilter
          } 
        },
        { $group: { _id: '$country', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ])
      .toArray()

    const devices = await db.collection('analytics')
      .aggregate([
        { 
          $match: { 
            type: 'visit',
            ...dateFilter
          } 
        },
        { $group: { _id: '$device', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray()

    const browsers = await db.collection('analytics')
      .aggregate([
        { 
          $match: { 
            type: 'visit',
            ...dateFilter
          } 
        },
        { $group: { _id: '$browser', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ])
      .toArray()

    const recentVisits = await db.collection('analytics')
      .find({
        type: 'visit',
        ...dateFilter
      })
      .sort({ timestamp: -1 })
      .limit(10)
      .toArray()

    return NextResponse.json({
      totalVisits: visits,
      totalClicks: clicks,
      totalTabs: tabs,
      clicksPerLink,
      clicksPerTab,
      topCountries,
      devices,
      browsers,
      recentVisits,
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

function getDateFilter(range: string) {
  const now = new Date()
  let startDate = new Date()

  switch (range) {
    case '24h':
      startDate.setHours(now.getHours() - 24)
      break
    case '7d':
      startDate.setDate(now.getDate() - 7)
      break
    case '30d':
      startDate.setDate(now.getDate() - 30)
      break
    default:
      startDate.setDate(now.getDate() - 7)
  }

  return {
    timestamp: {
      $gte: startDate,
      $lte: now
    }
  }
}
