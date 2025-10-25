import PostsGrid from '@/components/PostsGrid';
import { prisma } from '@/db';

export default async function BrowsePage() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });
  return (
    <div>
      <div className="mb-4"></div>
      <PostsGrid posts={posts} />
    </div>
  );
}
