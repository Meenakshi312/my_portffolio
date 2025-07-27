"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm C.Meenakshi's AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const predefinedResponses: Record<string, string> = {
    hello: "Hello! Nice to meet you. I'm here to help you learn more about C.Meenakshi's work and experience.",
    hi: "Hi there! How can I assist you today?",
    skills:
      "C.Meenakshi is skilled in MERN Stack (MongoDB, Express.js, React.js, Node.js), Java, Python, JavaScript, and is currently exploring AI technologies.",
    projects:
      "Some notable projects include a MERN To-Do App, Twitter Clone with React & Tailwind, Spotify Clone, and Netflix Clone. Would you like to know more about any specific project?",
    experience:
      "C.Meenakshi is a Full Stack Developer passionate about building web applications and exploring AI. She believes in learning deeply and step by step.",
    contact:
      "You can reach out through the contact form on this website, or connect via LinkedIn and GitHub. C.Meenakshi is always open to new opportunities and collaborations!",
    education:
      "C.Meenakshi has a strong foundation in computer science and is continuously learning new technologies, especially in the AI domain.",
    ai: "C.Meenakshi is AI curious and interested in combining AI with full-stack applications to build smarter, more impactful solutions.",
    default:
      "That's an interesting question! For more detailed information, please use the contact form or connect through LinkedIn. C.Meenakshi would be happy to discuss this with you personally.",
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("hello") || message.includes("hi")) {
      return predefinedResponses.hello
    } else if (message.includes("skill") || message.includes("technology") || message.includes("tech")) {
      return predefinedResponses.skills
    } else if (message.includes("project") || message.includes("work") || message.includes("portfolio")) {
      return predefinedResponses.projects
    } else if (message.includes("experience") || message.includes("background")) {
      return predefinedResponses.experience
    } else if (message.includes("contact") || message.includes("reach") || message.includes("email")) {
      return predefinedResponses.contact
    } else if (message.includes("education") || message.includes("study") || message.includes("learn")) {
      return predefinedResponses.education
    } else if (
      message.includes("ai") ||
      message.includes("artificial intelligence") ||
      message.includes("machine learning")
    ) {
      return predefinedResponses.ai
    } else {
      return predefinedResponses.default
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-800 transition-all duration-300 transform hover:scale-110"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl flex flex-col">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-gray-700 to-gray-900 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Chat with C.Meenakshi's AI</h3>
            <p className="text-sm text-gray-200">Ask me anything about her work!</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`flex items-start space-x-2 max-w-xs ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`p-2 rounded-full ${
                      message.sender === "user" ? "bg-gray-700" : "bg-gray-200 dark:bg-gray-700"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User size={16} className="text-white" />
                    ) : (
                      <Bot size={16} className="text-gray-700 dark:text-gray-300" />
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-gray-700 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-2 max-w-xs">
                  <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                    <Bot size={16} className="text-gray-700 dark:text-gray-300" />
                  </div>
                  <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
