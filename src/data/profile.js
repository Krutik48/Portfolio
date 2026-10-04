// Profile & contact — single source of truth
export const profile = {
  name: 'Krutik Malani',
  firstName: 'Krutik',
  lastName: 'Malani',
  role: 'Software Engineer',
  company: 'Adobe', // ← current employer: update this one line on a job change
  team: 'Illustrator team',
  careerStart: '2024-06-01', // powers the computed "years of experience" stat
  since: 'Jun 2024',
  location: 'Chennai, India',
  coords: '13.0827°N, 80.2707°E',
  timezone: 'Asia/Kolkata',
  almaMater: "IIT Madras '24",
  blurb:
    'I build for problems I run into \u2014 usually the ones without a good solution out there. When nothing fits, I make the tool, use it every day, and keep refining it. That\u2019s the work I care about most.',
  resume:
    'https://drive.google.com/file/d/10rm-Ft-gRdgMi2urkm50y1zvDmopbt7E/view',
  email: 'krutikmalani480@gmail.com',
  phone: '+91 74330 86205',
  whatsapp: 'https://wa.link/ac0bsn',
  socials: [
    { label: 'GitHub', url: 'https://github.com/Krutik48' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/krutik-malani-71731b1ab' },
    { label: 'X / Twitter', url: 'https://twitter.com/Krutik48' },
    { label: 'Instagram', url: 'http://instagram.com/krutik_malani' },
    { label: 'Facebook', url: 'https://www.facebook.com/krutik.malani.3' },
  ],
  timeline: [
    {
      org: 'Adobe',
      detail: 'Illustrator team',
      period: 'Jun 2024 — Present',
      note: 'From research prototypes to shipped Illustrator features.',
    },
    {
      org: 'IIT Madras',
      detail: 'B.Tech, Electrical Engineering',
      period: 'Class of 2024',
      note: 'Where the experiments started \u2014 games, apps, and APIs.',
    },
  ],
  toolbox: ['Computer Vision', 'Generative AI', 'Machine Learning', 'PyTorch', 'Python', 'React', 'Web', 'Android'],
}

export const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Research', href: '#research' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
