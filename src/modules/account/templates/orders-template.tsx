import OrdersSection from "../components/order-section"

const OrdersTemplate = () => {
  return (
    <div className="w-full">
      <OrdersSection guest={false} />
    </div>
  )
}

export default OrdersTemplate
