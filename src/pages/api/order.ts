import { NextApiRequest, NextApiResponse } from "next";
import { createOrder } from "src/controllers/orders-controller";
import { createMPPreference } from "src/lib/mercadopago";
import { checkToken, reqVerbsHandler } from "src/lib/middlewares";

async function handler(req: NextApiRequest, res: NextApiResponse) {
   console.warn("handler");
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

export default (req: NextApiRequest, res: NextApiResponse) =>
   reqVerbsHandler(req, res, {
      post: {
         callback: handler,
         middleWares: [checkToken],
      },
   });
