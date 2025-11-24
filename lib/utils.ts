import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function maskIP(ip: string): string {
  if (!ip) return 'Unknown'
  const parts = ip.split('.')
  if (parts.length === 4) {
    return `${parts[0]}.${parts[1]}.xxx.xxx`
  }
  return ip
}

export function getDeviceType(userAgent: string): string {
  if (/Mobile|Android|iPhone|iPad|iPod/i.test(userAgent)) {
    return 'Mobile'
  } else if (/Tablet|iPad/i.test(userAgent)) {
    return 'Tablet'
  }
  return 'Desktop'
}

export function getBrowser(userAgent: string): string {
  if (/Chrome/i.test(userAgent)) return 'Chrome'
  if (/Firefox/i.test(userAgent)) return 'Firefox'
  if (/Safari/i.test(userAgent)) return 'Safari'
  if (/Edge/i.test(userAgent)) return 'Edge'
  return 'Other'
}