"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

const Navbar = () => {
  return (
    <nav className="w-full bg-sky-950 shadow-md p-4 flex items-center justify-between">
      {/* Logo - ChordRecords */}
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/gallery" className="text-2xl font-bold text-orange-400 tracking-wide">
              ChordRecords
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Add Record Button */}
      <Button className="text-lg bg-orange-400 text-sky-950 font-semibold hover:bg-orange-500">
        Add Record
      </Button>
    </nav>
  );
};

export default Navbar;
