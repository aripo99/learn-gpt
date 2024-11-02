"use client";

import { useEffect, useState, useRef } from "react"
import generateCourseSection from "@/lib/actions/generate-course-section"
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/spinner";

export default function CourseSection() {
    const router = useRouter();
    const section_id = useParams().section_id as string;
    const course_id = useParams().id as string;
    const [courseName, setCourseName] = useState(null);
    const [description, setDescription] = useState(null);
    const [sectionTitle, setSectionTitle] = useState(null);
    const [sectionContent, setSectionContent] = useState(null);
    const [loading, setLoading] = useState(true);

    const effectRan = useRef(false);

    useEffect(() => {  
      if (effectRan.current === false) {
        setLoading(true);
        generateCourseSection(course_id, section_id)
          .then((data) => {
            setCourseName(data.courseName);
            setDescription(data.sectionDescription);
            setSectionTitle(data.sectionTitle);
            setSectionContent(data.sectionContent);
          })
          .finally(() => {
            setLoading(false);
          });
        effectRan.current = true;
      }
    }, []);

    if (loading) {
        return (
            <LoadingSpinner/>
        )
    }

    return (
      <div className="mx-auto p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-gray-500">{courseName}</h2>
        <p className="text-md text-gray-100 mb-4">
            {sectionTitle}
        </p>
        <div className="border-t py-4">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{sectionContent}</ReactMarkdown>
        </article>
        </div>
        <div className="border-t pt-4">
        <article className="prose prose-invert max-w-none">
            <ReactMarkdown>{description}</ReactMarkdown>
        </article>
        <div className="flex mt-4 justify-end gap-2">
            <Button disabled={Number(section_id) === 0} onClick={() => router.push(`/courses/${course_id}/${Number(section_id) - 1}`)}> Back </Button>
            <Button onClick={() => router.push(`/courses/${course_id}/${Number(section_id) + 1}`)}> Next </Button>
        </div>
        </div>
      </div>
    )
}