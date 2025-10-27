import { Follower, Profile } from '@prisma/client';
import { Avatar } from '@radix-ui/themes';
import { PlusIcon } from 'lucide-react';

export default async function HomeTopRow({
  follows,
  profiles,
}: {
  follows: Follower[];
  profiles: Profile[];
}) {
  return (
    <div className="flex gap-3 justify-center max-w-full overflow-x-auto">
      <div>
        <button className="size-[92px] bg-gradient-to-tr from-orange-300 to-red-600 text-white rounded-full flex items-center justify-center">
          <PlusIcon size="42" />
        </button>
        <p className="text-center text-gray-400 text-sm">New story</p>
      </div>
      {profiles.map((profile) => (
        <div key={profile.id}>
          <div className="p-1 rounded-full bg-gradient-to-tr from-orange-300 to-red-600">
            <div className="p-0.5 bg-white rounded-full">
              <Avatar
                size="6"
                radius="full"
                fallback={'avatar'}
                src={profile.avatar || ''}
              />
            </div>
          </div>
          <p className="text-center text-gray-400 text-sm">
            {profile.username}
          </p>
        </div>
      ))}
    </div>
  );
}
