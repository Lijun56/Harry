import React from "react";

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <span style={{ fontSize: "48px" }}>About</span>
        <br />
        <br />
        Habitude is a free-to-use webapp dedicated to helping you better your
        life through the daily improvement of your personal habits.
        <br />
        <br />
        Check in daily to review your habit progress and add or delete habits
        based on our suggestions and your personal interest. Tap on the zig-zag
        line to view a comprehensive evaluation of your habit progress
        throughout the past week. Tap on the light bulb to browse possible
        habits of interest and recieve supplemental tips.
        <br />
        <br />
        Enjoy Habitude!
      </div>

      <footer className="mt-auto py-4 text-center bg-gray-100">
        <div className="flex items-center justify-center gap-2">
          <a
            href="https://github.com/Lijun56/Harry"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 inline-block mr-2"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View on GitHub
          </a>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          © {new Date().getFullYear()} Habitude. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
