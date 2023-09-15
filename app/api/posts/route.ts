import { NextResponse } from 'next/server'

import blog from '../blog.json'

const PAGE_SIZE = 9

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const search = searchParams.get('search')
  const categorySlug = searchParams.get('category')
  const page = Number(searchParams.get('page') ?? '1')

  let categoryId: number | undefined
  if (categorySlug) {
    categoryId = blog.categories.find(item => item.slug === categorySlug)?.id
  }

  const filteredPosts = blog.posts
    .filter(post => {
      if (categoryId && !post.categories.includes(categoryId)) {
        return false
      }

      return !(search && !RegExp(`${search}`, 'i').test(post.title));
    })

  const totalPageCount = Math.ceil(filteredPosts.length / PAGE_SIZE)
  const posts = filteredPosts
    .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    .map(post => {
      const populatedCategories = post.categories.map(id => {
        return blog.categories.find(item => item.id === id)?.name
      })

      return {
        ...post,
        categories: populatedCategories
      }
    })

  return NextResponse.json({ posts, totalPageCount })
}