import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed top-4 z-10 right-4 p-2 rounded-full bg-white dark:bg-black text-black dark:text-white"
    >
      {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  )
}
