import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { productImageSrc, type Product } from "@/content/products";

export async function ProductCard({ product }: { product: Product }) {
  const t = await getTranslations("Products");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-white transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-24px_rgba(17,24,39,0.35)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-paper">
        <Image
          src={productImageSrc(product.id)}
          alt={t(`items.${product.id}.imageAlt`)}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold">{t(`items.${product.id}.name`)}</h3>
        <p className="mt-2 flex-1 text-sm leading-6">{t(`items.${product.id}.blurb`)}</p>
        <p className="mt-6 text-xs font-medium tracking-wide text-ink uppercase">
          {t(`items.${product.id}.from`)}
        </p>
      </div>
    </article>
  );
}
