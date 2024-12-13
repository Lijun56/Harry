import React from "react";

import Link from "next/link";
import { links } from "@/utils/links";

import DarkMode from "./DarkMode";

import LinksDropdown from "./LinksDropdown";
const icon_size = 32;
import {
  IoAddCircleOutline,
  IoAnalyticsOutline,
  IoBulbOutline,
} from "react-icons/io5";
const BottomNav = () => {
  return (
    <nav
      className={`fixed bottom-0 w-full py-4 z-10 bg-zinc-100 dark:bg-zinc-950 border-t dark:border-zinc-800 border-zinc-200 shadow-lg `}
    >
      <div className="flex flex-row justify-around items-center bg-transparent w-full">
        <Link href={links[0].href} className="flex items-center relative">
          <IoAddCircleOutline size={icon_size} />
        </Link>

        <Link href={links[1].href} className="flex items-center">
          <IoAnalyticsOutline size={icon_size} />
        </Link>
        <Link href={links[2].href} className="flex items-center">
          <IoBulbOutline size={icon_size} />
        </Link>
        <LinksDropdown />
        <DarkMode />
      </div>
    </nav>
  );
};

export default BottomNav;
