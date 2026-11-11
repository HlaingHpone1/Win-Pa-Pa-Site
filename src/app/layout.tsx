import type { Metadata } from "next";
import { Noto_Sans_Myanmar, Syne, Work_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { SiteFooter } from "@/components/site-footer";
import { MotionMain } from "@/components/motion-main";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/content/site";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  display: "swap",
});

const notoSansMyanmar = Noto_Sans_Myanmar({
  variable: "--font-myanmar",
  subsets: ["myanmar"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Common");

  return {
    title: {
      default: company.fullName,
      template: `%s · ${company.fullName}`,
    },
    description: t("description"),
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const t = await getTranslations("Common");

  return (
    <html
      lang={locale}
      className={`${syne.variable} ${workSans.variable} ${notoSansMyanmar.variable} h-full font-sans antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Hides animated items until GSAP starts; reveals them anyway if scripts fail. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){document.documentElement.classList.add('motion-ready')},3000);",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <NextIntlClientProvider>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink"
          >
            {t("skipToContent")}
          </a>
          <SiteHeader />
          <MotionMain>{children}</MotionMain>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
