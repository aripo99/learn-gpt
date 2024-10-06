"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import generateCourseOutline from "@/lib/actions/generate-course-outline"
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"

export default function Course() {
    const [course, setCourse] = useState(null);
    const searchParams = useSearchParams()
    const prompt = searchParams.get('prompt')

    useEffect(() => {
        if (!prompt) {
            return;
        }
        generateCourseOutline(prompt).then((data) => {
            setCourse(data);
        });
    }, []);

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
                                <p className="text-muted-foreground">{section.content}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}