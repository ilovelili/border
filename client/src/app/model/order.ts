// Order entity
export class Order {
    orderId: string;
    company: string;
    address: string;
    item: string;
}

// Item entity
export class Item {
    item: string;
    count: number;
}