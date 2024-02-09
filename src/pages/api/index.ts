import { NextApiRequest, NextApiResponse } from "next";
import { createMPPreference } from "src/lib/mercadopago";

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { body } = req;
   const { items } = body;
   if (items) {
      const MPURL = await createMPPreference({
         orderId: "testing testing",
         productos: items,
      });
      res.send(MPURL);
   } else {
      res.end("NO hay items");
   }
}
