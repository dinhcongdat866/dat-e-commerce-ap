enum OrderStatus {
    OrderPlaced = "Order Placed",
    Confirmed = "Confirmed",
    Shipped = "Shipped",
    OutForDelivery = "Out For Delivery",
    Delivered = "Delivered",
}

export const OrderStatusSteps = {
    OrderPlaced: 0,
    Confirmed: 1,
    Shipped: 2,
    OutForDelivery: 3,
    Delivered: 4,
}

export default OrderStatus;