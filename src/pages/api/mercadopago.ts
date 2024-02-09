import { NextApiRequest, NextApiResponse } from "next";
import { cliente } from ".";
import { MerchantOrder } from "mercadopago";
import { MerchantOrderGetData } from "mercadopago/dist/clients/merchantOrder/get/types";

const merchantOrder = new MerchantOrder(cliente);

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { body, query } = req;
   const { id, topic } = query;
   const MO = await merchantOrder.get(id as unknown as MerchantOrderGetData);
   console.warn(body, query, MO);
   return res.status(200).end();
}
