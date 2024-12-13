// Container, this component, is used to wrap its children
// with a div that has specific styling classes applied to
// it.The cn function from @/lib/utils is used to conditionally apply additional classes passed via the className prop.
import React from "react";
import { cn } from "@/lib/utils";

function container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // cn() function takes any number of arguments (which are expected to be strings or falsy values), filters out any falsy values (like false, null, undefined, 0, NaN, and empty string ""), and then joins the remaining strings into a single string with spaces in between.
  return (
    <div className={cn("mx-auto max-w-6xl px-4", className)}>{children}</div>
  );
}

export default container;
