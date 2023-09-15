import SearchForm from '@/components/blog/SearchForm';
import Posts from '@/components/blog/Posts';
import Pagination from '@/components/blog/Pagination';

async function getCategories() {
  const res = await fetch(`${process.env.SERVER_URL}/api/categories`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

async function getPosts(searchParams: { search: string; category: string; page: string; }) {
  const urlParams = new URLSearchParams(searchParams)

  const res = await fetch(`${process.env.SERVER_URL}/api/posts?${urlParams.toString()}`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Blog({ searchParams }: { searchParams: { search: string; category: string; page: string; } }) {

  const categories = await getCategories()

  const { posts, totalPageCount } = await getPosts(searchParams)

  return (
    <div className="container max-w-screen-lg mx-auto p-4 sm:p-6">
      <h1 className="text-center text-2xl font-bold mb-4">Blog</h1>

      <SearchForm defaultSearch={searchParams.search} defaultCategory={searchParams.category} categories={categories} />

      {
        posts.length > 0 ? (
          <>
            <Posts posts={posts} />

            <Pagination page={searchParams.page} totalPageCount={totalPageCount} />
          </>
        ) : (
          <p>No blog posts found.</p>
        )
      }
    </div>
  )
}
