import { FC } from 'react'
import Link from 'next/link'

interface CTABannerProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

const CTABanner: FC<CTABannerProps> = ({
  title = 'Ready to get started?',
  subtitle = 'Start using Biobase today.',
  ctaText = 'Start your project',
  ctaLink = '/dashboard',
}) => {
  return (
    <div className="bg-scale-200 dark:bg-scale-300">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={ctaLink}
              className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CTABanner
