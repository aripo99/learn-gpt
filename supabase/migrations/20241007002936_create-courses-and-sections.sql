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
    id INTEGER NOT NULL,
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,  -- Brief summary
    PRIMARY KEY (course_id, id)
);

-- Create the SectionDetails table
CREATE TABLE public.section_details (
    course_id UUID,
    section_id INTEGER,
    full_content TEXT NOT NULL,  -- Detailed explanation for the section
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (course_id, section_id),
    FOREIGN KEY (course_id, section_id) 
        REFERENCES public.course_sections(course_id, id) 
        ON DELETE CASCADE
);