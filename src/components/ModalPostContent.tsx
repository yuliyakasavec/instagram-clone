import { getSinglePostData } from '@/actions';
import SinglePostContent from './SinglePostContent';

export default async function ModalPostContent({ postId }: { postId: string }) {
  const data = await getSinglePostData(postId);

  return <SinglePostContent {...data} />;
}
