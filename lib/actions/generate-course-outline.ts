'use server';

export default async function generateCourseOutline() {
  return {
    id: 1,
    name: 'Generate Course Outline',
    description: 'Generate a course outline based on the user input',
    sections: [
        {
            id: 1,
            title: "Getting Started with React",
            content: "Setup your development environment and create your first React app."
          },
          {
            id: 2,
            title: "React Components and Props",
            content: "Learn about React components, how to create them, and how to pass data using props."
          },
          {
            id: 3,
            title: "State and Lifecycle",
            content: "Understand component state, lifecycle methods, and how to manage dynamic data in your app."
          }
        ]
    };
}