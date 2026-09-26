// Used only for preview builds under a sub-path (see next.config.ts)
export default function imageLoader({ src, width }: { src: string; width: number }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const url = src.startsWith("/") ? `${base}${src}` : src;
  return url.includes("?") ? url : `${url}?w=${width}`;
}
