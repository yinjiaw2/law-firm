import { useTranslations } from "next-intl";
import { HomeButtons } from "../../features/home/components/home-buttons";

export default function HomePage() {
  const t = useTranslations("common");
  return (
    <main className="flex flex-col items-start gap-4 p-8">
      <h1>{t("greeting")}</h1>
      <p>{t("farewell")}</p>
      <HomeButtons />
    </main>
  );
}
