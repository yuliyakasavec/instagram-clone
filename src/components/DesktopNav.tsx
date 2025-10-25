import {
  CameraIcon,
  HomeIcon,
  LayoutGridIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../app/ig.png';

export default function DesktopNav() {
  return (
    <div className="hidden lg:block px-4 pb-4 w-48 shadow-md shadow-gray-400">
      <div className="top-4 sticky">
        <Image
          src={logo}
          alt="Logo"
          priority
          width={160}
          height={80}
          className="-ml-2 filter brightness-0"
        />
        <div className="ml-1 inline-flex flex-col gap-6 mt-8 *:flex *:items-center *:gap-2">
          <Link href={'/'}>
            <HomeIcon />
            Home
          </Link>
          <Link href={'/search'}>
            <SearchIcon />
            Search
          </Link>
          <Link href={'/browse'}>
            <LayoutGridIcon />
            Browse
          </Link>
          <Link href={'/profile'}>
            <UserIcon />
            Profile
          </Link>
          <Link href={'/create'}>
            <CameraIcon />
            Create
          </Link>
        </div>
      </div>
    </div>
  );
}
