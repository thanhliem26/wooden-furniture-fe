interface metadataOrderDetail extends baseInstance {
    metadata: OrderDetailState
}

interface listOrderDetailByOrderId extends baseInstance {
    metadata: OrderDetailState[]
}

interface listStatisticalOrderDetail extends baseInstance {
    metadata: {
        statistical_order: statisticalOrder[],
        statistical_product: statisticalProduct[],
    }
}

type statisticalOrder = {
    statistical_year: number,
    statistical_month: number,
    statistical_count: number,
}

type statisticalProduct = {
    productId: number,
    product_name: string,
    product_price: number,
    statistical_count: number,
}

interface OrderDetailState {
    id: number,
    order_id: number,
    productId: number,
    product_data: ProductState,
    quantity: number,
    createdAt?: string,
    updatedAt?: string,
}

interface paramSearchOrderDetail {
    id: number,
    user_id: number,
}

interface paramUpdateOrderDetail {
    id: number,
    evaluate_id: number,
}

interface paramGetStatistical {
    date_from: string,
    date_to: string,
}