import { User } from "@prisma/client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

interface NavItemProps {
  mobile?: boolean;
  currentUser?: User | null;
}

export default function NavItem({ mobile, currentUser }: NavItemProps) {
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
      {currentUser ? (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button onClick={() => signOut()}>Sign out</button>
        </li>
      ) : (
        <li className="py-2 text-center border-b-4 cursor-pointer">
          <button
            onClick={() => {
              signIn();
            }}
          >
            Sign in
          </button>
        </li>
      )}
    </ul>
  );
}
