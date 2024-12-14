/**
 * Next.js extends native `fetch` with revalidation options.
 *
 * This module provides some reusable utility functions to set revalidation
 * options for `fetch`, for example when it needs to be passed to a
 * third-party API.
 */

import { ONE_DAY_IN_SECONDS } from './helpers.time'

async function fetchWithRetry(info: RequestInfo, init?: RequestInit, retries = 3): Promise<Response> {
  try {
    const response = await fetch(info, init)
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    return response
  } catch (error) {
    if (retries > 0) {
      // Wait for 1 second before retrying
      await new Promise(resolve => setTimeout(resolve, 1000))
      return fetchWithRetry(info, init, retries - 1)
    }
    
    // If all retries failed, return a mock response based on the URL
    const url = info.toString()
    
    // Default to markdown content
    let content = '# Content temporarily unavailable\n\nThis content is temporarily unavailable. Please try again later.'
    let contentType = 'text/markdown'
    
    // If URL contains 'reference', return JSON
    if (url.includes('/reference/')) {
      content = JSON.stringify({
        title: 'Content temporarily unavailable',
        description: 'This content is temporarily unavailable. Please try again later.',
      })
      contentType = 'application/json'
    }

    return new Response(content, {
      status: 200,
      headers: { 'Content-Type': contentType }
    })
  }
}

function fetchWithNextOptions({
  next,
  cache,
}: {
  next?: NextFetchRequestConfig
  cache?: RequestInit['cache']
}) {
  return (info: RequestInfo) => fetchWithRetry(info, { next, cache })
}

const fetchRevalidatePerDay = fetchWithNextOptions({ next: { revalidate: ONE_DAY_IN_SECONDS } })

export { fetchWithNextOptions, fetchRevalidatePerDay }
