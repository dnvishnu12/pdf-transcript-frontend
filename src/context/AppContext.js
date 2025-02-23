'use client'
import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [transcript, setTranscript] = useState()
  const [loading, setLoading] = useState(false)

  return (
    <AppContext.Provider
      value={{
        transcript,
        setTranscript,
        loading,
        setLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
