import Image from 'next/image'
import { Post } from '@/models/post';

interface PostsProps {
  posts: Post[];
}

const Posts: React.FC<PostsProps> = ({ posts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-6">
    {posts.map((post) => (
      <div key={post.id} className="shadow-md rounded-md hover:-translate-y-2 transition-all">
        <div className="mb-2 relative h-48">
          <Image
            alt={post.title}
            src={post.imageUrl}
            fill
            objectFit={'cover'}
            className="rounded-t-md"
          />
        </div>
        <div className="px-4">
          <ul className="flex gap-2">
            {post.categories.map((category) => (
              <li key={category} className="text-blue-500">{category}</li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mb-2">{post.title}</h2>
          <p className="mb-2">{post.excerpt}</p>
        </div>
      </div>
    ))}
  </div>
)

export default Posts