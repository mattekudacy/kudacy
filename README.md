# Carl Hanson - Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features a dark theme with cyan accents and a horizontal navigation layout.

## 🚀 Features

- **Modern Design**: Dark theme with professional typography and clean layouts
- **Responsive**: Fully responsive design that works on all devices
- **Fast Performance**: Built with Next.js 15 for optimal performance
- **TypeScript**: Full type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Horizontal Navigation**: Clean navbar instead of sidebar navigation
- **Smooth Scrolling**: Seamless navigation between sections

## 📋 Sections

- **Hero Section**: Professional introduction with statistics and call-to-action
- **About**: Personal background, skills, and services offered
- **Projects**: Showcase of featured projects with tech stacks
- **Contact**: Contact form and social media links
- **Footer**: Simple footer with legal links

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Fonts**: Geist Sans & Geist Mono
- **Development**: ESLint for code quality

## 🏃‍♂️ Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the website.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
└── components/
    ├── Navbar.tsx       # Navigation component
    ├── HeroSection.tsx  # Hero/intro section
    ├── AboutSection.tsx # About me section
    ├── ProjectsSection.tsx # Projects showcase
    ├── ContactSection.tsx  # Contact form
    └── Footer.tsx       # Footer component
```

## 🎨 Customization

### Colors
The portfolio uses a consistent color scheme:
- Primary: `#06b6d4` (cyan-500)
- Background: `#111827` (gray-900)
- Secondary Background: `#1f2937` (gray-800)
- Text: `#ffffff` (white) and `#9ca3af` (gray-400)

### Content
To customize the content:
1. Update personal information in `HeroSection.tsx`
2. Modify projects in `ProjectsSection.tsx`
3. Update skills and services in `AboutSection.tsx`
4. Change contact information in `ContactSection.tsx`

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- Mobile: Default (< 768px)
- Tablet: `md:` (≥ 768px)
- Desktop: `lg:` (≥ 1024px)

## 🚀 Deployment

The portfolio can be deployed on:
- [Vercel](https://vercel.com) (recommended)
- [Netlify](https://netlify.com)
- [AWS](https://aws.amazon.com)
- Any static hosting service

For Vercel deployment:
```bash
npm run build
vercel --prod
```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
