import { PowerlineGroup, PowerlineSegment } from "@/components/ui/Powerline";

interface PageHeaderProps {
  /** Short page label shown in the Powerline badge, e.g. "SERVICES" */
  label: string;
  icon: React.ReactNode;
  /** Secondary badge text, e.g. "FIXED QUOTES · AR / EN" */
  meta?: string;
  title: string;
  intro?: React.ReactNode;
}

/** The same header on every top-level page: badge → H1 → intro */
export function PageHeader({ label, icon, meta, title, intro }: PageHeaderProps) {
  return (
    <header className="pt-12 md:pt-16 pb-12 md:pb-14">
      <PowerlineGroup className="mb-8">
        <PowerlineSegment color="secondary" icon={icon}>
          {label}
        </PowerlineSegment>
        {meta && <PowerlineSegment color="surface">{meta}</PowerlineSegment>}
      </PowerlineGroup>
      <h1 className="heading-natural text-4xl md:text-6xl font-extrabold mb-6 max-w-4xl leading-[1.05]">
        {title}
      </h1>
      {intro && (
        <p className="max-w-2xl font-[family-name:var(--font-inter)] text-lg!">{intro}</p>
      )}
    </header>
  );
}
