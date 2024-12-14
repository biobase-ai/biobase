/// <reference types="https://deno.land/x/og_edge@0.0.4/mod.ts" />
import React from 'https://esm.sh/react@18.2.0?deno-std=0.140.0'
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts'
import CustomerStories from './component/CustomerStories.js'
import Docs from './component/Docs.js'
import Events from './component/Events.js'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/json',
}

// Load custom fonts
const FONT_URLS = {
  CIRCULAR:
    'https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/fonts/CircularStd-Book.otf',
  MONO: 'https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/fonts/SourceCodePro-Regular.ttf',
}

async function loadFonts() {
  const FONT_CIRCULAR = await fetch(new URL(FONT_URLS['CIRCULAR'], import.meta.url)).then((res) =>
    res.arrayBuffer()
  )
  const FONT_MONO = await fetch(new URL(FONT_URLS['MONO'], import.meta.url)).then((res) =>
    res.arrayBuffer()
  )
  return { CIRCULAR_FONT_DATA: FONT_CIRCULAR, MONO_FONT_DATA: FONT_MONO }
}

const getParamValue = (
  url: URL,
  value: string,
  options?: {
    lowercase?: boolean
    decodeURI?: boolean
  }
) => {
  const param = url.searchParams.get(value) ?? url.searchParams.get(`amp;${value}`)
  const maybeDecoded = options?.decodeURI && param ? decodeURIComponent(param) : param
  const maybeLowercased = options?.lowercase ? maybeDecoded?.toLowerCase() : maybeDecoded

  return maybeLowercased
}

export async function handler(req: Request) {
  const url = new URL(req.url)

  const site = getParamValue(url, 'site', { lowercase: true })
  const icon = getParamValue(url, 'icon', { lowercase: true })
  const customer = getParamValue(url, 'customer', { lowercase: true })
  const type = getParamValue(url, 'type')
  const title = getParamValue(url, 'title', { decodeURI: true })
  const description = getParamValue(url, 'description', { decodeURI: true })
  const date = getParamValue(url, 'date', { decodeURI: true })
  const eventType = getParamValue(url, 'eventType')
  const duration = getParamValue(url, 'duration')

  if (!site || !title) {
    return new Response(JSON.stringify({ message: 'missing params' }), {
      headers: { ...corsHeaders },
      status: 404,
    })
  }

  const { CIRCULAR_FONT_DATA, MONO_FONT_DATA } = await loadFonts()

  switch (site) {
    case 'docs':
      return new ImageResponse(
        (
          <Docs
            title={title}
            description={description !== 'undefined' ? description : ''}
            type={type}
            icon={icon}
          />
        ),
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Circular',
              data: CIRCULAR_FONT_DATA,
              style: 'normal',
            },
            {
              name: 'SourceCode',
              data: MONO_FONT_DATA,
              style: 'mono',
            },
          ],
          headers: {
            'content-type': 'image/png',
            'cache-control': 'public, max-age=31536000, s-maxage=31536000, no-transform, immutable',
            'cdn-cache-control': 'max-age=31536000',
          },
        }
      )
    case 'customers':
      return new ImageResponse(<CustomerStories title={title} customer={customer} />, {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Circular',
            data: CIRCULAR_FONT_DATA,
            style: 'normal',
          },
          {
            name: 'SourceCode',
            data: MONO_FONT_DATA,
            style: 'mono',
          },
        ],
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=31536000, s-maxage=31536000, no-transform, immutable',
          'cdn-cache-control': 'max-age=31536000',
        },
      })
    case 'events':
      return new ImageResponse(
        <Events
          title={title}
          date={date}
          eventType={eventType}
          duration={duration}
        />,
        {
          width: 1200,
          height: 630,
          fonts: [
            {
              name: 'Circular',
              data: CIRCULAR_FONT_DATA,
              style: 'normal',
            },
            {
              name: 'SourceCode',
              data: MONO_FONT_DATA,
              style: 'mono',
            },
          ],
          headers: {
            'content-type': 'image/png',
            'cache-control': 'public, max-age=31536000, s-maxage=31536000, no-transform, immutable',
            'cdn-cache-control': 'max-age=31536000',
          },
        }
      )
    default:
      return new Response(JSON.stringify({ message: 'Invalid site' }), {
        headers: { ...corsHeaders },
        status: 404,
      })
  }
}
