import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

const Navbar = () => {

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 dark:border-neutral-950 bg-white/75 dark:bg-neutral-900 backdrop-blur-lg transition-all">
      <div className="wrapper flex h-14 items-center justify-between border-b border-zinc-200 dark:border-neutral-950">
        <Link href="/" className="flex z-40 text-xl text-amber-700 font-bold">
          <span>Intelink.</span>
        </Link>

        {/* <MobileNav isAuth={!!user} /> */}

        <div className="hidden items-center space-x-8 sm:flex">
          <div className="text-sm font-semibold cursor-pointer">Pricing</div>
          <Link
            className={buttonVariants({
              size: "sm",
              className: "py-2",
            })}
            href="/dashboard"
          >
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <SignedOut>
            <SignInButton>
              <div className="text-sm font-semibold cursor-pointer">
                Sign In
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          <div className="ml-5">
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
