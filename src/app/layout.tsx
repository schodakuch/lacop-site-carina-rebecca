import type { Metadata } from "next";
import { Manrope, JetBrains_Mono } from "next/font/google";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { ProfileProvider } from "@/context/ProfileContext";
import { getProfile } from "@/lib/lacop";
import "./globals.css";

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carina-rebecca.lacop.site";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const displayName = profile.display_name ?? profile.slug;
  const description =
    profile.bio ??
    `${displayName} — Lookbook Volume 01. Editorial, portraiture and lifestyle across six numbered pages.`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${displayName} — Lookbook`,
      template: `%s · ${displayName}`,
    },
    description,
    authors: [{ name: displayName }],
    creator: displayName,
    alternates: { canonical: "/" },
    openGraph: {
      type: "profile",
      locale: "en_US",
      alternateLocale: ["de_DE"],
      url: SITE_URL,
      siteName: displayName,
      title: `${displayName} — Lookbook`,
      description,
      images: profile.hero_image_url
        ? [{ url: profile.hero_image_url, alt: displayName }]
        : undefined,
    },
    twitter: {
      card: profile.hero_image_url ? "summary_large_image" : "summary",
      title: `${displayName} — Lookbook`,
      description,
      images: profile.hero_image_url ? [profile.hero_image_url] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await getProfile();
  const displayName = profile.display_name ?? profile.slug;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    jobTitle: profile.role,
    url: SITE_URL,
    image: profile.hero_image_url ?? profile.profile_image_url ?? undefined,
    sameAs: Object.values(profile.social_links),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: `${displayName} — Lookbook`,
    url: SITE_URL,
    inLanguage: ["en-US", "de-DE"],
  };

  return (
    <html lang="en">
      <body
        className={`${body.variable} ${mono.variable} bg-paper text-ink min-h-screen flex flex-col`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-ink focus:text-paper focus:px-4 focus:py-2 focus:text-xs focus:uppercase focus:tracking-[0.2em]"
        >
          Skip to content
        </a>
        <ProfileProvider profile={profile}>
          <LanguageProvider>
            <Navigation />
            <main id="main" className="flex-1 relative z-10 md:ml-[220px] pt-14 md:pt-0">
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ProfileProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
