import { getTranslations } from "next-intl/server";
import { aboutProcess } from "@/content/site";

export async function ProcessSteps() {
  const t = await getTranslations("About");

  return (
    <ol data-reveal-group className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {aboutProcess.map((item) => (
        <li
          key={item.id}
          className="group flex flex-col rounded-brand border border-white/10 bg-ink-2 p-6 transition-colors duration-300 ease-out hover:border-primary/60"
        >
          <p className="text-display leading-none! text-primary/25 transition-colors duration-300 ease-out group-hover:text-primary">
            {item.step}
          </p>
          <h3 className="text-subtitle mt-8 text-white">
            {t(`process.${item.id}.title`)}
          </h3>
          <p className="text-body mt-3 text-white/65">{t(`process.${item.id}.body`)}</p>
        </li>
      ))}
    </ol>
  );
}
