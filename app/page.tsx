import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function HomePage() {
  return (
    <div className="">
      <div className="absolute top-0 left-0 w-full h-64">
        <svg className="absolute top-0 left-0 w-full h-full"></svg>
      </div>
      <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-blue-300 rounded-full opacity-70 animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-blue-400 rounded-full opacity-60 animate-ping"></div>
      <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-ping"></div>
      <div className="relative container mx-auto px-6 py-16 text-center">
        <h1 className="text-5xl font-extrabold text-blue-800">
          Welcome to Harry
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your journey to building better habits starts here.
        </p>
        <div className="mt-8">
          <Link href="/checkin">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
