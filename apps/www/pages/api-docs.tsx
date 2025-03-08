import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { NextPage } from 'next'

// Use dynamic import for SwaggerUI to avoid build-time dependency issues
const SwaggerUI = dynamic(
  async () => {
    try {
      // Attempt to dynamically import immutable (required by swagger dependencies)
      await import('immutable')
      // Then import SwaggerUI
      const module = await import('swagger-ui-react')
      await import('swagger-ui-react/swagger-ui.css')
      return module.default
    } catch (error) {
      console.error('Error loading SwaggerUI:', error)
      // Return a fallback component if SwaggerUI fails to load
      return () => <div>API documentation is unavailable. Please try again later.</div>
    }
  },
  { 
    ssr: false,
    loading: () => <div>Loading API documentation...</div>
  }
)

// Add getStaticProps to prevent build-time errors
export async function getStaticProps() {
  return {
    props: {},
  }
}

const ApiDocs: NextPage = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div>Loading API documentation...</div>
  }

  return (
    <div className="api-docs">
      <SwaggerUI url="/api/api-json" />
    </div>
  )
}

export default ApiDocs
