import Button from "@/components/Button";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header solid />
      <main id="main" tabIndex={-1} className="outline-none container-x flex min-h-[80svh] flex-col items-center justify-center text-center">
        <p className="eyebrow text-sea">404</p>
        <h1 className="display mt-6 text-6xl md:text-7xl">Lost at sea</h1>
        <p className="prose-body mt-6 max-w-sm text-deep/70">The page you were looking for has drifted away.</p>
        <div className="mt-10"><Button href="/">Back to shore</Button></div>
      </main>
    </>
  );
}
