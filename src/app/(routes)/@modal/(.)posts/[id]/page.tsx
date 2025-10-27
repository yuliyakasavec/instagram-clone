import Modal from '@/components/Modal';
import ModalPostContent from '@/components/ModalPostContent';
import Preloader from '@/components/Preloader';
import { Suspense } from 'react';

export default async function PostInModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <Modal>
      <Suspense fallback={<Preloader />}>
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}
