import { infos } from "@/config/landing";
import { PricingCards } from "@/components/pricing/pricing-cards";
import { PricingFaq } from "@/components/pricing/pricing-faq";
import BentoGrid from "@/components/sections/bentogrid";
import HeroLanding from "@/components/sections/hero-landing";
import InfoLanding from "@/components/sections/info-landing";
import Integrations from "@/components/sections/integrations";
import Powered from "@/components/sections/powered";
import PreviewLanding from "@/components/sections/preview-landing";
import Testimonials from "@/components/sections/testimonials";
import React from "react";

export default function IndexPage() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      {/*
        <Powered /> 
        */}
      <BentoGrid />
      <InfoLanding data={infos[0]} reverse={true} />
      {/* <InfoLanding data={infos[1]} /> */}
      <Integrations />
      <div className="py-16"></div>
      <PricingCards />
      <div className="py-16"></div>
      <PricingFaq />
      <div className="py-16"></div>
      {/*
        <Testimonials />
        */}
    </>
  );
}
