'use server';

import { prisma } from './db';

export async function updateProfile(data: FormData, userEmail: string) {
  // console.log(data.get('username'));
  const newUserInfo = {
    username: data.get('username'),
    name: data.get('name'),
    subtitle: data.get('subtitle'),
    bio: data.get('bio'),
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
