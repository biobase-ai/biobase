import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import { Session } from '@supabase/supabase-js'
import { LW12_DATE, LW12_TITLE, LW_URL, SITE_ORIGIN } from '~/lib/constants'
import biobase from '~/lib/biobase'

import DefaultLayout from '~/components/Layouts/Default'
import { TicketState, ConfDataContext, UserData } from '~/components/LaunchWeek/hooks/use-conf-data'
import SectionContainer from '~/components/Layouts/SectionContainer'
import { Meetup } from '~/components/LaunchWeek/12/LWMeetups'
import LWStickyNav from '~/components/LaunchWeek/12/Releases/LWStickyNav'
import LWHeader from '~/components/LaunchWeek/12/Releases/LWHeader'
import MainStage from '~/components/LaunchWeek/12/Releases/MainStage'

const BuildStage = dynamic(() => import('~/components/LaunchWeek/12/Releases/BuildStage'))
const CTABanner = dynamic(() => import('~/components/CTABanner'))
const LaunchWeekPrizeSection = dynamic(
  () => import('~/components/LaunchWeek/12/LaunchWeekPrizeSection')
)
const LW12Meetups = dynamic(() => import('~/components/LaunchWeek/12/LWMeetups'))

interface Props {
  meetups?: Meetup[]
}

export default function LaunchWeekIndex({ meetups }: Props) {
  const { query } = useRouter()

  const TITLE = `${LW12_TITLE} | ${LW12_DATE}`
  const DESCRIPTION = 'Join us for a week of announcing new features, every day at 7 AM PT.'
  const OG_IMAGE = `${SITE_ORIGIN}/images/launchweek/12/lw12-og.png?lw=12`

  const ticketNumber = query.ticketNumber?.toString()
  const [session, setSession] = useState<Session | null>(null)
  const [showCustomizationForm, setShowCustomizationForm] = useState<boolean>(false)

  const defaultUserData = {
    id: query.id?.toString(),
    ticket_number: ticketNumber ? parseInt(ticketNumber, 10) : undefined,
    name: query.name?.toString(),
    username: query.username?.toString(),
    platinum: !!query.platinum,
  }

  const [userData, setUserData] = useState<UserData>(defaultUserData)
  const [ticketState, setTicketState] = useState<TicketState>('loading')

  useEffect(() => {
    if (biobase) {
      biobase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => setSession(session))
      const {
        data: { subscription },
      } = biobase.auth.onAuthStateChange((_event: 'SIGNED_IN' | 'SIGNED_OUT' | 'USER_UPDATED' | 'USER_DELETED' | 'TOKEN_REFRESHED', session: Session | null) => {
        setSession(session)
      })

      return () => subscription.unsubscribe()
    }
  }, [biobase])

  useEffect(() => {
    if (session?.user) {
      if (userData?.id) {
        return setTicketState('ticket')
      }
      return setTicketState('loading')
    }
    if (!session) return setTicketState('registration')
  }, [session, userData])

  return (
    <>
      <NextSeo
        title={TITLE}
        description={DESCRIPTION}
        openGraph={{
          title: TITLE,
          description: DESCRIPTION,
          url: LW_URL,
          images: [
            {
              url: OG_IMAGE,
            },
          ],
        }}
      />
      <ConfDataContext.Provider
        value={{
          biobase,
          session,
          userData,
          setUserData,
          ticketState,
          setTicketState,
          showCustomizationForm,
          setShowCustomizationForm,
        }}
      >
        <DefaultLayout>
          <LWStickyNav />
          <LWHeader />
          <MainStage className="relative z-10" />
          <BuildStage />
          <SectionContainer id="meetups" className="scroll-mt-[60px] lw-nav-anchor">
            <LW12Meetups meetups={meetups} />
          </SectionContainer>
          <SectionContainer className="!pt-8 scroll-mt-[60px] lw-nav-anchor" id="awards">
            <LaunchWeekPrizeSection />
          </SectionContainer>
          <CTABanner />
        </DefaultLayout>
      </ConfDataContext.Provider>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: meetups } = await biobase!
    .from('meetups')
    .select('*')
    .eq('launch_week', 'lw12')
    .neq('is_published', false)
    .order('start_at')

  return {
    props: {
      meetups,
    },
  }
}
