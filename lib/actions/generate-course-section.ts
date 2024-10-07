'use server';

import OpenAI from "openai";

const openai = new OpenAI();

export default async function generateCourseSection(sectionTitle: string, sectionContent: string) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "system",
                content: `Generate a course section based on the section title and content. The section title is "${sectionTitle}" and the section content is "${sectionContent}".`,
            },
        ],
    });
    return {
        sectionDescription: completion.choices[0].message.content,
    }
}