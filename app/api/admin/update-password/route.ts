import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/database'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { currentPassword, newPassword, token } = await request.json()
    const { db } = await connectToDatabase()

    const session = await db.collection('sessions').findOne({
      token,
      expiresAt: { $gt: new Date() },
    })

    if (!session) {
      return NextResponse.json({ error: 'جلسة غير صالحة' }, { status: 401 })
    }

    const admin = await db.collection('admin').findOne({ username: 'admin' })

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 })
    }

    const isValid = await bcrypt.compare(currentPassword, admin.password)

    if (!isValid) {
      return NextResponse.json({ error: 'كلمة المرور الحالية غير صحيحة' }, { status: 401 })
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12)
    await db.collection('admin').updateOne(
      { username: 'admin' },
      { $set: { password: hashedNewPassword } }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Password update error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
