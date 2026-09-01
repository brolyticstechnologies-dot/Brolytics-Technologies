import { cn } from "@/lib/utils";

interface ServiceSectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}

function splitTitle(title: string) {
  const words = title.split(" ");
  const splitAt = Math.ceil(words.length / 2);
  return {
    first: words.slice(0, splitAt).join(" "),
    second: words.slice(splitAt).join(" "),
  };
}

export function ServiceSectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: ServiceSectionHeaderProps) {
  const { first, second } = splitTitle(title);

  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "max-w-2xl",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border border-silver-200 bg-white/80 backdrop-blur-sm",
          align === "center" && "mx-auto"
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-silver-500">{eyebrow}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-black tracking-tight leading-[1.1] mb-4">
        <span className="text-silver">{first}</span>
        {second && <span className="text-gradient-red">{" " + second}</span>}
      </h2>

      {description && (
        <p className="text-base md:text-lg text-silver-500 leading-relaxed">{description}</p>
      )}
    </div>
  );
}
