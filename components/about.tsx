"use client"

import { useEffect, useRef } from "react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          About Me
        </h2>
        <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 leading-relaxed">
          <p className="mb-6 text-lg">
            I'm a <strong className="text-gray-900 dark:text-white">Full Stack Web Developer</strong> with a strong
            foundation in the MERN stack. My curiosity began with a simple question — how are the apps we use every day
            built? That question sparked my journey into web development and opened the door to the broader tech world.
          </p>
          <p className="mb-6 text-lg">
            I'm currently exploring <strong className="text-gray-900 dark:text-white">Artificial Intelligence</strong>,
            with a deep interest in combining it with full-stack applications to build smarter, more impactful
            solutions.
          </p>
          <p className="text-lg">
            I believe in learning deeply, step by step, and I'm driven by the passion to create, explore, and grow in
            this ever-evolving field.
          </p>
        </div>
      </div>
    </section>
  )
}
