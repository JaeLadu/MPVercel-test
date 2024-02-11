import { NextApiRequest, NextApiResponse } from "next";
import { updateOrderStatus } from "src/controllers/orders-controller";
import { getMerchantOrder } from "src/lib/mercadopago";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { body, query } = req;
   const { id, topic } = query;
   if (id && topic == "merchant_order") {
      const MO = await getMerchantOrder(id.toString());
      const response = await updateOrderStatus(
         MO.external_reference,
         MO.status
      );
      console.warn({ body }, { query }, { MO }, { response });
   }
   return res.status(200).end();
}
