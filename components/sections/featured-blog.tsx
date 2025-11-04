import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedBlog() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(3)

  if (!posts || posts.length === 0) return null

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Latest Blog Posts</h2>
          <Link href="/blog">
            <Button variant="outline">View All Posts</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-card border border-border rounded-lg p-6 flex flex-col">
              <span className="text-xs font-semibold text-primary mb-2">{post.category}</span>
              <h3 className="font-bold text-lg text-foreground mb-2">{post.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">
                {post.excerpt || post.content?.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {new Date(post.published_at).toLocaleDateString()}
                </span>
                <Link href={`/blog/${post.slug}`}>
                  <Button size="sm" variant="ghost">
                    Read More →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
