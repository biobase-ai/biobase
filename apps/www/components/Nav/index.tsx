import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useWindowSize } from 'react-use'

import { Button, buttonVariants, cn } from 'ui'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from 'ui/src/components/shadcn/ui/navigation-menu'
import { useIsLoggedIn, useIsUserLoading } from 'common'
import ScrollProgress from '~/components/ScrollProgress'
import GitHubButton from './GitHubButton'
import HamburgerButton from './HamburgerMenu'
import MobileMenu from './MobileMenu'
import MenuItem from './MenuItem'
import RightClickBrandLogo from './RightClickBrandLogo'
import { allPosts } from 'contentlayer/generated'
import { getMenu } from '~/data/nav'
import { sortDates } from '~/lib/helpers'

interface Props {
  hideNavbar: boolean
}

const Nav = (props: Props) => {
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const { width } = useWindowSize()
  const [open, setOpen] = useState(false)
  const isLoggedIn = useIsLoggedIn()
  const isUserLoading = useIsUserLoading()
  const latestBlogPosts = allPosts.sort(sortDates).slice(0, 2)
  const menu = getMenu(latestBlogPosts)

  const isHomePage = router.pathname === '/'
  const isLaunchWeekPage = router.pathname.includes('/launch-week')
  const isLaunchWeekXPage = router.pathname === '/launch-week/x'
  const isGAWeekSection = router.pathname.startsWith('/ga-week')
  const hasStickySubnav = isLaunchWeekXPage || isGAWeekSection || isLaunchWeekPage
  const showLaunchWeekNavMode = (isLaunchWeekPage || isGAWeekSection) && !open

  // Update the logo style to match the biological data theme
  const logoClasses = cn(
    'transition-opacity',
    isLaunchWeekXPage && !open && `opacity-0 translate-y-4 invisible hidden`
  )

  // Add custom styles for biological data theme branding
  const navClasses = cn(
    'sticky top-0 w-full h-16 md:h-[58px] lg:h-[63px] transition-all ease-out z-40',
    showLaunchWeekNavMode && !open && hasStickySubnav && 'bg-transparent shadow-none',
    isHomePage && 'dark:bg-transparent border-transparent shadow-none',
    'bg-background-alternative-200 dark:bg-background'
  )

  React.useEffect(() => {
    if (open) {
      // Prevent scrolling on mount
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  // Close mobile menu when desktop
  React.useEffect(() => {
    if (width >= 1024) setOpen(false)
  }, [width])

  if (props.hideNavbar) {
    return null
  }

  const showDarkLogo = isLaunchWeekPage || resolvedTheme?.includes('dark')! || isHomePage

  return (
    <>
      {/* <Announcement>
        Uncomment to show announcement banner
      </Announcement> */}
      <div
        className={cn('sticky top-0 z-40 transform', hasStickySubnav && 'relative')}
        style={{ transform: 'translate3d(0,0,999px)' }}
      >
        <div
          className={cn(
            'absolute inset-0 h-full w-full bg-background/90 dark:bg-background/95',
            !showLaunchWeekNavMode && '!opacity-100 transition-opacity',
            showLaunchWeekNavMode && '!bg-transparent transition-all',
            isGAWeekSection && 'dark:!bg-alternative'
          )}
        />
        <nav
          className={navClasses}
        >
          <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
            <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
              <div className="flex items-center">
                <div className="flex items-center flex-shrink-0">
                  <RightClickBrandLogo />
                </div>
                <NavigationMenu
                  delayDuration={0}
                  className="hidden pl-8 sm:space-x-4 lg:flex h-16"
                  viewportClassName="rounded-xl bg-background"
                >
                  <NavigationMenuList>
                    {menu.primaryNav.map((menuItem) =>
                      menuItem.hasDropdown ? (
                        <NavigationMenuItem className="text-sm font-medium" key={menuItem.title}>
                          <NavigationMenuTrigger
                            className={cn(
                              buttonVariants({ type: 'text', size: 'small' }),
                              '!bg-transparent hover:text-brand-link data-[state=open]:!text-brand-link data-[radix-collection-item]:focus-visible:ring-2 data-[radix-collection-item]:focus-visible:ring-foreground-lighter data-[radix-collection-item]:focus-visible:text-foreground px-2 h-auto'
                            )}
                          >
                            {menuItem.title}
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>{menuItem.dropdown}</NavigationMenuContent>
                        </NavigationMenuItem>
                      ) : (
                        <NavigationMenuItem className="text-sm font-medium" key={menuItem.title}>
                          <NavigationMenuLink asChild>
                            <MenuItem
                              href={menuItem.url}
                              title={menuItem.title}
                              className="group-hover:bg-transparent text-foreground focus-visible:text-brand-link"
                              hoverColor="brand"
                            />
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    )}
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
              <div className="flex items-center gap-2 opacity-0 animate-fade-in !scale-100 delay-300">
                <GitHubButton />
                {!isUserLoading && (
                  <>
                    {isLoggedIn ? (
                      <Button className="hidden lg:block" asChild>
                        <Link href="/dashboard/projects">Dashboard</Link>
                      </Button>
                    ) : (
                      <>
                        <Button type="default" className="hidden lg:block" asChild>
                          <Link href="https://biobase.studio/dashboard">Sign in</Link>
                        </Button>
                        <Button className="hidden lg:block" asChild>
                          <Link href="https://biobase.studio/dashboard">Start your project</Link>
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
            <HamburgerButton
              toggleFlyOut={() => setOpen(true)}
              showLaunchWeekNavMode={showLaunchWeekNavMode}
            />
          </div>
          <MobileMenu open={open} setOpen={setOpen} isDarkMode={showDarkLogo} menu={menu} />
        </nav>

        <ScrollProgress />
      </div>
    </>
  )
}

export default Nav
