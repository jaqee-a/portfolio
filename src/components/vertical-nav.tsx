import { useState, useEffect } from 'react'

export function VerticalNav() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    document.querySelectorAll('section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="hidden md:block fixed left-4 top-1/2 transform -translate-y-1/2">
      <ul className="space-y-4">
        {['home', 'projects', 'technologies', 'contact'].map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollToSection(section)}
              className={`w-3 h-3 block rounded-full transition-all duration-300 ${
                activeSection === section ? 'bg-black dark:bg-white scale-150' : 'bg-gray-400'
              }`}
            >
              <span className="sr-only">{section}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
