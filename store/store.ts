  import { create } from 'zustand'
  import { persist } from 'zustand/middleware'

  interface AppState {
    theme: 'light' | 'dark'
    activeTab: string
    adminSession: {
      isLoggedIn: boolean
      token?: string
    }
    setTheme: (theme: 'light' | 'dark') => void
    setActiveTab: (tab: string) => void
    setAdminSession: (session: { isLoggedIn: boolean; token?: string }) => void
  }

  export const useAppStore = create<AppState>()(
    persist(
      (set) => ({
        theme: 'light',
        activeTab: 'terms',
        adminSession: {
          isLoggedIn: false,
        },
        setTheme: (theme) => set({ theme }),
        setActiveTab: (tab) => set({ activeTab: tab }),
        setAdminSession: (session) => set({ adminSession: session }),
      }),
      {
        name: 'app-storage',
      }
    )
  )