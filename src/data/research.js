// Research — papers, venues, links. Featured item renders as the large card.
export const papers = [
  {
    id: 'vectorark',
    featured: true,
    title: 'VectorArk: Learning Practical Image Vectorization with Rounded Polygon Representation',
    venue: 'CVPR 2026',
    venueNote: 'Accepted',
    date: 'May 2026',
    authors:
      'Tarun Gehlaut, Difan Liu, Charu Bansal, Krutik Malani, Souymodip Chakraborty, Ankit Phogat, Matthew Fisher, Vineet Batra',
    affiliation: 'Adobe',
    abstract:
      'A VLM-based model for robust, practical image vectorization. VectorArk introduces a rounded polygon representation that simplifies learning while producing smooth, visually appealing primitives — and a degradation model that holds up on messy real-world inputs, from text-to-image outputs to unknown rasterizers.',
    links: [
      { label: 'Paper', url: 'https://arxiv.org/abs/2605.24398' },
      { label: 'Project page', url: 'https://vectorark.github.io/' },
    ],
  },
  {
    id: 'beyond-pixels',
    title: 'Beyond the Pixels: VLM-based Evaluation of Identity Preservation in Reference-Guided Synthesis',
    venue: 'arXiv',
    date: 'Nov 2025',
    authors:
      'Aditi Singhania, Krutik Malani, Riddhi Dhawan, Arushi Jain, Garv Tandon, Nippun Sharma, Souymodip Chakraborty, Vineet Batra, Ankit Phogat',
    affiliation: 'Adobe',
    abstract:
      'A hierarchical evaluation framework that decomposes identity assessment into feature-level transformations, guiding VLMs through structured reasoning instead of coarse similarity scores.',
    links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2511.08087' }],
  },
  {
    id: 'taming-identity',
    title: 'Taming Identity Consistency and Prompt Diversity in Diffusion Models',
    venue: 'arXiv',
    date: 'Nov 2025',
    authors:
      'Aditi Singhania, Arushi Jain, Krutik Malani, Riddhi Dhawan, Souymodip Chakraborty, Vineet Batra, Ankit Phogat',
    affiliation: 'Adobe',
    abstract:
      'A LoRA-tuned diffusion model with latent concatenation and a masked Conditional Flow Matching objective — strong identity preservation without touching the architecture.',
    links: [{ label: 'Paper', url: 'https://arxiv.org/abs/2511.08061' }],
  },
]
