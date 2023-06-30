// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    if (req.method === "POST") {
        const { num1, num2 } = req.body
        const sum = num1 + num2
        res.status(200).json({ sum })
    } else {
        res.status(200).json({ message: 'hello world' })
    }
}
