import Link from "next/link";

export default function NavItem({ mobile }: { mobile?: boolean }) {
  return (
    <ul
      className={` text-base justify-center flex gap-4 w-full items-center ${
        mobile && "flex-col h-full"
      }`}
    >
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/admin">Admin</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <Link href="/user">User</Link>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <button>Sign out</button>
      </li>
      <li className="py-2 text-center border-b-4 cursor-pointer">
        <button>Sign in</button>
      </li>
    </ul>
  );
}
