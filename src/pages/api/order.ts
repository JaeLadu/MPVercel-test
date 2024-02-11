import { NextApiRequest, NextApiResponse } from "next";
import { createMPPreference } from "src/lib/mercadopago";
import { checkToken, reqVerbsHandler } from "src/lib/middlewares";
import { Order } from "src/models/order";

async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { query } = req;
   const { productIds } = query;
   if (productIds) {
      const DBOrder = await Order.create(JSON.parse(productIds as string));
      const MPURL = await createMPPreference({
         orderId: DBOrder.id,
         productos: DBOrder.getData().items,
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
