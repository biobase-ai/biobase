import type { NextApiRequest, NextApiResponse } from 'next'
import openApiSpec from '../../data/openapi.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(openApiSpec)
}
