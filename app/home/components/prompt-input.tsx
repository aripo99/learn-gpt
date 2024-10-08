'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {  Send } from "lucide-react"
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid';

export default function Component() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');

  const handleGeneratePrompt = () => {
    const uuid = uuidv4();
    const encodedPrompt = encodeURIComponent(prompt);
    router.push(`/courses/${uuid}?prompt=${encodedPrompt}`);
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex items-center space-x-2 justify-center min-h-screen">
        <div className="relative flex-grow">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={"What do you want to learn about?"}
            className="pr-10"
          />
          <Button
            onClick={handleGeneratePrompt}
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}