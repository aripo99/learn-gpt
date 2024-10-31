"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import getOrGenerateCourseOutline from "@/lib/actions/generate-course-outline"
import { useEffect, useState, useRef } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';

export default function Course() {
    const [course, setCourse] = useState(null);
    const { id } = useParams() as { id: string };
    const searchParams = useSearchParams();
    const prompt = searchParams.get('prompt') || undefined;

    const effectRan = useRef(false);

    useEffect(() => {
        if (course) {
            return;
        }
        if (effectRan.current === false) {
            getOrGenerateCourseOutline(id, prompt).then((data) => {
                setCourse(data);
            });
            effectRan.current = true;
        }
    });

    if (!course) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
            <p className="text-xl text-muted-foreground mb-8">{course.description}</p>
            
            <h2 className="text-2xl font-semibold mb-6">Course Outline</h2>
            <div className="space-y-4">
                {course.sections.map((section) => (
                    <Link key={section.id} href={`/courses/${course.id}/${section.id}?name=${encodeURIComponent(course.name)}&section_title=${encodeURIComponent(section.title)}&section_content=${encodeURIComponent(section.content)}`} passHref>
                        <Card key={section.id} className="transition-shadow hover:shadow-md my-4">
                            <CardHeader>
                                <CardTitle className="text-xl">{section.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <article className="prose prose-invert max-w-none">
                                    <ReactMarkdown className="text-muted-foreground">{section.content}</ReactMarkdown>
                                </article>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}