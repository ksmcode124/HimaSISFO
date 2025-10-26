import { SocialMediaLink } from "./components/SocialMediaLink";

const socialMediaList = [
  { platform: "instagram", href: "https://www.instagram.com/the.code124" },
  { platform: "linkedin", href: "https://www.linkedin.com/..." },
  { platform: "whatsapp", href: "https://wa.me/..." },
  { platform: "email", href: "mailto:test@example.com" },
] as const;

export default function BehindTheWeb() {
  return (
    <>
      <div>
        {socialMediaList.map((social) => (
          <SocialMediaLink
            key={social.platform}
            platform={social.platform}
            href={social.href}
          />
        ))}
      </div>
    </>
  );
}