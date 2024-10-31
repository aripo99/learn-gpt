'use server';

import { createClient } from "@/supabase/server";

export default async function getCourses() {
  const client = await createClient();

  const { data: courses, error } = await client.from("courses").select(`
    id,
    name,
    description
  `);

  if (error) {
    throw error;
  }

  return courses;
}