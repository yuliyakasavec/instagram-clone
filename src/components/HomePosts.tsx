import { prisma } from '@/db';
import { Follower, Profile } from '@prisma/client';
import Image from 'next/image';
import Avatar from './Avatar';
import LikesInfo from './LikesInfo';
import { getSessionEmailOrThrow } from '@/actions';
import Link from 'next/link';
import BookMarkButton from './BookMarkButton';

export default async function HomePosts({
  follows,
  profiles,
}: {
  follows: Follower[];
  profiles: Profile[];
}) {
  const posts = await prisma.post.findMany({
    where: {
      author: { in: profiles.map((p) => p.email) },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 100,
  });
  const likes = await prisma.like.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: posts.map((p) => p.id) },
    },
  });

  const bookmarks = await prisma.bookMark.findMany({
    where: {
      author: await getSessionEmailOrThrow(),
      postId: { in: posts.map((p) => p.id) },
    },
  });

  return (
    <div className="max-w-md mx-auto flex flex-col gap-12">
      {posts.map((post) => {
        const profile = profiles.find((p) => p.email === post.author);
        return (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <Image
                className="block rounded-lg shadow-md shadow-black/50"
                src={post.image}
                alt=""
                width={400}
                height={400}
              />
            </Link>
            <div className="flex items-center gap-2 mt-4 justify-between">
              <div className="flex gap-2 items-center">
                <Avatar src={profile?.avatar || ''} size={34} />
                <Link
                  className="font-bold text-gray-700 dark:text-gray-300"
                  href={`/users/${profile?.username}`}
                >
                  {profile?.name}
                </Link>
              </div>
              <div className="flex gap-2 items-center">
                <LikesInfo
                  post={post}
                  sessionLike={
                    likes.find((like) => like.postId === post.id) || null
                  }
                  showText={false}
                />
                <BookMarkButton
                  post={post}
                  sessionBookmark={
                    bookmarks.find((b) => b.postId === post.id) || null
                  }
                />
              </div>
            </div>
            <p className="mt-2 text-slate-600 dark:text-gray-400">
              {post.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
