import type { MetadataRoute } from 'next'

const BASE_URL = 'https://cabyldrs.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const services = ['plumbing', 'roofing', 'cleaning', 'pest-control', 'hvac', 'electrical', 'handyman', 'painting', 'junk-removal']
  const counties = ['orange-county', 'los-angeles-county']

  // Static pages
  const staticPages = [
    { url: BASE_URL, lastModified: new Date('2025-06-01'), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: `${BASE_URL}/#services`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#how-it-works`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#booking`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${BASE_URL}/#contact`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/#about`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/#partner`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/#emergency`, lastModified: new Date('2025-06-01'), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  // Service pages
  const servicePages = services.map(service => ({
    url: `${BASE_URL}/#service/${service}`,
    lastModified: new Date('2025-06-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // County pages
  const countyPages = counties.map(county => ({
    url: `${BASE_URL}/#${county}`,
    lastModified: new Date('2025-06-01'),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // County + Service combo pages
  const countyServicePages = counties.flatMap(county =>
    services.map(service => ({
      url: `${BASE_URL}/#county/${county}/service/${service}`,
      lastModified: new Date('2025-06-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  return [...staticPages, ...servicePages, ...countyPages, ...countyServicePages]
}
