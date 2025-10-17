import { NextResponse, type NextRequest } from 'next/server';
import { pinata } from '@/config';

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const { cid } = await pinata.upload.public.file(file, {
      groupId: '87b2b979-c4ce-4e42-9d00-12abcf7dc071',
    });
    const fileUrl = `https://${process.env.NEXT_PUBLIC_GATEWAY_URL}/files/${cid}`;
    return NextResponse.json(fileUrl, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
