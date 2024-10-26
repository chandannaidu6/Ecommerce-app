import Link from 'next/link';
export const metadata = {
  title: 'MyStore',
  description: 'Your one-stop shop for all your needs!',
};
export default function HomePage() {
  return (
    <div className="text-center mt-12">
      <h1 className="text-5xl font-bold mb-6">Welcome to MyStore</h1>
      <p className="text-lg mb-6">Your one-stop shop for all your needs!</p>
      <Link href="/products">
        <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-xl cursor-pointer">
          Shop Now
        </span>
      </Link>
    </div>
  );
}
