import Image from 'next/image';

export default function Avatar({ src }: { src: string }) {
  return (
    <div className="aspect-square overflow-hidden rounded-full">
      <Image src={src} alt="" width={65} height={65} />
    </div>
  );
}
