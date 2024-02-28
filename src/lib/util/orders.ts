import { Order } from "@medusajs/medusa"

interface Guest {
  orders: Order[],
  customer_id: string,
}



const checkIfExists = (customer_id: string): Guest | undefined => {
  var data = window.localStorage.getItem('guest');
  if (data) {
    var guest: Guest = JSON.parse(data);
    if (guest.customer_id === customer_id) return guest;
  }
  return

}

export const saveOrderToStorage = (order: Order | undefined) => {
  if (!order) return;

  var guest: Guest | undefined = checkIfExists(order.customer_id);
  if (guest) {
    var exists = guest.orders.find((o) => o.id == order.id);
    if (exists) return;
    guest.orders = [order, ...guest.orders]
  }
  else
    guest = { orders: [order], customer_id: order.customer_id }
  saveGuest(guest)

}

export const loadGuest = (): Guest | undefined => {
  console.info('💥 loading guest')
  var data = window.localStorage.getItem('guest')
  if (data)
    return JSON.parse(data)

  return;
}

export const removeGuest = () => {
  window.localStorage.removeItem('guest');
  console.info('❌ guest removed');
}

export const saveGuest = (guest: Guest) => {
  window.localStorage.setItem('guest', JSON.stringify(guest));
  console.info('✅ guest saved');
}
