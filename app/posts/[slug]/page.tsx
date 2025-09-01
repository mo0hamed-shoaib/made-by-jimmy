import Link from "next/link"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { basehub } from "basehub"
import { Post, PostFragment } from "@/app/components/post"
import { MoreStories } from "@/app/components/more-stories"
import { PostMetaFragment } from "@/app/components/hero-post"
import "../../../basehub.config"

export const dynamic = "force-static"
export const revalidate = 30

export async function generateStaticParams() {
  const data = await basehub().query({
    blog: { posts: { items: { _slug: true } } },
  })

  return data.blog.posts.items.map((post) => ({ slug: post._slug }))
}

type PageProps = { params: Promise<{ slug: string }> }

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params
  const postData = await basehub().query({
    meta: {
      title: true,
    },
    blog: {
      posts: {
        __args: { first: 1, filter: { _sys_slug: { eq: slug } } },
        items: PostMetaFragment,
      },
    },
  })
  const [post] = postData.blog.posts.items
  if (!post) notFound()

  const postTitle = post._title
  const postDescription = post.excerpt
  const postOgImage = post.coverImage?.url
  const siteTitle = postData.meta?.title || `BaseHub x v0 Example`

  return {
    title: `${postTitle} | ${siteTitle}`,
    description: postDescription,
    openGraph: {
      title: postTitle,
      description: postDescription,
      images: postOgImage
        ? [
            {
              url: postOgImage,
              width: 1200,
              height: 630,
              alt: postTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: postDescription,
      images: postOgImage ? [postOgImage] : [],
    },
  }
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params

  const [postData, morePostsData] = await Promise.all([
    basehub().query({
      blog: {
        morePosts: true,
        posts: {
          __args: { first: 1, filter: { _sys_slug: { eq: slug } } },
          items: PostFragment,
        },
      },
    }),
    basehub().query({
      blog: {
        posts: {
          __args: {
            filter: { _sys_slug: { notEq: slug } },
            first: 8,
            orderBy: "date__DESC",
          },
          items: PostMetaFragment,
        },
      },
    }),
  ])

  const [post] = postData.blog.posts.items
  if (!post) notFound()

  return (
    <main>
      <section className="container mx-auto px-5">
        <h2 className="mt-16 mb-16 md:mb-12 text-2xl font-bold leading-tight tracking-tight md:text-4xl md:tracking-tighter">
          <Link href="/" className="hover:underline">
            Blog.
          </Link>
        </h2>
        <Post {...post} />
        <hr className="mt-28 mb-24" />
        <MoreStories
          morePosts={morePostsData.blog.posts.items}
          title={postData.blog.morePosts}
        />
      </section>
    </main>
  )
}
