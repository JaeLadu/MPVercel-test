import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   console.warn(req.body);
   return res.status(200).end();
}
