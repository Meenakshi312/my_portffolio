"use client"

import type React from "react"

import { useState } from "react"

interface HoneypotFieldProps {
  onBotDetected: () => void
}

export default function HoneypotField({ onBotDetected }: HoneypotFieldProps) {
  const [honeypotValue, setHoneypotValue] = useState("")

  const handleHoneypotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHoneypotValue(e.target.value)
    if (e.target.value) {
      // Bot detected - honeypot field should never be filled by humans
      onBotDetected()
    }
  }

  return (
    <div className="absolute left-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
      <label htmlFor="website">Website (leave blank)</label>
      <input
        type="text"
        id="website"
        name="website"
        value={honeypotValue}
        onChange={handleHoneypotChange}
        tabIndex={-1}
        autoComplete="off"
      />
    </div>
  )
}
