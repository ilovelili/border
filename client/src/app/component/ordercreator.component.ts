import { Component } from '@angular/core';
import { OrderClient } from '../service/orderclient.service';
import { Order } from '../model/order';
import { BaseComponent } from '../base.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'ordercreator',
    templateUrl: './ordercreator.component.html',
    styleUrls: ['./ordercreator.component.css'],
})

export class OrderCreatorComponent extends BaseComponent {
    private errormsg: string = '';

    constructor(protected activatedRoute: ActivatedRoute, private orderClient: OrderClient, private router: Router) {
        super(activatedRoute);
    }

    // delete an order
    create(orderId: string, company: string, address: string, item: string) {
        let order : Order = {
            orderId: orderId,
            company: company,
            address: address,
            item: item,
        };

        this.orderClient.createOrder(order).subscribe(
            (res) => {
                this.LogComplete(`${orderId} added`);
                // go back to main page
                this.router.navigate(['/']);
            },
            (err) => {
                this.errormsg = err;
                this.LogError(err);
            },
            () => {
                this.LogComplete('Create order complete');
            },
        );
    }
}