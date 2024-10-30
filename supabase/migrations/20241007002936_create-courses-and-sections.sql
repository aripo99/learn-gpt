-- Create the Courses table
CREATE TABLE public.courses (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the CourseSections table
CREATE TABLE public.course_sections (
    id SERIAL PRIMARY KEY,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL  -- Brief summary
);

-- Create the SectionDetails table
CREATE TABLE public.section_details (
    id SERIAL PRIMARY KEY,
    section_id INTEGER REFERENCES public.course_sections(id) ON DELETE CASCADE,
    full_content TEXT NOT NULL,  -- Detailed explanation for the section
    created_at TIMESTAMPTZ DEFAULT NOW()
);