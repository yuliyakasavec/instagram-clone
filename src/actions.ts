'use server';

import { prisma } from './db';

export async function updateProfile(data: FormData, userEmail: string) {
  // console.log(data.get('username'));
  const newUserInfo = {
    username: data.get('username') as string,
    name: data.get('name') as string,
    subtitle: data.get('subtitle') as string,
    bio: data.get('bio') as string,
  };
  await prisma.profile.upsert({
    where: {
      email: userEmail,
    },
    update: newUserInfo,
    create: {
      email: userEmail,
      ...newUserInfo,
    },
  });
}
