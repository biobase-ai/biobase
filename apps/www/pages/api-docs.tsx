import { useEffect } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'

export default function ApiDocs() {
  return (
    <div className="api-docs">
      <SwaggerUI url="/api/api-json" />
    </div>
  )
}
