import { post } from '~/lib/fetchWrapper'
import { API_URL, IS_PROD, IS_PREVIEW } from 'lib/constants'
import { NextRouter } from 'next/router'
import { LOCAL_STORAGE_KEYS } from 'common'

export interface TelemetryEvent {
  category: string
  action: string
  label: string
  value?: string
}

export interface TelemetryProps {
  screenResolution?: string
  language: string
}

const noop = () => {}

// This event is the same as in studio/lib/telemetry.tx
// but uses different ENV variables for www

const sendEvent = (event: TelemetryEvent, gaProps: TelemetryProps, router: NextRouter) => {
  const consent =
    typeof window !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_KEYS.TELEMETRY_CONSENT)
      : null
  const hasAcceptedConsent = consent === 'true'
  const IS_DEV = !IS_PROD && !IS_PREVIEW
  const blockEvent = IS_DEV || !hasAcceptedConsent

  if (blockEvent) return noop

  const { category, action, label, value } = event

  return post(`${API_URL}/telemetry/event`, {
    action: action,
    category: category,
    label: label,
    value: value,
    page_referrer: document?.referrer,
    page_title: document?.title,
    page_location: router.asPath,
    ga: {
      screen_resolution: gaProps?.screenResolution,
      language: gaProps?.language,
    },
  })
}

export const useTelemetryProps = () => {
  return {
    screenResolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : undefined,
    language: typeof window !== 'undefined' ? window.navigator.language : 'en-US',
  }
}

export default {
  sendEvent,
}
