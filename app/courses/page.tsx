import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import getCourses from "@/lib/actions/get-courses"
import { LoadingSpinner } from "@/components/spinner";

export default async function Courses() {
  const courses = await getCourses();

  if (!courses) {
    return (
        <LoadingSpinner/>
    )
}

  return (
    <div className="container mx-auto py-12 px-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Courses</h1>
      <div>
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`} passHref>
            <Card className="h-full transition-shadow hover:shadow-lg mb-4">
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