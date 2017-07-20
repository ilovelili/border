// Order entity
export class Order {
    orderId: string;
    company: string;
    address: string;
    item: string;
}

// Aggregated Item entity
export class Item {
    _id: {
        item: string,
    };
    count: number;
}