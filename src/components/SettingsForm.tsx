'use client';

import { updateProfile } from '@/actions';
import { Profile } from '@prisma/client';
import { Button, Switch, TextArea, TextField } from '@radix-ui/themes';
import { CloudUploadIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function SettingsForm({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const fileInRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(profile?.avatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(theme === 'dark');
  }, []);

  useEffect(() => {
    if (file) {
      setIsUploading(true);
      const data = new FormData();
      data.set('file', file);
      fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then((response) => {
        response.json().then((url) => {
          setAvatarUrl(url);
          setIsUploading(false);
        });
      });
    }
  }, [file]);

  const handleThemeChange = (isDark: boolean) => {
    const theme = isDark ? 'dark' : 'light';
    const html = document.querySelector('html');

    if (html) {
      html.dataset.theme = theme;
      html.classList.toggle('dark', isDark);
    }

    localStorage.setItem('theme', theme);
    setIsDarkMode(isDark);
  };

  return (
    <form
      action={async (data: FormData) => {
        await updateProfile(data);
        router.push('/profile');
        router.refresh();
      }}
    >
      <input type="hidden" name="avatar" value={avatarUrl || ''} />
      <div className="flex gap-4 items-center">
        <div>
          <div className="bg-gray-400 size-24 rounded-full overflow-hidden aspect-square ring-2 ring-gray-300 dark:ring-gray-500">
            <Image
              src={avatarUrl || ''}
              alt="Profile avatar"
              width={96}
              height={96}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </div>
        <div>
          <input
            type="file"
            ref={fileInRef}
            className="hidden"
            onChange={(ev) => setFile(ev.target.files?.[0] || null)}
          />
          <Button
            disabled={isUploading}
            type="button"
            variant="surface"
            onClick={() => fileInRef.current?.click()}
            className="relative disabled:opacity-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="text-white dark:text-white">Uploading...</span>
              </>
            ) : (
              <>
                <CloudUploadIcon className="w-4 h-4" />
                <span>Change avatar</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <p className="mt-2 font-bold">username</p>
      <TextField.Root
        name="username"
        defaultValue={profile?.username || ''}
        placeholder="your_username"
      />
      <p className="mt-2 font-bold">name</p>
      <TextField.Root
        name="name"
        defaultValue={profile?.name || ''}
        placeholder="Susan Del"
      />
      <p className="mt-2 font-bold">subtitle</p>
      <TextField.Root
        name="subtitle"
        defaultValue={profile?.subtitle || ''}
        placeholder="Graphic designer"
      />
      <p className="mt-2 font-bold">bio</p>
      <TextArea name="bio" defaultValue={profile?.bio || ''} />
      <label className="flex gap-2 items-center mt-2">
        <span>Dark mode </span>
        <Switch checked={isDarkMode} onCheckedChange={handleThemeChange} />
      </label>
      <div className="mt-4 flex justify-center">
        <Button variant="solid">Save settings</Button>
      </div>
    </form>
  );
}
