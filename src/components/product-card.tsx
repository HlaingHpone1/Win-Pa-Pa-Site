import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { productImageSrc, type Product } from "@/content/products";

export async function ProductCard({ product }: { product: Product }) {
  const t = await getTranslations("Products");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-brand border border-hairline bg-white transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_24px_48px_-28px_rgba(14,17,11,0.45)] motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <Image
          src={productImageSrc(product.id)}
          alt={t(`items.${product.id}.imageAlt`)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:group-hover:scale-100"
        />
        <p className="text-eyebrow absolute top-4 left-4 rounded-brand bg-primary px-3 py-1.5 text-ink">
          {t(`groups.${product.kind}.title`)}
        </p>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-subtitle">{t(`items.${product.id}.name`)}</h3>
        <p className="text-body mt-3 flex-1">{t(`items.${product.id}.blurb`)}</p>
        <p className="text-eyebrow mt-6 self-start rounded-brand bg-ink px-3 py-2 text-primary">
          {t(`items.${product.id}.from`)}
        </p>
      </div>
    </article>
  );
}
