import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const course = {
  id: 1,
  name: "Introduction to React",
  description: "Learn the basics of React and build your first web application. This course covers fundamental concepts and practical application of React.",
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
}

export default function Course() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
      <p className="text-xl text-muted-foreground mb-8">{course.description}</p>
      
      <h2 className="text-2xl font-semibold mb-6">Course Outline</h2>
      <div className="space-y-4">
        {course.sections.map((section) => (
          <Card key={section.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{section.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}