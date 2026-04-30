import { Header } from "@/components/marketing/Header";
import { PartnerHero } from "@/components/marketing/partner/PartnerHero";
import { PartnerValueProps } from "@/components/marketing/partner/PartnerValueProps";
import { PartnerHowItWorks } from "@/components/marketing/partner/PartnerHowItWorks";
import { PartnerStats } from "@/components/marketing/partner/PartnerStats";
import { PartnerFAQ } from "@/components/marketing/partner/PartnerFAQ";
import { PartnerCTA } from "@/components/marketing/partner/PartnerCTA";
import { Footer } from "@/components/marketing/Footer";

export const metadata = {
  title: "Bli partner — Kobly",
  description:
    "Få kvalitetssjekkede leads direkte til ditt flyttebyrå. Ingen forpliktelser, betal kun for jobbene du tar.",
};

export default function PartnerPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <PartnerHero />
        <PartnerStats />
        <PartnerValueProps />
        <PartnerHowItWorks />
        <PartnerFAQ />
        <PartnerCTA />
      </main>
      <Footer />
    </>
  );
}
