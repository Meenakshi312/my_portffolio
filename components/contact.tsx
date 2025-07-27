"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Mail, Send, CheckCircle, AlertCircle, Shield } from "lucide-react"
import emailjs from "@emailjs/browser"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    // Initialize EmailJS with the correct method
    emailjs.init({
      publicKey: "s61i-FfpUXjAY2U2U",
    })

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setErrorMessage("")

    try {
      // Basic form validation
      if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
        throw new Error("Please fill in all fields")
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        throw new Error("Please enter a valid email address")
      }

      // Prepare template parameters for EmailJS
      const templateParams = {
        "{{from_name}}": formData.name,
        "{{from_email}}": formData.email,
        "{{message}}": formData.message,
        "{{to_name}}": "C.Meenakshi",
      }

      // Send email using EmailJS
      const result = await emailjs.send(
        "service_dsfirnm", // Your Service ID
        "template_qat8iyk", // Your Template ID
        templateParams,
      )

      console.log("Email sent successfully:", result.text)
      setSubmitStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (error: any) {
      console.error("Form submission failed:", error)
      setSubmitStatus("error")

      // Better error handling
      if (error.status === 400) {
        setErrorMessage("Configuration error. Please contact the site administrator.")
      } else if (error.status === 422) {
        setErrorMessage("Please fill in all required fields correctly.")
      } else if (error.text) {
        setErrorMessage(`Error: ${error.text}`)
      } else {
        setErrorMessage(error.message || "Failed to send message. Please try again later.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Let's Connect</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm always interested in new opportunities and collaborations. Whether you have a project in mind or
                just want to chat about technology, feel free to reach out!
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-full">
                <Mail className="text-gray-700 dark:text-gray-300" size={24} />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Email</p>
                <p className="text-gray-600 dark:text-gray-400">meenakshi@gmail.com</p>
              </div>
            </div>

            {/* Chat Option */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Quick Questions?</h4>
              <p className="text-blue-700 dark:text-blue-300 text-sm">
                Use the chat widget in the bottom-right corner for instant answers about my work and experience!
              </p>
            </div>

            {/* Security Notice */}
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="text-green-600 dark:text-green-400" size={20} />
                <h4 className="font-semibold text-green-900 dark:text-green-100">Secure Contact</h4>
              </div>
              <p className="text-green-700 dark:text-green-300 text-sm">
                Your message will be sent directly to C.Meenakshi's email inbox securely.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {submitStatus === "success" && (
              <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
                <p className="text-green-700 dark:text-green-300">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
                <p className="text-red-700 dark:text-red-300">{errorMessage}</p>
              </div>
            )}

            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200 peer"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gray-700 dark:peer-focus:text-gray-300 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200 peer"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gray-700 dark:peer-focus:text-gray-300 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200 peer resize-none"
                placeholder=" "
                required
              />
              <label className="absolute left-4 top-3 text-gray-500 dark:text-gray-400 transition-all duration-200 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-gray-700 dark:peer-focus:text-gray-300 peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Sending Message...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              Your message will be sent directly to C.Meenakshi's email inbox.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
