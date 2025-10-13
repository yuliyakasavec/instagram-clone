import { auth, signIn, signOut } from '@/auth';

export default async function Home() {
  const session = await auth();

  return (
    <div className="">
      test
      <br />
      {session && (
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button
            className="border px-4 py-2 bg-red-700 text-white rounded"
            type="submit"
          >
            Logout
          </button>
        </form>
      )}
      {!session && (
        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button
            className="border px-4 py-2 bg-red-700 text-white rounded"
            type="submit"
          >
            Login with Google
          </button>
        </form>
      )}
    </div>
  );
}
