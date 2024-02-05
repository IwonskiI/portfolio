'use client'

import React from 'react'
import { Provider } from 'react-redux'
import { store } from '@/features/states/store'
import { ThemeProvider } from 'next-themes'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">{children}</ThemeProvider>
    </Provider>
  )
}
