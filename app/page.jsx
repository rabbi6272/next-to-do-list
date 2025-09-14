import Link from "next/link";

export default function Home() {
  return (
    <main className="h-screen w-screen grid place-items-center">
      <div className="glass-card backdrop-blur-md w-[30%] p-4 rounded-lg flex flex-col items-center justify-center">
        <form class="w-full h-1/5 pb-4 flex items-center justify-center gap-2">
          <input
            class="flex-1 placeholder:text-gray-300 border-2 border-gray-300 focus:outline-none focus:border-violet-500 rounded-full text-gray-200 text-center bg-transparent py-1.5 transition-colors duration-300"
            type="text"
            placeholder="Add a task...."
          />
          <button
            class="px-6 py-2 rounded-full bg-violet-500 hover:bg-violet-600 text-white"
            type="submit"
          >
            Add
          </button>
        </form>
        <div class="w-full h-4/5">
          <ul class="overflow-y-auto mx-auto" id="list">
            <li class="list-items flex items-center gap-5 bg-gray-300 p-2 pl-4 rounded-full">
              <input type="checkbox" name="checkbox" />
            </li>
          </ul>
        </div>
      </div>
      <footer className="absolute bottom-0 text-center text-gray-300">
        <p className="mb-2">
          Developed by
          <Link
            href="https://github.com/rabbi6272"
            target="_blank"
            className="ml-1"
          >
            Rabbi
          </Link>
        </p>
      </footer>
    </main>
  );
}
