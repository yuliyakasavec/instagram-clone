import { getSinglePostData } from '@/actions';
import Modal from '@/components/Modal';
import SinglePostContent from '@/components/SinglePostContent';

export default async function PostInModal({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const data = await getSinglePostData(id);

  return (
    <Modal>
      <SinglePostContent {...data} />
    </Modal>
  );
}
