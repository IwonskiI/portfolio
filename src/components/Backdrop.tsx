import React from 'react'

interface BackdropT {
  children: React.ReactNode
  modalHandelr: () => void
}

export default function Backdrop({ children, modalHandelr }: BackdropT) {
  return (
    <div
      role="presentation"
      onClick={modalHandelr}
      className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-50 overflow-auto backdrop-blur flex justify-center items-center"
    >
      {children}
    </div>
  )
}
