'use client';

import { ScaleLoader } from 'react-spinners';

export default function Preloader() {
  return (
    <>
      <ScaleLoader loading={true} speedMultiplier={4} />
    </>
  );
}
