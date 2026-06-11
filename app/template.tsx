// Page-transition fade implemented with a CSS class (`.animate-fade-in` in
// globals.css, which is disabled under prefers-reduced-motion). This keeps the
// framer-motion runtime out of every route's client bundle. No "use client" needed.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-fade-in">{children}</div>;
}
