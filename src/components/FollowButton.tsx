'use client';

import { followProfile, unfollowProfile } from '@/actions';
import { Follower } from '@prisma/client';
import { Button } from '@radix-ui/themes';
import { UserMinusIcon, UserPlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FollowButton({
  profileIdToFollow,
  ourFollow,
}: {
  profileIdToFollow: string;
  ourFollow: Follower | null;
}) {
  const router = useRouter();
  const [isFollowed, setIsFollowed] = useState<boolean>(!!ourFollow);

  return (
    <form
      action={async () => {
        setIsFollowed((prev) => !prev);
        if (isFollowed) {
          await unfollowProfile(profileIdToFollow);
        } else {
          await followProfile(profileIdToFollow);
        }
        router.refresh();
      }}
    >
      <Button
        size="3"
        style={{
          background: 'linear-gradient(to top right, #fdba74, #dc2626 80%)',
        }}
      >
        {isFollowed ? <UserMinusIcon /> : <UserPlusIcon />}

        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    </form>
  );
}
