import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { ChevronDown, Github, Instagram, Linkedin, Link2Icon } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ThemeSwitch } from './components/theme-switch'
import { VerticalNav } from './components/vertical-nav'
import { projects } from './constants/projects'
import { technologies } from './constants/technologies'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerChildren = {
  visible: { transition: { staggerChildren: 0.1 } }
}

type AnimatedSectionProps = {
  children: React.ReactNode
  id: string
  className?: string
}

function AnimatedSection({ children, id, className }: AnimatedSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren}
      className={className ?? "min-h-screen pb-16"}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [showScrollIcon, setShowScrollIcon] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIcon(false)
      } else {
        setShowScrollIcon(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return null

  return (
    <div className={`min-h-screen transition-all duration-300 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <ThemeSwitch />
      <VerticalNav />
      <main className="container mx-auto px-4">
        <AnimatedSection id="home">
          <div className="relative min-h-screen flex flex-col justify-center md:items-center">
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-4">Hi 👋,</motion.h1>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl font-bold mb-4">I&apos;m Mohammed Amine</motion.h1>
            <motion.h1 variants={fadeInUp} className="text-l md:text-xl mb-8">Software Engineer</motion.h1>
            <motion.div variants={fadeInUp} className="flex space-x-4">
              <a href="https://github.com/jaqee-a" target='_blank' className="hover:text-gray-400"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/mohammed-amine-bouderbala-763841182/" target='_blank' className="hover:text-gray-400"><Linkedin size={24} /></a>
              <a href="https://www.instagram.com/jaqe_3/" target='_blank' className="hover:text-gray-400"><Instagram size={24} /></a>
            </motion.div>
            <AnimatePresence>
              {showScrollIcon && (
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={32} className="animate-bounce" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8">Projects</motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div key={project.name} variants={fadeInUp} className="border flex items-center gap-2 border-gray-700 p-6 rounded-lg">
                <Link2Icon size={16} />
                <a href={project.url} target='_blank' className="text-2xl font-semibold">{project.name} </a>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="technologies">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8">Technologies</motion.h2>
          <div className="grid grid-cols-2 place-items-center md:place-items-start md:grid-cols-8 gap-8">
            {technologies.map((tech) => (
              <motion.div key={tech.name} variants={fadeInUp} className="text-center">
                <img src={tech.image} alt={tech.name} className="w-20 aspect-square mb-2" />
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact">
          <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-8">Contact</motion.h2>
          <motion.form variants={fadeInUp} className="max-w-md mx-auto">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Name</label>
              <input type="text" id="name" name="name" className="w-full p-2 border border-gray-700 rounded bg-transparent" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2">Email</label>
              <input type="email" id="email" name="email" className="w-full p-2 border border-gray-700 rounded bg-transparent" />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea id="message" name="message" rows={4} className="w-full p-2 border border-gray-700 rounded bg-transparent"></textarea>
            </div>
            <button type="submit" className="dark:bg-white dark:text-black duration-300 bg-black text-white px-4 py-2 font-semibold rounded hover:hover:bg-gray-200 dark:hover:bg-gray-200">Send Message</button>
          </motion.form>
        </AnimatedSection>
      </main>
    </div>
  )
}
