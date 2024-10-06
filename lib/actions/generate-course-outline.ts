'use server';

import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

const CourseOutlineEvent = z.object({
    id: z.number(),
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


export default async function generateCourseOutline(prompt: string) {
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
    return course;
}