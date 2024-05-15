import { Target } from "lucide-react";
import Link from "next/link";
import React from "react";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Target className="stroke h-8 w-8 hidden sm:block stroke-slate-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r text-3xl from-slate-300 to-slate-600 bg-clip-text  font-bold leading-tight tracking-tighter text-transparent">
        Lazzer
      </p>
    </Link>
  );
}

export default Logo;
