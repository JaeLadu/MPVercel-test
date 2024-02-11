import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "src/controllers/orders-controller";
import { createMPPreference } from "src/lib/mercadopago";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { body } = req;
   const { items } = body;
   if (items) {
      const DBOrder = await createOrder(items);
      const MPURL = await createMPPreference({
         orderId: DBOrder.id,
         productos: items,
      });
      res.send(MPURL);
   } else {
      res.end("NO hay items");
   }
}
