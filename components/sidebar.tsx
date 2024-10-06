import Link from "next/link"
import { PlusCircle, History } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function CourseSidebar() {
  return (
    <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto border-r">
      <nav className="flex flex-col items-center flex-1 space-y-6">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/home">
                <Button variant="ghost" size="icon" className="relative" aria-label="Create new course">
                  <PlusCircle className="h-6 w-6" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Create new course</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/courses">
                <Button variant="ghost" size="icon" className="relative" aria-label="Your courses">
                  <History className="h-6 w-6" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Your Courses</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  )
}