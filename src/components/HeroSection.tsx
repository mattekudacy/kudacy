"use client";

import React, { useEffect, useState, useRef } from "react";
import Footer from "./Footer";

interface HeroSectionProps {
  children?: React.ReactNode;
}

const HeroSection = ({ children }: HeroSectionProps) => {
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(true);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [nameVisible, setNameVisible] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    // Trigger name animation after mount
    setTimeout(() => setNameVisible(true), 300);

    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <>
      {/* Scanline effect */}
      <div className="scanline" />

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 z-50 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-colors text-xs"
      >
        [TOGGLE_THEME]
      </button>

      <div className="max-w-6xl mx-auto border-x terminal-border min-h-screen">
        {/* Header */}
        <header className="grid grid-cols-2 md:grid-cols-4 border-b terminal-border">
          <div className="p-4 md:p-6 border-b border-r terminal-border md:border-b-0">
            <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-1">
              //portfolio
            </p>
            <a
              className="text-xs md:text-sm hover:text-primary transition-colors"
              href="#"
            >
              mattekudacy.is-a.dev
            </a>
          </div>
          <div className="p-4 md:p-6 border-b terminal-border md:border-b-0 md:border-r">
            <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-1">
              //contact
            </p>
            <a
              className="text-xs md:text-sm hover:text-primary transition-colors"
              href="mailto:cyrus2952@gmail.com"
            >
              cyrus2952@gmail.com
            </a>
          </div>
          <div className="p-4 md:p-6 border-r terminal-border md:border-r">
            <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-1">
              //github
            </p>
            <a
              className="text-xs md:text-sm hover:text-primary transition-colors break-all"
              href="https://github.com/mattekudacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/mattekudacy
            </a>
          </div>
          <div className="p-4 md:p-6">
            <p className="text-[10px] text-gray-500 dark:text-gray-500 mb-1">
              //location
            </p>
            <p className="text-xs md:text-sm flex justify-between items-center">
              <span>Philippines</span>
              <span className="text-[10px] opacity-50 uppercase hidden sm:inline">{time}</span>
            </p>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6 md:p-12">
          {/* Hero - Profile + Name */}
          <section className="flex flex-col md:flex-row items-center gap-8 mb-24 mt-12">
            <div className="relative group">
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <img
                alt="Cyrus Mante"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-zinc-200 dark:border-zinc-800 grayscale hover:grayscale-0 transition-all duration-500 object-cover relative"
                src="/images/me.jpg"
              />
            </div>
            <div>
              <h1
                ref={nameRef}
                className={`text-3xl md:text-5xl font-light text-zinc-900 dark:text-white mb-2 transition-opacity duration-500 ${nameVisible ? "opacity-100" : "opacity-0"}`}
              >
                &lt;Cyrus Mante&gt;
              </h1>
              <p className="text-zinc-500 dark:text-zinc-500 text-lg md:text-xl font-light">
                //ai engineer &amp; data scientist
              </p>
              <a
                href="https://docs.google.com/document/d/1DhbWY81LX608xCGZq3zYWxomhyi0VqsXO1zBR0d8UHQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 border border-zinc-200 dark:border-zinc-800 hover:border-primary px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
              >
                [view_resume]
              </a>
            </div>
          </section>

          {/* Sections container */}
          <div className="space-y-20 max-w-4xl">
            {/* About */}
            <section>
              <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-6 font-medium uppercase tracking-widest">
                //about
              </h2>
              <div className="space-y-4 text-zinc-700 dark:text-zinc-400 leading-relaxed max-w-2xl">
                <p>
                  hi, i&apos;m Cyrus — cy for short. i build AI systems end-to-end:
                  from messy data and model experiments all the way to deployed
                  tools that people actually use. i&apos;ve shipped LLM-powered apps,
                  computer vision pipelines, and internal dev tools across consulting,
                  publishing, and education.
                </p>
                <p>
                  outside of work, i speak at conferences, mentor students,
                  and try to make AI less intimidating for people just getting started.
                </p>
              </div>
            </section>

            {/* Work Experience */}
            <section>
              <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-8 font-medium uppercase tracking-widest">
                //work experience
              </h2>

              {/* Job 1 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                <div className="md:col-span-3 text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                  oct 2025 - present
                </div>
                <div className="md:col-span-9">
                  <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                    <span className="text-zinc-900 dark:text-zinc-100">
                      Cambridge University Press
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600 ml-2">
                      //ai software developer
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        build and ship generative AI proof-of-concepts that solve
                        real business problems — covering agentic workflows, prompt
                        engineering, and cloud deployment within a cross-functional CoE.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        write clean, tested Python, conduct code reviews, and
                        integrate no-code tools — keeping delivery fast without
                        cutting corners on reliability or security.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 2 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                <div className="md:col-span-3 text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                  sept 2024 - sept 2025
                </div>
                <div className="md:col-span-9">
                  <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                    <span className="text-zinc-900 dark:text-zinc-100">
                      Accenture
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600 ml-2">
                      //ai/ml computational science analyst
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        built internal LLM-powered web apps that let developers
                        and managers interact with AI tools without needing to
                        write a single prompt themselves.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        proposed, documented, and deployed AI tools in
                        collaboration with onshore teams — from idea to
                        production with actual adoption.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 3 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                <div className="md:col-span-3 text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                  dec 2021 - mar 2024
                </div>
                <div className="md:col-span-9">
                  <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                    <span className="text-zinc-900 dark:text-zinc-100">
                      Freelancing
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600 ml-2">
                      //ml engineer
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        built a receipt scanner app in Python + React Native,
                        revamped a car plate detection model improving efficiency
                        by ~40%, and taught an AI workshop as the first AI intern
                        at Cryptex.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        also did early ML work at Dashlabs and AIA — cleaning
                        healthcare data, building a heart disease prediction model
                        from ECG data, and developing a next-best-offer model
                        that improved conversions by ~20%.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Job 4 */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-3 text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                  aug 2022 - present
                </div>
                <div className="md:col-span-9">
                  <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                    <span className="text-zinc-900 dark:text-zinc-100">
                      Multiple Teaching Gigs
                    </span>
                    <span className="text-zinc-400 dark:text-zinc-600 ml-2">
                      //data science instructor
                    </span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        teach data science, ML, and Python to students and
                        working professionals at CIIT, Eskwelabs, and
                        ExcelHelpline — from fundamentals all the way through
                        model deployment.
                      </p>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                      <p className="text-zinc-700 dark:text-zinc-400 text-sm">
                        maintained a 4.5/5 student satisfaction rating and
                        consistently built hands-on curricula — because good
                        AI education should look like real work, not just
                        slides.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technologies */}
            <section>
              <h2 className="text-xs text-gray-500 dark:text-gray-500 mb-8 font-medium uppercase tracking-widest">
                //technologies
              </h2>
              <div className="flex flex-wrap gap-x-12 gap-y-6">
                <div>
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">
                    AI/ML
                  </p>
                  <p className="text-sm">
                    Python, TensorFlow, PyTorch, Scikit-learn
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">
                    Frontend
                  </p>
                  <p className="text-sm">
                    React, Next.js, TypeScript, TailwindCSS
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">
                    Backend
                  </p>
                  <p className="text-sm">
                    Node.js, Django, FastAPI, PostgreSQL
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">
                    Cloud
                  </p>
                  <p className="text-sm">AWS, Docker, GCP, Azure</p>
                </div>
              </div>
            </section>

            {/* Child sections (Projects, Blog, Contact) */}
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default HeroSection;
