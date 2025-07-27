"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface RateLimiterProps {
  maxAttempts: number
  timeWindow: number // in minutes
  onLimitExceeded: () => void
  children: (canSubmit: boolean, remainingTime: number) => React.ReactNode
}

export default function RateLimiter({ maxAttempts, timeWindow, onLimitExceeded, children }: RateLimiterProps) {
  const [attempts, setAttempts] = useState<number[]>([])
  const [isBlocked, setIsBlocked] = useState(false)
  const [remainingTime, setRemainingTime] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem("contact_attempts")
    if (stored) {
      const parsedAttempts = JSON.parse(stored)
      setAttempts(parsedAttempts)
      checkRateLimit(parsedAttempts)
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isBlocked && remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            setIsBlocked(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isBlocked, remainingTime])

  const checkRateLimit = (currentAttempts: number[]) => {
    const now = Date.now()
    const windowStart = now - timeWindow * 60 * 1000
    const recentAttempts = currentAttempts.filter((timestamp) => timestamp > windowStart)

    if (recentAttempts.length >= maxAttempts) {
      const oldestAttempt = Math.min(...recentAttempts)
      const timeUntilReset = Math.ceil((oldestAttempt + timeWindow * 60 * 1000 - now) / 1000)
      setIsBlocked(true)
      setRemainingTime(timeUntilReset)
      onLimitExceeded()
      return false
    }
    return true
  }

  const recordAttempt = () => {
    const now = Date.now()
    const newAttempts = [...attempts, now]
    setAttempts(newAttempts)
    localStorage.setItem("contact_attempts", JSON.stringify(newAttempts))
    return checkRateLimit(newAttempts)
  }

  return <>{children(!isBlocked, remainingTime)}</>
}
