import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
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

      <footer className="mt-auto py-6 bg-gradient-to-t from-blue-50 to-transparent">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <a
            href="https://github.com/Lijun56/Harry"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 mr-2"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
          <div className="text-center max-w-2xl">
            <div className="text-sm text-gray-500 mb-2">
              © {new Date().getFullYear()} Harry. Created by Lijun(Stephen) Zhu.
              All rights reserved.
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>
                This application is the intellectual property of Lijun Zhu.
                Unauthorized reproduction, distribution, or modification is
                strictly prohibited.
              </p>
              <p>
                Any unauthorized use of this application or its contents may
                result in legal action.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
