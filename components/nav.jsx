import Link from "next/link";
import Image from "next/image";

const Nav = () => {
  return (
    <nav className="bg-black border-black-200 dark:bg-black-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex gap-2 flex-center">
          <p>word.io</p>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
