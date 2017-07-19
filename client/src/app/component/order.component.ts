import { Component, OnInit } from '@angular/core';
import { OrderClient } from '../service/orderclient.service';
import { Order } from '../model/order';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.css'],
})

export class OrderComponent extends BaseComponent implements OnInit {
    // Declare empty list of orders
    private orders: Order[];
    private errormsg: string = '';

    constructor(protected activatedRoute: ActivatedRoute, private orderClient: OrderClient) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.search();
    }

    // search for orders
    search(orderId: string = '', company: string = '', address: string = '') {
        this.orderClient.getOrders(orderId, company, address).subscribe(
            (res) => {
                if (res) {                    
                    this.orders = res;
                }
            },
            (err) => {
                this.errormsg = err;
                this.LogError(err);
            },
            () => {
                this.LogComplete('Order loaded');
            }
        );
    }

    // delete an order
    delete(orderId: string) {
        this.orderClient.deleteOrder(orderId).subscribe(
            (res) => {
                // remove the order from orders
                for(var i = 0; i < this.orders.length; i++) {
                    if (this.orders[i].orderId == orderId) {
                        this.orders.splice(i, 1);
                    }
                }

                this.LogComplete(`${orderId} deleted`);
            },
            (err) => {
                this.LogError(err);
            },
        );
    }
}