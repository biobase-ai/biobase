export type ConnectionType = {
  key: string
  icon: string
  label: string
  guideLink?: string
  children: ConnectionType[]
}

export const FRAMEWORKS: ConnectionType[] = [
  {
    key: 'nextjs',
    label: 'Next.js',
    icon: 'nextjs',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/nextjs',
    children: [
      {
        key: 'app',
        label: 'App Router',
        icon: '',
        children: [
          {
            key: 'biobasejs',
            label: 'biobase-js',
            icon: 'biobase',
            children: [],
          },
        ],
      },
      {
        key: 'pages',
        label: 'Pages Router',
        icon: '',
        children: [
          {
            key: 'biobasejs',
            label: 'Biobase-js',
            children: [],
            icon: 'biobase',
          },
        ],
      },
    ],
  },
  {
    key: 'remix',
    label: 'Remix',
    icon: 'remix',
    guideLink:
      'https://biobase.studio/docs/guides/auth/server-side/creating-a-client?framework=remix&environment=remix-loader',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'react',
    label: 'React',
    icon: 'react',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/reactjs',
    children: [
      {
        key: 'create-react-app',
        label: 'Create React App',
        icon: 'react',
        children: [
          {
            key: 'biobasejs',
            label: 'biobase-js',
            icon: 'biobase',
            children: [],
          },
        ],
      },
      {
        key: 'vite',
        label: 'Vite',
        icon: 'vite',
        children: [
          {
            key: 'biobasejs',
            label: 'Biobase-js',
            children: [],
            icon: 'biobase',
          },
        ],
      },
    ],
  },
  {
    key: 'nuxt',
    label: 'Nuxt',
    icon: 'nuxt',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/nuxtjs',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'vuejs',
    label: 'Vue.JS',
    icon: 'vuejs',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/vue',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },

  {
    key: 'sveltekit',
    label: 'SvelteKit',
    icon: 'sveltekit',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/sveltekit',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'solidjs',
    label: 'Solid.js',
    icon: 'solidjs',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/solidjs',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'astro',
    label: 'Astro',
    icon: 'astro',
    guideLink: 'https://docs.astro.build/en/guides/backend/biobase/',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'refine',
    label: 'refine',
    icon: 'refine',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/quickstarts/refine',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
]

export const MOBILES: ConnectionType[] = [
  {
    key: 'exporeactnative',
    label: 'Expo React Native',
    icon: 'expo',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/tutorials/with-expo-react-native',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'flutter',
    label: 'Flutter',
    icon: 'flutter',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/tutorials/with-flutter',
    children: [
      {
        key: 'biobaseflutter',
        label: 'biobase-flutter',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'ionicreact',
    label: 'Ionic React',
    icon: 'react',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/tutorials/with-ionic-react',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'swift',
    label: 'Swift',
    icon: 'swift',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/tutorials/with-swift',
    children: [
      {
        key: 'biobaseswift',
        label: 'biobase-swift',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'androidkotlin',
    label: 'Android Kotlin',
    icon: 'kotlin',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/tutorials/with-kotlin',
    children: [
      {
        key: 'biobasekt',
        label: 'biobase-kt',
        children: [],
        icon: 'biobase',
      },
    ],
  },
  {
    key: 'ionicangular',
    label: 'Ionic Angular',
    icon: 'ionic-angular',
    guideLink: 'https://biobase.studio/docs/guides/getting-started/tutorials/with-ionic-angular',
    children: [
      {
        key: 'biobasejs',
        label: 'Biobase-js',
        children: [],
        icon: 'biobase',
      },
    ],
  },
]

export const ORMS: ConnectionType[] = [
  {
    key: 'prisma',
    label: 'Prisma',
    icon: 'prisma',
    guideLink: 'https://biobase.studio/partners/integrations/prisma',
    children: [],
  },
  {
    key: 'drizzle',
    label: 'Drizzle',
    icon: 'drizzle',
    guideLink:
      'https://biobase.studio/docs/guides/database/connecting-to-postgres#connecting-with-drizzle',
    children: [],
  },
]

export const CONNECTION_TYPES = [
  { key: 'frameworks', label: 'App Frameworks', obj: FRAMEWORKS },
  { key: 'mobiles', label: 'Mobile Frameworks', obj: MOBILES },
  { key: 'orms', label: 'ORMs', obj: ORMS },
]
