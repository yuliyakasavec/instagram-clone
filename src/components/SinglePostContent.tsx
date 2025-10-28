import Image from 'next/image';
import Comment from './Comment';
import LikesInfo from './LikesInfo';
import { Suspense } from 'react';
import SessionCommentForm from './SessionCommentForm';
import {
  BookMark,
  Comment as CommentModel,
  Like,
  Post,
  Profile,
} from '@prisma/client';
import Preloader from './Preloader';
import BookMarkButton from './BookMarkButton';

export default async function SinglePostContent({
  post,
  authorProfile,
  comments,
  commentsAuthors,
  myLike,
  myBookMark,
}: {
  post: Post;
  authorProfile: Profile;
  comments: CommentModel[];
  commentsAuthors: Profile[];
  myLike: Like | null;
  myBookMark: BookMark | null;
}) {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Image
            className="rounded-md w-full h-auto max-w-full md:max-w-none"
            src={post.image}
            alt={post.description}
            width={600}
            height={800}
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
          <div className="flex text-gray-700 dark:text-gray-400 items-center gap-2 justify-between py-4 mt-4 border-t border-gray-300 dark:border-gray-700">
            <LikesInfo post={post} sessionLike={myLike} />
            <div className="flex items-center">
              <button>
                <BookMarkButton post={post} sessionBookmark={myBookMark} />
              </button>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-300 dark:border-gray-700">
            <Suspense fallback={<Preloader />}>
              <SessionCommentForm postId={post.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
