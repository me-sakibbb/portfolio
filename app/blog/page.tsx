import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-foreground mb-12">Blog</h1>

          <div className="space-y-8">
            {posts?.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="bg-card border border-border rounded-lg p-8 hover:border-primary transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      {post.category && (
                        <span className="text-xs font-semibold text-primary mb-2 inline-block">{post.category}</span>
                      )}
                      <h2 className="text-2xl font-bold text-foreground">{post.title}</h2>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{post.excerpt || post.content?.substring(0, 150)}...</p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
