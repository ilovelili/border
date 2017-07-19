import { Component, OnInit } from '@angular/core';
import { OrderClient } from '../service/orderclient.service';
import { Item } from '../model/order';
import { BaseComponent } from '../base.component';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.css'],
})

export class ItemsComponent extends BaseComponent implements OnInit {
    // Declare empty list of orders
    private orderitems: Item[];
    private errormsg: string = '';

    constructor(protected activatedRoute: ActivatedRoute, private orderClient: OrderClient) {
        super(activatedRoute);
    }

    ngOnInit() {
        this.search();
    }

    // search for items
    search() {
        this.orderClient.getItems().subscribe(
            (res) => {
                if (res) {
                    this.orderitems = res;
                }
            },
            (err) => {
                this.errormsg = err;
                this.LogError(err);
            },
            () => {
                this.LogComplete('Items loaded');
            }
        );
    }
}