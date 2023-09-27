// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PangeaLogEmail, PangeaUserLookup } from '@/lib/breachLookup'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if ("email" in req.body && req.body.email != null) {
        const breachResponse = await PangeaLogEmail(req.body.email);
        if(breachResponse != false) {
            res.status(200).json(breachResponse as any)
        } else {
            res.status(502).json({message: "Unable to log email currently"})
        }
    } else {
        res.status(400).json({message: "no email found in body"})
    }
}
