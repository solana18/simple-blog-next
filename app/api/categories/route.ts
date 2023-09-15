import { NextResponse } from 'next/server'

import blog from '../blog.json'

export async function GET() {
  return NextResponse.json(blog.categories)
}