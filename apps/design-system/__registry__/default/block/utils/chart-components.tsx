'use client'

import React, { forwardRef } from 'react'
import { ResponsiveContainer } from 'recharts'
import type { ResponsiveContainerProps } from 'recharts'

export const ResponsiveWrapper = forwardRef<HTMLDivElement, ResponsiveContainerProps>(
  function ResponsiveWrapper(props, ref) {
    return <ResponsiveContainer {...props} ref={ref} />
  }
)
