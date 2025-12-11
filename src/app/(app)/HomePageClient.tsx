'use client'

import { useEffect, useState } from 'react'

import { DonationSection } from './home/components/DonationSection'
import { EventsSection } from './home/components/EventsSection'
import { ContactSection } from './home/components/ContactSection'
import { HomePageHeroSection } from './home/components/HomePageHeroSection'
import { ImpactStats, ImpactStatsSection } from './home/components/ImpactStatsSection'
import { LearningCrisisSection } from './home/components/LearningCrisisSection'
import { MissionSection } from './home/components/MissionSection'
import { ProjectsSection } from './home/components/ProjectsSection'
import { StoriesSection } from './home/components/StoriesSection'
import { DONATION_TIERS, EVENTS, GALLERY, MISSION_POINTS, PROJECTS, STORIES } from './home/constants'

export function HomePageClient() {
  const [impactStats, setImpactStats] = useState<ImpactStats>({
    books: 12450,
    backpacks: 5300,
    students: 8900,
  })

  useEffect(() => {
    const interval = window.setInterval(() => {
      setImpactStats((prev) => ({
        books: prev.books + Math.floor(Math.random() * 3),
        backpacks: prev.backpacks + (Math.random() > 0.7 ? 1 : 0),
        students: prev.students + (Math.random() > 0.8 ? 1 : 0),
      }))
    }, 3000)

    return () => {
      window.clearInterval(interval)
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-white text-slate-900">
      <HomePageHeroSection onDonateClick={() => scrollToSection('donate')} onImpactClick={() => scrollToSection('impact')} />
      <LearningCrisisSection />
      <ImpactStatsSection impactStats={impactStats} />
      <MissionSection gallery={GALLERY} points={MISSION_POINTS} />
      <StoriesSection stories={STORIES} />
      <ProjectsSection projects={PROJECTS} />
      <EventsSection events={EVENTS} />
      <ContactSection />
      <DonationSection tiers={DONATION_TIERS} />
    </div>
  )
}
