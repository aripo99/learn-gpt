'use server';

import OpenAI from "openai";
import { createClient } from "@/supabase/server";
const openai = new OpenAI();

export default async function generateCourseSection(courseId: string, sectionId: string) {
    const client = await createClient();

    // First, get the course and section information
    const { data: courseSection, error: sectionError } = await client
        .from('course_sections')
        .select(`
            id,
            title,
            content,
            courses (
                name
            )
        `)
        .eq('course_id', courseId)
        .eq('id', parseInt(sectionId))
        .single();

    if (sectionError) {
        console.error("Error fetching section:", sectionError);
        throw new Error("Failed to fetch section");
    }

    // Check if section_details already exists
    const { data: existingDetails } = await client
        .from('section_details')
        .select('full_content')
        .eq('course_id', courseId)
        .eq('section_id', parseInt(sectionId))
        .single();
    
    if (existingDetails) {
        return {
            courseName: courseSection.courses.name,
            sectionTitle: courseSection.title,
            sectionContent: courseSection.content,
            sectionDescription: existingDetails.full_content
        };
    }

    // Generate new content if it doesn't exist
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: "You are a helpful course content generator. Generate detailed content for the course section.",
            },
            {
                role: "user",
                content: `Generate detailed content for the following course section.
                Section Title: ${courseSection.title}
                Brief Content: ${courseSection.content}
                
                Provide comprehensive explanations, examples, and ensure the content is well-structured using markdown formatting.`,
            },
        ],
    });

    const generatedContent = completion.choices[0].message.content;

    // Insert the generated content
    const { error: insertError } = await client
        .from('section_details')
        .insert([
            {
                course_id: courseId,
                section_id: parseInt(sectionId),
                full_content: generatedContent,
            },
        ]);

    if (insertError) {
        console.error("Error inserting section details:", insertError);
        throw new Error("Failed to save generated content");
    }

    return {
        courseName: courseSection.courses.name,
        sectionTitle: courseSection.title,
        sectionContent: courseSection.content,
        sectionDescription: generatedContent
    };
}