'use client';

import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <div
      onClick={() => router.back()}
      className="bg-black/80 fixed inset-0 z-20 overflow-hidden"
    >
      <div className="bg-white rounded-lg left-8 right-8 top-9 bottom-9 fixed flex flex-col">
        <div className="flex-1 overflow-y-auto rounded-lg">
          <div onClick={(ev) => ev.stopPropagation()} className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
