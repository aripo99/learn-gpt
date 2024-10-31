'use server';

import OpenAI from "openai";
import { createClient } from "@/supabase/server";
const openai = new OpenAI();

export default async function generateCourseSection(sectionId: string, sectionTitle: string, sectionContent: string) {
    const client = await createClient();

    const { data: existingCourseSection } = await client
        .from('section_details')
        .select(`
            full_content
        `)
        .eq('section_id', sectionId)
        .single();
    
    if (existingCourseSection) {
        return {sectionDescription: existingCourseSection.full_content};
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `Generate a course section based on the section title and content. The section title is "${sectionTitle}" and the section content is "${sectionContent}".`,
            },
        ],
    });

    const { error } = await client.from('section_details').insert([
        {
            section_id: sectionId,
            full_content: completion.choices[0].message.content,
        },
    ]);

    if (error) {
        throw error;
    }

    return {
        sectionDescription: completion.choices[0].message.content,
    }
}