'use server';

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { createClient} from "@/supabase/server";

const openai = new OpenAI();

const CourseOutlineEvent = z.object({
    name: z.string(),
    description: z.string(),
    sections: z.array(
        z.object({
        id: z.number(),
        title: z.string(),
        content: z.string(),
        })
    ),
});


export default async function getOrGenerateCourseOutline(id: string, prompt: string) {
  const client = await createClient();

  // Query to check if course already exists with sections
  const { data: existingCourse } = await client
  .from('courses')
  .select(`
    id,
    name,
    description,
    prompt,
    created_at,
    course_sections (
      id,
      title,
      content
    )
  `)
  .eq('id', id)
  .single();
    
  if (existingCourse) {
      console.log("Existing course found:", existingCourse); 
      // Transform course_sections to sections
      const transformedCourse = {
          name: existingCourse.name,
          description: existingCourse.description,
          sections: existingCourse.course_sections.map((section: any) => ({
              id: section.id,
              title: section.title,
              content: section.content,
          })),
      }; 
      return transformedCourse;
  }

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: "Generate a course outline based on the user input",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: zodResponseFormat(CourseOutlineEvent, "event")
    });
  
    const course = completion.choices[0].message.parsed;

    if (!course) {
        throw new Error("Failed to parse course data.");
    }

    // Insert the course into the Courses table
    const { data: insertedCourse, error: courseError } = await client
        .from('courses')
        .insert({
            id: id,
            name: course.name,
            description: course.description,
            prompt,
            created_at: new Date().toISOString(),
        })
        .select('id')
        .single();

    if (courseError) {
        console.error("Database error:", courseError);
        throw new Error("Failed to insert course into database");
    }

    // Insert sections into the CourseSections table
    const sectionsData = course.sections.map(section => ({
        course_id: insertedCourse.id,
        title: section.title,
        content: section.content,
    }));

    const { error: sectionsError } = await client.from('course_sections').insert(sectionsData);

    if (sectionsError) {
        console.error("Database error while inserting sections:", sectionsError);
        throw new Error("Failed to insert sections into database");
    }

    return course;
}