import MetObjects from './components/MetObjects';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100">
      <header className="w-full bg-blue-700 text-white py-6 shadow-md">
        <h1 className="text-4xl text-black-700 font-bold text-center">
          Met Museum Collection
        </h1>
      </header>
      <div className="w-full max-w-7xl px-4 py-10">
        <MetObjects />
      </div>
      <footer className="w-full bg-blue-700 text-white py-4 mt-auto text-center">
        <p className="text-sm">
          <a href="https://metmuseum.github.io/">From Met Museum API</a>
        </p>
      </footer>
    </main>
  );
}
