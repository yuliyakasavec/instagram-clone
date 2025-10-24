import Image from 'next/image';

interface AvatarProps {
  src: string;
  size?: number;
}

export default function Avatar({ src, size = 40 }: AvatarProps) {
  return (
    <div className="aspect-square overflow-hidden rounded-full">
      <Image src={src} alt="" width={size} height={size} />
    </div>
  );
}
