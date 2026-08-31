import { hotelConfig } from '@/hotel.config';
import { pageMetadata } from '@/lib/seo';
import { sanityFetch } from '@/lib/sanity';
import { EXPERIENCES_QUERY } from '@/lib/queries';
import { experiences as fallbackExperiences, IMG } from '@/lib/data';
import type { Experience } from '@/lib/types';
import PageHero from '@/components/PageHero';
import ExperienceCard from '@/components/ExperienceCard';
import DirectBookingBanner from '@/components/DirectBookingBanner';
import { FadeUp, StaggerGrid, StaggerItem } from '@/components/Motion';

export const metadata = pageMetadata({
  title: 'Experiences',
  description: `Gin, water, rock and shore — the experiences at ${hotelConfig.name}, all arranged by the house, all starting at the front door.`,
  path: '/experiences',
});

export default async function ExperiencesPage() {
  const experiences = await sanityFetch<Experience[]>(EXPERIENCES_QUERY, {}, fallbackExperiences);

  return (
    <>
      <PageHero
        eyebrow="The bay"
        title="Days, properly spent"
        subtitle="Everything below starts at the front door and is arranged by the house. Bring boots; we have the rest."
        image={IMG.walk}
      />
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <FadeUp>
          <p className="max-w-2xl font-body text-base font-light leading-body text-ink/80">
            The coast earns its keep. The rock holds gannets, the water holds seals, the
            cellar holds the house gin, and the team holds firm opinions on the correct order
            in which to enjoy them. Book ahead or decide at breakfast — both work.
          </p>
        </FadeUp>
        <StaggerGrid className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {experiences.map((exp) => (
            <StaggerItem key={exp.slug}><ExperienceCard experience={exp} /></StaggerItem>
          ))}
        </StaggerGrid>
      </section>
      <DirectBookingBanner />
    </>
  );
}
