"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Footer from "./Footer";

interface HeroSectionProps {
  children?: React.ReactNode;
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    variants={staggerItem}
    className="font-mono text-xs text-gray-500 dark:text-gray-500 mb-6 font-medium uppercase tracking-widest border-l-2 border-primary/40 pl-3"
  >
    {children}
  </motion.h2>
);

const HeroSection = ({ children }: HeroSectionProps) => {
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(true);
  const [showToggle, setShowToggle] = useState(true);

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
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const scrollingDown = y > lastY;
        setShowToggle(y < 80 || !scrollingDown);
        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
        className={`fixed bottom-8 right-8 z-50 p-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-primary transition-all duration-300 font-mono text-xs ${
          showToggle ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        [TOGGLE_THEME]
      </button>

      <div className="max-w-6xl mx-auto border-x terminal-border min-h-[100dvh]">
        {/* Header */}
        <motion.header
          className="grid grid-cols-2 md:grid-cols-4 border-b terminal-border"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={staggerItem} className="p-4 md:p-6 border-b border-r terminal-border md:border-b-0">
            <p className="font-mono text-[10px] text-gray-500 dark:text-gray-500 mb-1">//portfolio</p>
            <a className="font-mono text-xs md:text-sm hover:text-primary transition-colors" href="https://mattekudacy.is-a.dev">
              mattekudacy.is-a.dev
            </a>
          </motion.div>
          <motion.div variants={staggerItem} className="p-4 md:p-6 border-b terminal-border md:border-b-0 md:border-r">
            <p className="font-mono text-[10px] text-gray-500 dark:text-gray-500 mb-1">//contact</p>
            <a className="font-mono text-xs md:text-sm hover:text-primary transition-colors" href="mailto:cyrus2952@gmail.com">
              cyrus2952@gmail.com
            </a>
          </motion.div>
          <motion.div variants={staggerItem} className="p-4 md:p-6 border-r terminal-border">
            <p className="font-mono text-[10px] text-gray-500 dark:text-gray-500 mb-1">//github</p>
            <a
              className="font-mono text-xs md:text-sm hover:text-primary transition-colors break-all"
              href="https://github.com/mattekudacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/mattekudacy
            </a>
          </motion.div>
          <motion.div variants={staggerItem} className="p-4 md:p-6">
            <p className="font-mono text-[10px] text-gray-500 dark:text-gray-500 mb-1">//location</p>
            <p className="font-mono text-xs md:text-sm flex justify-between items-center">
              <span>Philippines</span>
              <span className="text-[10px] opacity-50 uppercase hidden sm:inline">{time}</span>
            </p>
          </motion.div>
        </motion.header>

        {/* Main content */}
        <main className="p-6 md:p-12">
          {/* Hero - Profile + Name */}
          <section className="flex flex-col md:flex-row items-center gap-8 mb-24 mt-12">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Ambient radial glow behind photo */}
              <div
                className="absolute inset-0 -z-10 rounded-full"
                style={{
                  background: "radial-gradient(circle at center, rgba(52,211,153,0.12) 0%, transparent 70%)",
                  transform: "scale(1.6)",
                  filter: "blur(16px)",
                }}
              />
              <div className="absolute -inset-1 bg-primary/20 rounded-full blur opacity-0 group-hover:opacity-100 transition duration-500" />
              <img
                alt="Cyrus Mante"
                className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-zinc-200 dark:border-zinc-800 grayscale hover:grayscale-0 transition-all duration-500 object-cover relative"
                src="/images/me-cropped.jpg"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <h1 className="font-mono text-3xl md:text-5xl font-light text-zinc-900 dark:text-white mb-2">
                &lt;Cyrus Mante&gt;
              </h1>
              <p className="font-mono text-zinc-500 dark:text-zinc-500 text-lg md:text-xl font-light">
                //ai engineer &amp; data scientist
              </p>
              <a
                href="https://docs.google.com/document/d/1DhbWY81LX608xCGZq3zYWxomhyi0VqsXO1zBR0d8UHQ/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono inline-block mt-4 border border-zinc-200 dark:border-zinc-800 hover:border-primary px-4 py-2 text-xs text-zinc-500 dark:text-zinc-400 hover:text-primary transition-colors"
              >
                [view_resume]
              </a>
            </motion.div>
          </section>

          {/* Sections container */}
          <div className="space-y-20 max-w-4xl">
            {/* About */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={staggerContainer}
            >
              <SectionHeading>//about</SectionHeading>
              <div className="space-y-4 text-zinc-700 dark:text-zinc-400 leading-relaxed max-w-2xl font-light">
                <motion.p variants={staggerItem}>
                  hi, i&apos;m Cyrus — cy for short. i build AI systems end-to-end:
                  from messy data and model experiments all the way to deployed
                  tools that people actually use. i&apos;ve shipped LLM-powered apps,
                  computer vision pipelines, and internal dev tools across consulting,
                  publishing, and education.
                </motion.p>
                <motion.p variants={staggerItem}>
                  outside of work, i speak at conferences, mentor students,
                  and try to make AI less intimidating for people just getting started.
                </motion.p>
              </div>
            </motion.section>

            {/* Work Experience */}
            <section>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <SectionHeading>//work experience</SectionHeading>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={staggerContainer}
              >
                {/* Job 1 */}
                <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                  <div className="md:col-span-3 font-mono text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                    oct 2025 - present
                  </div>
                  <div className="md:col-span-9">
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">Cambridge University Press</span>
                      <span className="font-mono text-zinc-400 dark:text-zinc-600 ml-2">//ai software developer</span>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          build and ship generative AI proof-of-concepts that solve
                          real business problems — covering agentic workflows, prompt
                          engineering, and cloud deployment within a cross-functional CoE.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          write clean, tested Python, conduct code reviews, and
                          integrate no-code tools — keeping delivery fast without
                          cutting corners on reliability or security.
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Job 2 */}
                <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                  <div className="md:col-span-3 font-mono text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                    sept 2024 - sept 2025
                  </div>
                  <div className="md:col-span-9">
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">Accenture</span>
                      <span className="font-mono text-zinc-400 dark:text-zinc-600 ml-2">//ai/ml computational science analyst</span>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          built internal LLM-powered web apps that let developers
                          and managers interact with AI tools without needing to
                          write a single prompt themselves.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          proposed, documented, and deployed AI tools in
                          collaboration with onshore teams — from idea to
                          production with actual adoption.
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Job 3 */}
                <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                  <div className="md:col-span-3 font-mono text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                    sept 2022 - aug 2024
                  </div>
                  <div className="md:col-span-9">
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">Freelance</span>
                      <span className="font-mono text-zinc-400 dark:text-zinc-600 ml-2">//ml engineer &amp; computer vision developer</span>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          found my own clients and shipped computer vision projects
                          for small businesses in logistics, security, education,
                          and finance — owning each one end-to-end, from figuring out
                          what they actually needed to running it in production.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          built a face recognition attendance system on OpenCV and
                          facial embeddings — with liveness detection so a photo
                          couldn&apos;t clock you in — backed by SQLite and a Streamlit
                          dashboard for the people who had to read the reports.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          put license plate recognition on the edge for automated
                          parking billing: YOLO for detection, quantized with TensorRT
                          for ~2x faster inference on an ESP32, EasyOCR for reading
                          the plate, and fees computed server-side.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          digitized receipts for an accounting firm — OCR text cleaned
                          up by Gemini, wrapped in Flutter so it ran on both platforms
                          — and built a webcam-based OMR grader for a school that
                          segments bubble grids and pulls the answer key from a template.
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Job 4 */}
                <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-12">
                  <div className="md:col-span-3 font-mono text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                    dec 2021 - mar 2024
                  </div>
                  <div className="md:col-span-9">
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">Freelancing</span>
                      <span className="font-mono text-zinc-400 dark:text-zinc-600 ml-2">//ml engineer</span>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          built a receipt scanner app in Python + React Native,
                          revamped a car plate detection model improving efficiency
                          by ~40%, and taught an AI workshop as the first AI intern
                          at Cryptex.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          also did early ML work at Dashlabs and AIA — cleaning
                          healthcare data, building a heart disease prediction model
                          from ECG data, and developing a next-best-offer model
                          that improved conversions by ~20%.
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.div>

                {/* Job 5 */}
                <motion.div variants={staggerItem} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-3 font-mono text-zinc-500 dark:text-zinc-600 text-xs mt-1">
                    aug 2022 - present
                  </div>
                  <div className="md:col-span-9">
                    <div className="border border-zinc-200 dark:border-zinc-800 p-4 inline-block mb-6 hover:border-primary transition-colors">
                      <span className="font-medium text-zinc-900 dark:text-zinc-100">Multiple Teaching Gigs</span>
                      <span className="font-mono text-zinc-400 dark:text-zinc-600 ml-2">//data science instructor</span>
                    </div>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          teach data science, ML, and Python to students and
                          working professionals at CIIT, Eskwelabs, and
                          ExcelHelpline — from fundamentals all the way through
                          model deployment.
                        </p>
                      </li>
                      <li className="flex items-start gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 shrink-0" />
                        <p className="text-zinc-700 dark:text-zinc-400 text-sm font-light">
                          maintained a 4.5/5 student satisfaction rating and
                          consistently built hands-on curricula — because good
                          AI education should look like real work, not just slides.
                        </p>
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            </section>

            {/* Technologies */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={staggerContainer}
            >
              <SectionHeading>//technologies</SectionHeading>
              <motion.div variants={staggerItem} className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-6">
                <div>
                  <p className="font-mono font-medium text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">AI/ML</p>
                  <p className="text-sm font-light">Python, TensorFlow, PyTorch, Scikit-learn</p>
                </div>
                <div>
                  <p className="font-mono font-medium text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Frontend</p>
                  <p className="text-sm font-light">React, Next.js, TypeScript, TailwindCSS</p>
                </div>
                <div>
                  <p className="font-mono font-medium text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Backend</p>
                  <p className="text-sm font-light">Node.js, Django, FastAPI, PostgreSQL</p>
                </div>
                <div>
                  <p className="font-mono font-medium text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Cloud</p>
                  <p className="text-sm font-light">AWS, Docker, GCP, Azure</p>
                </div>
                <div>
                  <p className="font-mono font-medium text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">Coding Assistants</p>
                  <p className="text-sm font-light">Claude Code, Codex, Ollama</p>
                </div>
                <div>
                  <p className="font-mono font-medium text-[10px] text-zinc-500 mb-2 uppercase tracking-widest">AI Agent Stack</p>
                  <p className="text-sm font-light">LangChain, LangGraph, Langfuse</p>
                </div>
              </motion.div>
            </motion.section>

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
