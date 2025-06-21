import { Moon, Sun } from "lucide-react"

import { useTheme } from "./theme-provider"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  const handleSwitch = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center gap-2">
      <div className="w-5 flex justify-center">
        {!isDark && <Sun className="h-5 w-5 text-yellow-500" />}
        {isDark && <span className="h-5 w-5" />}
      </div>
      <Switch className="cursor-pointer" checked={isDark} onCheckedChange={handleSwitch} />
      <div className="w-5 flex justify-center">
        {isDark && <Moon className="h-5 w-5 text-blue-500" />}
        {!isDark && <span className="h-5 w-5" />}
      </div>
    </div>
  )
}