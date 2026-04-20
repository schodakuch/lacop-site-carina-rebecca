// Sanitize user-input URLs (social_links, custom_links, agencies[].url).
export function safeUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return ["http:", "https:"].includes(u.protocol) ? url : null;
  } catch {
    return null;
  }
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  snapchat: "Snapchat",
  vimeo: "Vimeo",
  pinterest: "Pinterest",
  facebook: "Facebook",
  x: "X",
  twitter: "Twitter",
  linkedin: "LinkedIn",
  email: "E-Mail",
  website: "Website",
};

export function getSocialLabel(platform: string): string {
  const key = platform.toLowerCase();
  return SOCIAL_LABELS[key] ?? platform.charAt(0).toUpperCase() + platform.slice(1);
}
