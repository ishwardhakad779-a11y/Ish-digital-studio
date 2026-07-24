import { useEffect, useState } from 'react'

import CustomCursor from './components/effects/CustomCursor'
import Particles from './components/effects/Particles'
import MouseGlow from './components/effects/MouseGlow'
import AnimatedGrid from './components/effects/AnimatedGrid'
import Loader from './components/effects/Loader'
import ScrollProgress from './components/effects/ScrollProgress'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppButton from './components/ui/WhatsAppButton'
import CallButton from './components/ui/CallButton'
import BackToTop from './components/ui/BackToTop'
import ChatWidget from './components/ui/ChatWidget'

import Hero from './components/sections/Hero'
import Stats from './components/sections/Stats'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import About from './components/sections/About'
import WhyChooseUs from './components/sections/WhyChooseUs'
import Process from './components/sections/Process'
import Pricing from './components/sections/Pricing'
import PricingCalculator from './components/sections/PricingCalculator'
import Testimonials from './components/sections/Testimonials'
import FAQ from './components/sections/FAQ'
import Contact from './components/sections/Contact'

function MainSite() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="main-site-root relative min-h-screen bg-[#020617] text-white font-body">
      <Loader loading={loading} />
      <ScrollProgress />
      <CustomCursor />
      <AnimatedGrid />
      <Particles />
      <MouseGlow />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Services />
          <Portfolio />
          <About />
          <WhyChooseUs />
          <Process />
          <Pricing />
          <PricingCalculator />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
      </div>

      <WhatsAppButton />
      <CallButton />
      <BackToTop />
      <ChatWidget />
    </div>
  )
}

export default MainSite