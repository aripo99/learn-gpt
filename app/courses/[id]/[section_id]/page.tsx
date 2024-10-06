"use client";

import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'


export default function CourseSection() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    const section_title = searchParams.get('section_title')
    const section_content = searchParams.get('section_content')

    return (
      <div className="mx-auto p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-gray-500">{name}</h2>
        <p className="text-sm text-gray-100 mb-4">{section_title}</p>
        <div className="border-t pt-4">
          <p>{section_content}</p>
        </div>
      </div>
    )
  }