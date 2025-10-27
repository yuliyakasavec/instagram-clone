import { CheckIcon, ChevronLeft, CogIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import ProfilePosts from './ProfilePosts';
import { Follower, Profile } from '@prisma/client';
import FollowButton from './FollowButton';
import Preloader from './Preloader';

export default function ProfilePageContent({
  profile,
  isOurProfile = false,
  ourFollow = null,
}: {
  profile: Profile;
  isOurProfile: boolean;
  ourFollow?: Follower | null;
}) {
  return (
    <main>
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
          <div className="size-44 p-2 bg-white rounded-full">
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
      <section className="mt-4">
        <div className="flex justify-center gap-4 font-bold">
          <Link href={''}>Posts</Link>
          <Link className="text-gray-400" href={'/highlights'}>
            Highlights
          </Link>
        </div>
      </section>
      <section className="mt-4">
        <Suspense fallback={<Preloader />}>
          <ProfilePosts email={profile.email} />
        </Suspense>
      </section>
    </main>
  );
}
