import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const { db } = await connectToDatabase()

    const admin = await db.collection('admin').findOne({ username: 'admin' })

    if (!admin) {
      const hashedPassword = await bcrypt.hash('admin123', 12)
      await db.collection('admin').insertOne({
        username: 'admin',
        password: hashedPassword,
        createdAt: new Date(),
      })
    }

    const isValid = await bcrypt.compare(password, admin.password)

    if (!isValid) {
      return NextResponse.json({ error: 'كلمة المرور غير صحيحة' }, { status: 401 })
    }

    const token = Buffer.from(`${Date.now()}`).toString('base64')
    
    await db.collection('sessions').insertOne({
      token,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    })

    return NextResponse.json({ success: true, token })
  } catch (error) {
    return NextResponse.json({ error: 'خطأ في الخادم الداخلي' }, { status: 500 })
  }
}