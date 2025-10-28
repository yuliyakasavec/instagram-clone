'use client';

import { bookmarkPost, unbookmarkPost } from '@/actions';
import { Like, Post } from '@prisma/client';
import { BookmarkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BookMarkButton({
  post,
  sessionBookmark,
}: {
  post: Post;
  sessionBookmark: Like | null;
}) {
  const router = useRouter();
  const [bookmarkedByMe, setBookmarkedByMe] = useState(!!sessionBookmark);
  return (
    <form
      action={async () => {
        setBookmarkedByMe((prev) => !prev);
        if (bookmarkedByMe) {
          await unbookmarkPost(post.id);
        } else {
          await bookmarkPost(post.id);
        }

        router.refresh();
      }}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="postId" value={post.id} />
      <button type="submit" className="">
        <BookmarkIcon
          className={
            bookmarkedByMe
              ? ' fill-gray-800 dark:text-white dark:fill-gray-300'
              : 'dark:text-white'
          }
        />
      </button>
    </form>
  );
}
