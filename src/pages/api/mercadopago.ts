import { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "../../lib/mercadopago";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { body, query } = req;
   const { id, topic } = query;
   const MO = await getMerchantOrder(id.toString());
   console.warn(body, query, MO);
   return res.status(200).end();
}
