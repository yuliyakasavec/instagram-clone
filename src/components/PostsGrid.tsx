'use client';

import { Post } from '@prisma/client';
import Link from 'next/link';
import Masonry from 'react-masonry-css';

export default function PostsGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          768: 2,
        }}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {posts.map((post, index) => {
          return (
            <Link href={`/posts/${post.id}`} key={index}>
              <img src={post.image} alt="" className="mb-4" />
            </Link>
          );
        })}
      </Masonry>
    </div>
  );
}
