// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PangeaIPGeolocate, PangeaVPNCheck } from '@/lib/breachLookup'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    if ("ip" in req.body && req.body.ip != null) {
        if("vpn" in req.body && req.body.vpn === true) {
            const vpnResponse = await PangeaVPNCheck(req.body.ip);
            res.status(200).json(vpnResponse as any)
        }
        const breachResponse = await PangeaIPGeolocate(req.body.ip);
        res.status(200).json(breachResponse as any)
    } else {
        res.status(400).json({message: "no ip found in body"})
    }
}
