import PostsGrid from '@/components/PostsGrid';
import { CheckIcon, ChevronLeft, CogIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <main>
      <section className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <div className="font-bold flex items-center gap-2">
          username
          <div className="size-5 rounded-full bg-red-600 inline-flex justify-center items-center text-white">
            <CheckIcon size={16} />
          </div>
        </div>
        <button>
          <CogIcon />
        </button>
      </section>
      <section className="mt-8 flex justify-center">
        <div className="size-48 p-2 rounded-full bg-gradient-to-tr from-orange-300 to-red-600">
          <div className="size-44 p-2 bg-white rounded-full">
            <div className="size-40 aspect-square overflow-hidden rounded-full">
              <Image
                src="https://img.freepik.com/free-photo/front-view-business-woman-suit_23-2148603018.jpg"
                alt=""
                width={200}
                height={200}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="text-center mt-4">
        <h1 className="text-xl font-bold">Susan</h1>
        <p className="text-gray-500 mt-1 mb-1">Business account</p>
        <p>
          Entrepreneur, Wife, Mother
          <br />
          <span className="underline">contact</span>: susan@gmail.com
        </p>
      </section>
      <section className="mt-4">
        <div className="flex justify-center gap-4 font-bold">
          <Link href={''}>Posts</Link>
          <Link className="text-gray-400" href={'/highlights'}>
            Highlights
          </Link>
        </div>
      </section>
      <section className="mt-4">
        <PostsGrid />
      </section>
    </main>
  );
}
