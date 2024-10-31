"use client";

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from 'next/navigation'
import generateCourseSection from "@/lib/actions/generate-course-section"
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';

export default function CourseSection() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name')
    const section_title = searchParams.get('section_title')
    const section_content = searchParams.get('section_content')
    const section_id = useParams().section_id as string;
    const [description, setDescription] = useState(null);
    const [loading, setLoading] = useState(true);

    const effectRan = useRef(false);

    useEffect(() => {
      if (!section_title || !section_content) {
        setLoading(false);
        return;
      }
  
      if (effectRan.current === false) {
        setLoading(true);
        generateCourseSection(section_id, section_title, section_content)
          .then((data) => {
            setDescription(data.sectionDescription);
          })
          .finally(() => {
            setLoading(false);
          });
        effectRan.current = true;
      }
    }, [section_title, section_content]);

    return (
      <div className="mx-auto p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-gray-500">{name}</h2>
        <p className="text-md text-gray-100 mb-4">
            {section_title}
        </p>
        <div className="border-t py-4">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{section_content}</ReactMarkdown>
        </article>
        </div>
        {loading && <p>Loading...</p>}
        {!loading && (
        <div className="border-t pt-4">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{description}</ReactMarkdown>
        </article>
        </div>
        )}
      </div>
    )
  }