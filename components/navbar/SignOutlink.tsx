"use client";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

function SignOutLink() {
  return (
    <SignOutButton>
      <Link href="/" className="w-full text-left">
        Logout
      </Link>
    </SignOutButton>
  );
}
export default SignOutLink;
