import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextApiRequest, NextApiResponse } from "next";

const cliente = new MercadoPagoConfig({
   accessToken: process.env.MP_TEST_ACCESS_TOKEN!,
});
const preferencia = new Preference(cliente);

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   const { body } = req;
   const { items } = body;
   if (items) {
      const MPResponse = await preferencia.create({
         body: {
            external_reference: "Testing Testing",
            items: items,
            notification_url: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/mercadopago`,
         },
      });
      res.send(MPResponse);
   } else {
      res.end("NO hay items");
   }
}
