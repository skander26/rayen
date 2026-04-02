/**
 * Place assets under /public/images/... (see folder layout).
 * Fallback URLs keep the experience polished before local files exist.
 */
const FB = {
  hero: 'https://image2url.com/r2/default/images/1775143593045-1f7ed7bb-21c1-4f39-9953-458a16dd8485.jpg',
  about1: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  about2: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  amenity1: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=80',
  amenity2: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=80',
  amenity3: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=80',
  g1: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80',
  g2: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  g3: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80',
  g4: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
  g5: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
  map: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv210EklCThFEBcf1hGSSmwqTubNY4pZK3GQ&s',
} as const

export const imagePaths = {
  hero: '/images/villa-exterior/hero.jpg',
  about: ['/images/villa-interior/about-01.jpg', '/images/villa-interior/about-02.jpg'],
  amenities: [
    '/images/villa-amenities/pool.jpg',
    '/images/villa-amenities/kitchen.jpg',
    '/images/villa-amenities/garden.jpg',
  ],
  gallery: [
    '/images/villa-gallery/gallery-01.jpg',
    '/images/villa-gallery/gallery-02.jpg',
    '/images/villa-gallery/gallery-03.jpg',
    '/images/villa-gallery/gallery-04.jpg',
    '/images/villa-gallery/gallery-05.jpg',
  ],
  map: '/images/villa-map/florence-overview.jpg',
} as const

export const gallerySlides = imagePaths.gallery.map((src, i) => ({
  src,
  fallback: [FB.g1, FB.g2, FB.g3, FB.g4, FB.g5][i] ?? FB.g1,
  alt: `Villa Aurora — gallery ${i + 1}`,
}))

export const fallbacks = FB
