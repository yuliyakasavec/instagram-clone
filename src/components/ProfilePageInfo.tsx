import { CheckIcon, ChevronLeft, CogIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import FollowButton from './FollowButton';
import { Follower, Profile } from '@prisma/client';

export default function ProfilePageInfo({
  profile,
  isOurProfile,
  ourFollow,
}: {
  profile: Profile;
  isOurProfile: boolean;
  ourFollow: Follower | null;
}) {
  return (
    <div>
      <section className="flex justify-between items-center mx-6">
        <button>
          <ChevronLeft />
        </button>
        <div className="font-bold flex items-center gap-2">
          {profile.username}
          <div className="size-5 rounded-full bg-red-600 inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </div>
        <div>
          {isOurProfile && (
            <Link href="/settings">
              <CogIcon />
            </Link>
          )}
        </div>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-orange-300 to-red-600">
          <div className="size-44 p-2 bg-white dark:bg-black rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
              <Image
                src={profile.avatar || ''}
                alt=""
                width={200}
                height={200}
                priority
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">{profile.name}</h1>
        <p className="text-gray-500 mt-1 mb-1">{profile.subtitle}</p>
        <p>
          {profile.bio}
          <br />
          <span className="underline">contact</span>: {profile.email}
        </p>
      </section>
      {!isOurProfile && (
        <section className="flex justify-center my-3">
          <FollowButton ourFollow={ourFollow} profileIdToFollow={profile.id} />
        </section>
      )}
    </div>
  );
}
