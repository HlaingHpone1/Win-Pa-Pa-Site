import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { company, nav } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-hairline bg-white">
      <Container className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-3 text-ink">
            <Image
              src="/logo_winpapa.jpg"
              alt={`${company.fullName} logo`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="font-display text-lg font-semibold tracking-tight">
              {company.fullName}
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-6">{company.description}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-display text-sm font-semibold text-ink">Pages</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-slate transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-display text-sm font-semibold text-ink">Press</p>
          <address className="mt-4 not-italic text-sm leading-6">
            {company.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="mt-3 block">{company.hours}</span>
            {company.phones.map((phone) => (
              <a
                key={phone}
                href={`tel:${phone.replaceAll("-", "")}`}
                className="mt-1 block text-ink hover:text-primary-dark"
              >
                {phone}
              </a>
            ))}
          </address>
        </div>
      </Container>
      <div className="border-t border-hairline">
        <Container className="flex flex-col gap-2 py-5 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {company.fullName}
          </p>
          <p>Yangon · printing & binding</p>
        </Container>
      </div>
    </footer>
  );
}
