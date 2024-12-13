import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
// import DarkMode from "./DarkMode";
import { UserInfoLinks } from "@/utils/links";
import UserIcon from "./UserIcon";
import SignOutLink from "./SignOutlink";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
// import { auth } from "@clerk/nextjs/server";

function LinksDropdown() {
  //   const { userId } = auth();
  //isAdmin is a boolean that checks if the user is an admin,
  // if the user is an admin, the user will be redirected to the admin page
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="bg-muted border-muted flex gap-4 max-w-[100px]"
        >
          <LuAlignLeft className="w-6 h-6" />
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="start" sideOffset={10}>
        <SignedOut>
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left">Register</button>
            </SignUpButton>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <DarkMode />
          </DropdownMenuItem> */}
        </SignedOut>
        <SignedIn>
          {UserInfoLinks.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DarkMode />
          </DropdownMenuItem> */}
        </SignedIn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
export default LinksDropdown;
