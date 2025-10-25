import Modal from '@/components/Modal';
import ModalPostContent from '@/components/ModalPostContent';
import { Suspense } from 'react';

export default async function PostInModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <Modal>
      <Suspense fallback="Loading...">
        <ModalPostContent postId={id} />
      </Suspense>
    </Modal>
  );
}
