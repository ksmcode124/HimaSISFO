import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

const button_variants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-blue-normal text-white-light hover:bg-blue-normal-hover active:bg-blue-normal-active",
        outline:
          "border border-blue-normal text-blue-normal hover:bg-blue-light",
      },
      size: {
        // Selengkapnya, Komunitas Kami: 134x32, padding 4/12, gap 4, radius 24
        sm: "body3 h-8 gap-1 rounded-4xl px-[12px] py-[4px] [&_svg]:size-4",
        // Selengkapnya, Agenda Kegiatan: 232x48, padding 8/16, gap 4, radius 24
        lg: "body1 h-12 gap-1 rounded-4xl px-[16px] py-[8px] [&_svg]:size-5",
        // Gabung Tim: fixed 168x45, radius 14
        cta: "body2 h-[45px] w-[168px] gap-1.5 rounded-xl px-[18px] py-[9px] [&_svg]:size-4",
      },
    },
    defaultVariants: { variant: "primary", size: "sm" },
  },
);

type base_props = VariantProps<typeof button_variants> & {
  with_arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type as_link = base_props & {
  href: string;
} & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "href" | "className" | "children"
  >;

type as_button = base_props & {
  href?: undefined;
} & Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  >;

export type button_props = as_link | as_button;

function Button({
  variant,
  size,
  with_arrow,
  className,
  children,
  ...props
}: button_props) {
  const classes = cn(button_variants({ variant, size }), className);

  const content = (
    <>
      {children}
      {with_arrow && <ArrowRight className="shrink-0" aria-hidden />}
    </>
  );

  if ("href" in props && props.href) {
    const { href, ...link_props } = props as as_link;
    const is_external = /^(https?:|mailto:)/.test(href);

    if (is_external) {
      return (
        <a
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className={classes}
          {...link_props}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} {...link_props}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...(props as as_button)}>
      {content}
    </button>
  );
}

export { Button, button_variants };