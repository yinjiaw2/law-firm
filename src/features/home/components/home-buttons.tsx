"use client";

import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Globe, Mail } from "lucide-react";
import { Link, usePathname, useRouter } from "@/src/i18n/navigation";

export function HomeButtons() {
  const t = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggleLanguage() {
    const nextLocale = locale === "en" ? "zh" : "en";
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/contact">
        <Button variant="default">
          <Mail className="w-4 h-4 mr-2" />
          {t("contactButton")}
        </Button>
      </Link>
      <Button variant="outline" onClick={toggleLanguage}>
        <Globe className="w-4 h-4 mr-2" />
        {t("languageToggle")}
      </Button>
    </div>
  );
}
