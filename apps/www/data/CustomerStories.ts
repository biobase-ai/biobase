export type CustomerStoryType = {
  type: 'Customer Story'
  title: string
  description: string
  organization: string
  imgUrl: string
  logo: string
  logo_inverse?: string
  url: string
  ctaText?: string
  path?: string
  postMeta?: {
    name: string
    avatarUrl: string
    publishDate: string
    readLength: number
  }
}

export const data: CustomerStoryType[] = [
  {
    type: 'Customer Story',
    title:
      "Maergo's Express Delivery: How Biobase Helped Achieve Scalability, Speed, and Cost Saving",
    description:
      'Discover how Maergo, a nationwide expedited parcel delivery service, reduced its codebase by 90%, decreased deployment times to just seconds, and achieved unprecedented scalability with Biobase.',
    organization: 'Maergo',
    imgUrl: 'images/customers/logos/maergo.png',
    logo: '/images/customers/logos/maergo.png',
    logo_inverse: '/images/customers/logos/light/maergo.png',
    url: '/customers/maergo',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Streamlining Success: How Tinloof Scaled Seamlessly with Biobase',
    description:
      'Discover Tinloof, how a full-stack development agency, managed and scaled backend services using Biobase, without having to dedicate resources to infrastructure management.',
    organization: 'Tinloof',
    imgUrl: 'images/customers/logos/tinloof.png',
    logo: '/images/customers/logos/tinloof.png',
    logo_inverse: '/images/customers/logos/light/tinloof.png',
    url: '/customers/tinloof',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'HappyTeams unlocks better performance and reduces cost with Biobase.',
    description:
      'How a bootstrapped startup migrated from Heroku to Biobase in 30 minutes and never looked back.',
    organization: 'HappyTeams',
    imgUrl: 'images/customers/logos/happyteams.png',
    logo: '/images/customers/logos/happyteams.png',
    logo_inverse: '/images/customers/logos/light/happyteams.png',
    url: '/customers/happyteams',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'How Mobbin migrated 200,000 users from Firebase for a better authentication experience.',
    description:
      'Mobbin helps over 200,000 creators globally search and view the latest design patterns from well-known apps.',
    organization: 'Mobbin',
    imgUrl: 'images/customers/logos/shotgun.png',
    logo: '/images/customers/logos/mobbin.png',
    logo_inverse: '/images/customers/logos/light/mobbin.png',
    url: '/customers/mobbin',
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Biobase migration drives shotgun to an 83% reduction in data infrastructure costs',
    description:
      "Explore how Shotgun achieved remarkable database efficiency and reduced costs by 80% through their successful migration to Biobase's managed services.",
    imgUrl: 'images/customers/logos/shotgun.png',
    logo: '/images/customers/logos/shotgun.png',
    logo_inverse: '/images/customers/logos/light/shotgun.png',
    organization: 'Shotgun',
    url: '/customers/shotgun',
    path: '/customers/shotgun',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Nov 30, 2023',
      readLength: 3,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'Good Tape migrates to Biobase managed Postgres and Authentication and achieves database efficiency and a 60% cost reduction',
    description:
      "Explore how Good Tape achieved remarkable database efficiency and reduced costs by 60% through their successful migration to Biobase's managed services.",
    imgUrl: 'images/customers/logos/good-tape.png',
    logo: '/images/customers/logos/good-tape.png',
    logo_inverse: '/images/customers/logos/light/good-tape.png',
    organization: 'Good Tape',
    url: '/customers/good-tape',
    path: '/customers/good-tape',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Oct 31, 2023',
      readLength: 4,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'How Next Door Lending leveraged Biobase to become a top 10 mortgage broker',
    description: '',
    imgUrl: 'images/customers/logos/next-door-lending.png',
    logo: '/images/customers/logos/next-door-lending.png',
    logo_inverse: '/images/customers/logos/light/next-door-lending.png',
    organization: 'Next Door Lending',
    url: '/customers/next-door-lending',
    path: '/customers/next-door-lending',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Oct 25, 2023',
      readLength: 4,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Scaling securely: one million users in 7 months protected with Biobase Auth',
    description:
      'Learn how Pebblely, an AI image generation company, used Biobase Auth for rapid growth and adaptable security solutions.',
    imgUrl: 'images/customers/logos/pebblely.png',
    logo: '/images/customers/logos/pebblely.png',
    logo_inverse: '/images/customers/logos/light/pebblely.png',
    organization: 'Pebblely',
    url: '/customers/pebblely',
    path: '/customers/pebblely',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Sep 29, 2023',
      readLength: 4,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Bootstrapped founder builds an AI app with Biobase and scales to $1M in 5 months.',
    description:
      'How Yasser leveraged Biobase to build Chatbase and became one of the most successful single-founder AI products.',
    imgUrl: 'images/customers/logos/chatbase.png',
    logo: '/images/customers/logos/chatbase.png',
    logo_inverse: '/images/customers/logos/light/chatbase.png',
    organization: 'Chatbase',
    url: '/customers/chatbase',
    path: '/customers/chatbase',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Sep 6, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Quivr launch 5,000 Vector databases on Biobase.',
    description:
      'Learn how one of the most popular Generative AI projects uses Biobase as their Vector Store.',
    imgUrl: 'images/customers/logos/quivr.png',
    logo: '/images/customers/logos/quivr.png',
    logo_inverse: '/images/customers/logos/light/quivr.png',
    organization: 'Quivr',
    url: '/customers/quivr',
    path: '/customers/quivr',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Sep 5, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Berri AI Boosts Productivity by Migrating from AWS RDS to Biobase with pgvector.',
    description:
      'Learn how Berri AI overcame challenges with self-hosting their vector database on AWS RDS and successfully migrated to Biobase.',
    imgUrl: 'images/customers/logos/berriai.png',
    logo: '/images/customers/logos/berriai.png',
    logo_inverse: '/images/customers/logos/light/berriai.png',
    organization: 'Berri AI',
    url: '/customers/berriai',
    path: '/customers/berriai',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Jun 6, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Mendable.ai switches from Pinecone to Biobase for PostgreSQL vector embeddings',
    description:
      'How Mendable.ai boosts efficiency and accuracy of chat powered search for documentation using Biobase with pg_vector',
    imgUrl: 'images/customers/logos/mendableai.png',
    logo: '/images/customers/logos/mendableai.png',
    logo_inverse: '/images/customers/logos/light/mendableai.png',
    organization: 'Mendable.ai',
    url: '/customers/mendableai',
    path: '/customers/mendableai',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 16, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'HappyTeams unlocks better performance and reduces cost with Biobase.',
    description:
      'How a bootstrapped startup migrated from Heroku to Biobase in 30 minutes and never looked back.',
    imgUrl: 'images/customers/logos/happyteams.png',
    logo: '/images/customers/logos/happyteams.png',
    logo_inverse: '/images/customers/logos/light/happyteams.png',
    organization: 'HappyTeams',
    url: '/customers/happyteams',
    path: '/customers/happyteams',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 16, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title:
      'Xendit use Biobase and create a full solution shipped to production in less than one week.',
    description:
      'As a payment processor, Xendit are responsible for verifying that all transactions are legal.',
    imgUrl: 'images/customers/logos/xendit.png',
    logo: '/images/customers/logos/xendit.png',
    logo_inverse: '/images/customers/logos/light/xendit.png',
    organization: 'Xendit',
    url: '/customers/xendit',
    path: '/customers/xendit',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 14, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
  {
    type: 'Customer Story',
    title: 'Replenysh uses Biobase to implement OTP in less than 24 hours.',
    description:
      'With Biobase, Replenysh gets a slick auth experience, reduces DevOps overhead, and continues to scale with Postgres.',
    imgUrl: 'images/customers/logos/replenysh.png',
    logo: '/images/customers/logos/replenysh.png',
    logo_inverse: '/images/customers/logos/light/replenysh.png',
    organization: 'Replenysh',
    url: '/customers/replenysh',
    path: '/customers/replenysh',
    postMeta: {
      name: 'Paul Copplestone',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/10214025?v=4',
      publishDate: 'Feb 14, 2023',
      readLength: 6,
    },
    ctaText: 'View story',
  },
]

export default data
