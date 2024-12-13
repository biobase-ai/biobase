import { createClient } from '@supabase/biobase-js'
import apiWrapper from 'lib/api/apiWrapper'
import { NextApiRequest, NextApiResponse } from 'next'

const biobase = createClient(process.env.BIOBASE_URL!, process.env.BIOBASE_SERVICE_KEY!)

export default (req: NextApiRequest, res: NextApiResponse) => apiWrapper(req, res, handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'DELETE':
      return handleDelete(req, res)
    default:
      res.setHeader('Allow', ['DELETE'])
      res.status(405).json({ data: null, error: { message: `Method ${method} Not Allowed` } })
  }
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query

  // Get all factors for the user
  const { data: factors, error } = await biobase.auth.admin.mfa.listFactors({
    userId: id as string,
  })
  if (error) {
    return res.status(400).json({ error: { message: error.message } })
  }

  factors?.factors.forEach(async (factor: any) => {
    const { error } = await biobase.auth.admin.mfa.deleteFactor({
      id: factor.id,
      userId: id as string,
    })
    if (error) {
      return res.status(400).json({ error: { message: error.message } })
    }
  })

  return res.status(200).json({ data: null, error: null })
}
