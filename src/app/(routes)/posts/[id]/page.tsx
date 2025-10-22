import Comment from '@/components/Comment';
import SessionCommentForm from '@/components/SessionCommentForm';
import { prisma } from '@/db';
import Image from 'next/image';
import { Suspense } from 'react';
import { uniq } from 'lodash';

export default async function SinglePostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const post = await prisma.post.findFirstOrThrow({
    where: { id },
  });
  const authorProfile = await prisma.profile.findFirstOrThrow({
    where: { email: post.author },
  });
  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
  });
  const commentsAuthors = await prisma.profile.findMany({
    where: { email: { in: uniq(comments.map((c) => c.author)) } },
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Image
            className="rounded-md w-full h-auto max-w-full md:max-w-none"
            src={post.image}
            alt={post.description}
            width={800}
            height={600}
          />
        </div>
        <div>
          <Comment
            createdAt={post.createdAt}
            text={post.description}
            authorProfile={authorProfile}
          />
          <div className="pt-4 flex flex-col gap-4">
            {comments.map((comment) => (
              <div key={comment.id}>
                <Comment
                  createdAt={comment.createdAt}
                  text={comment.text}
                  authorProfile={commentsAuthors.find(
                    (a) => a.email === comment.author
                  )}
                />
              </div>
            ))}
          </div>
          <div className="pt-8 border-t mt-8 border-t-gray-400">
            <Suspense>
              <SessionCommentForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
