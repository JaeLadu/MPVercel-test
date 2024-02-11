import MercadoPagoConfig, { MerchantOrder, Preference } from "mercadopago";

const cliente = new MercadoPagoConfig({
   accessToken: process.env.MP_TEST_ACCESS_TOKEN!,
});
const preferencia = new Preference(cliente);

const merchantOrder = new MerchantOrder(cliente);

export async function createMPPreference(data: {
   orderId: string;
   productos: any;
}) {
   const response = await preferencia.create({
      body: {
         external_reference: data.orderId,
         items: data.productos,
         notification_url: process.env.NEXT_PUBLIC_MP_RESPONSE_HOOK,
      },
   });

   return response.init_point;
}

export async function getMerchantOrder(id: string) {
   const response = await merchantOrder.get({ merchantOrderId: id });
   return response;
}
