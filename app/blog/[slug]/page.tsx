import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const slug = (await params).slug
  const supabase = await createClient()

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            {post.category && (
              <span className="text-xs font-semibold text-primary mb-4 inline-block">{post.category}</span>
            )}
            <h1 className="text-4xl font-bold text-foreground mb-4">{post.title}</h1>
            <p className="text-muted-foreground">
              {new Date(post.published_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary">
            {post.content?.split("\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
