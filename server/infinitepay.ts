import fetch from "node-fetch";

export async function criarLinkInfinitePay() {
  const response = await fetch(
    "https://api.infinitepay.io/invoices/public/checkout/links",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        handle: "reservapraia",
        order_nsu: "pedido-" + Date.now(),
        items: [
          {
            quantity: 1,
            price: 1000,
            description: "Reserva de Hotel"
          }
        ],
        redirect_url: "https://hotelbooker-esrh6cpg.manus.space"
      })
    }
  );

  return await response.json();
}
