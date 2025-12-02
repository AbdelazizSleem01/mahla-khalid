import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AppState {
    activeTab: string
    adminSession: {
      isLoggedIn: boolean
      token?: string
    }
    setActiveTab: (tab: string) => void
    setAdminSession: (session: { isLoggedIn: boolean; token?: string }) => void
  }

  export const useAppStore = create<AppState>()(
    persist(
      (set) => ({
        activeTab: 'terms',
        adminSession: {
          isLoggedIn: false,
        },
        setActiveTab: (tab) => set({ activeTab: tab }),
        setAdminSession: (session) => set({ adminSession: session }),
      }),
      {
        name: 'app-storage',
      }
    )
  )