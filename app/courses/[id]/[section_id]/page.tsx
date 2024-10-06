interface CourseSectionProps {
    title: string
    description: string
    content: string
}

export default function CourseSection({ 
    title = "Introduction to GPT",
    description = "In this section, you will learn the basics of GPT and how to create interactive courses with it.",
    content = "GPT stands for Generative Pre-trained Transformer. It is a type of artificial intelligence that can generate human-like text based on the input it receives. GPT is trained on a large dataset of text from the internet, which allows it to generate text that is coherent and contextually relevant. In this section, you will learn how to use GPT to create interactive courses that engage and educate your audience."
  }: CourseSectionProps) {
    return (
      <div className="max-w-2xl mx-auto p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-2 text-gray-500">{title}</h2>
        <p className="text-sm text-gray-100 mb-4">{description}</p>
        <div className="border-t pt-4">
          <p>{content}</p>
        </div>
      </div>
    )
  }