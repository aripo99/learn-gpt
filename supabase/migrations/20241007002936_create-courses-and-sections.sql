-- Create the Courses table
CREATE TABLE public.Courses (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    prompt TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the Sections table
CREATE TABLE public.Sections (
    id UUID PRIMARY KEY,
    course_id UUID REFERENCES public.Courses(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    content TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);