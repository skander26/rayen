/**
 * Place assets under /public/images/... (see folder layout).
 * Fallback URLs keep the experience polished before local files exist.
 */
const FB = {
  hero: 'https://image2url.com/r2/default/images/1775143593045-1f7ed7bb-21c1-4f39-9953-458a16dd8485.jpg',
    about1: 'https://image2url.com/r2/default/images/1775098872433-586beab0-490c-4739-be37-ef0961dca27c.jpg',
  about2: 'https://image2url.com/r2/default/images/1775098498316-c1dac50e-f010-4071-94e1-a1d6ded0d1be.jpg',
  amenity1: 'https://image2url.com/r2/default/images/1775098371520-bab4dbaa-edda-45a3-8380-f80aa226df2d.jpg',
  amenity2: 'https://image2url.com/r2/default/images/1775098902597-7e98360e-713c-43e4-a7c7-91f4eaea3fd2.jpg',
  amenity3: 'https://image2url.com/r2/default/images/1775098425137-6225571f-60fd-4409-a81b-b35286112883.jpg',
  g1: 'https://image2url.com/r2/default/images/1775098297764-b2c22f4d-d3f5-4987-9020-36e5e2e9b56b.jpg',
  g2: 'https://image2url.com/r2/default/images/1775098325222-aac95a9b-8167-4086-898e-b4d9a97dce2a.jpg',
  g3: 'https://image2url.com/r2/default/images/1775098176091-4bd9c4c3-29ae-431e-90bd-d82f0f7bc64f.jpg',
  g4: 'https://image2url.com/r2/default/images/1775098200218-319b896a-3771-4452-a1ff-7e90feb6ce5d.jpg',
  g5: 'https://image2url.com/r2/default/images/1775098345886-385ceb3b-480b-485d-89b9-d099b1fdab43.jpg',
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
