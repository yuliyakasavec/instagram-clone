'use client';

import Image from 'next/image';
import Masonry from 'react-masonry-css';

const images = [
  'https://picsum.photos/id/32/1024/768',
  'https://picsum.photos/id/33/768/1024',
  'https://picsum.photos/id/34/1024/768',
  'https://picsum.photos/id/35/768/1024',
  'https://picsum.photos/id/36/1024/768',
  'https://picsum.photos/id/37/768/1024',
  'https://picsum.photos/id/38/1024/768',
  'https://picsum.photos/id/39/768/1024',
  'https://picsum.photos/id/40/1024/768',
  'https://picsum.photos/id/41/768/1024',
  'https://picsum.photos/id/42/1024/768',
  'https://picsum.photos/id/43/768/1024',
  'https://picsum.photos/id/44/1024/768',
  'https://picsum.photos/id/45/768/1024',
  'https://picsum.photos/id/46/1024/768',
  'https://picsum.photos/id/47/768/1024',
  'https://picsum.photos/id/48/1024/768',
  'https://picsum.photos/id/49/768/1024',
  'https://picsum.photos/id/50/1024/768',
  'https://picsum.photos/id/51/768/1024',
  'https://picsum.photos/id/52/768/1024',
];

export default function PostsGrid() {
  return (
    <div className="max-w-4xl mx-auto">
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          768: 2,
        }}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-clip-padding"
      >
        {images.map((src, index) => {
          return (
            <div key={index} className="mb-4 break-inside-avoid">
              <Image
                src={src}
                alt=""
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
          );
        })}
      </Masonry>
    </div>
  );
}
