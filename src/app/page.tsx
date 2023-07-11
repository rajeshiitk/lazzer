import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex mt-20 flex-col items-center">
      <h1>Home Page</h1>
      <div className="flex gap-6">
      <button className="bg-gray-500 hover:bg-gray-200 px-4 py-2 rounded-md text-white hover:text-gray-800">
        <Link href="/profile/rajeshii">Profile</Link>
      </button>
      <button className="bg-gray-500 hover:bg-gray-200 px-4 py-2 rounded-md text-white hover:text-gray-800">
        <Link href="/login">Login</Link>
      </button>
      <button className="bg-gray-500 hover:bg-gray-200 px-4 py-2 rounded-md text-white hover:text-gray-800">
        <Link href="/signup">Sign Up</Link>
      </button>
      </div>
    </main>
  );
}
