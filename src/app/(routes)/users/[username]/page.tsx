import { getSessionEmail } from '@/actions';
import { auth } from '@/auth';
import ProfilePageContent from '@/components/ProfilePageContent';
import { prisma } from '@/db';

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const session = await auth();

  const profile = await prisma.profile.findFirstOrThrow({
    where: { username },
  });

  const isOurProfile =
    session?.user?.email === profile.email ||
    session?.user?.name === profile.username;

  const ourFollow = await prisma.follower.findFirst({
    where: {
      followingProfileEmail: (await getSessionEmail()) || '',
      followedProfileId: profile.id,
    },
  });

  return (
    <div className="flex justify-around">
      <ProfilePageContent
        ourFollow={ourFollow}
        profile={profile}
        isOurProfile={isOurProfile}
      />
    </div>
  );
}
