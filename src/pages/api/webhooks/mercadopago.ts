import { NextApiRequest, NextApiResponse } from "next";
import { updateOrderStatus } from "src/controllers/orders-controller";
import { getMerchantOrder } from "src/lib/mercadopago";
import { reqVerbsHandler } from "src/lib/middlewares";

async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { query } = req;
   const { id, topic } = query;
   if (id && topic == "merchant_order") {
      const merchantOrder = await getMerchantOrder(id.toString());
      await updateOrderStatus(
         merchantOrder.external_reference,
         merchantOrder.order_status
      );
   }
   return res.status(200).end();
}

export default (req, res) =>
   reqVerbsHandler(req, res, {
      post: { callback: handler },
   });
