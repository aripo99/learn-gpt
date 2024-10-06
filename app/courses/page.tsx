import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const courses = [
  {
    id: 1,
    name: "Introduction to React",
    description: "Learn the basics of React and build your first web application.",
    slug: "intro-to-react"
  },
  {
    id: 2,
    name: "Advanced JavaScript Concepts",
    description: "Deep dive into advanced JavaScript topics like closures, prototypes, and async programming.",
    slug: "advanced-javascript"
  },
  {
    id: 3,
    name: "CSS Mastery",
    description: "Master CSS layouts, animations, and responsive design techniques.",
    slug: "css-mastery"
  }
]

export default function Component() {
  return (
    <div className="container mx-auto py-12 px-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.slug}`} passHref>
            <Card className="h-full transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle>{course.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{course.description}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Click to learn more</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}