"use client"

import { useEffect, useRef } from "react"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectCards = entry.target.querySelectorAll(".project-card")
            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-in-up")
              }, index * 200)
            })
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

  const projects = [
    {
      title: "Mini To-Do App",
      description:
        "A full-stack task management application built with the MERN stack. Features include user authentication, real-time updates, and responsive design.",
      tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
      image: "/Todo.png?height=300&width=500",
      live: "https://github.com/Meenakshi312/Mini-To-Do.git",
    },
    {
      title: "Twitter Clone",
      description:
        "A responsive social media platform clone built with React and Tailwind CSS. Includes tweet functionality, user profiles, and modern UI components.",
      tech: ["React.js", "Tailwind CSS", "JavaScript", "Responsive Design"],
      image: "/twitter.png?height=300&width=500",
      live: "https://meenakshi312.github.io/twitter-tailwind-clone/",
    },
    {
      title: "Spotify Clone",
      description:
        "A music streaming interface clone with HTML, CSS, and JavaScript. Features include playlist management, audio controls, and dynamic content.",
      tech: ["HTML5", "CSS3", "JavaScript", "Audio API"],
      image: "/spotify.jpg?height=300&width=500",
      live: "https://github.com/Meenakshi312/spotify-clone.git",
    },
    {
      title: "Netflix Clone",
      description:
        "A movie streaming platform interface built with HTML and CSS. Responsive design with modern layouts and hover effects.",
      tech: ["HTML5", "CSS3", "Flexbox", "Grid Layout"],
      image: "/netflix.png?height=300&width=500",
      live: "https://github.com/Meenakshi312/Netflix-clone.git",
    },
  ]

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Featured Projects
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card opacity-0 bg-gray-50 dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image || "/public/Todo.png"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.live}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white rounded-lg hover:from-gray-600 hover:to-gray-800 transition-colors duration-200 font-medium"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
