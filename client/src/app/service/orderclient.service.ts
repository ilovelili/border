import { Http } from '@angular/http';
import { RESTClientBase, GET, Query, POST, Body, DELETE } from '../util/restclientbase';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Order, Item } from '../model/order';

/**
 * OrderClient communicates with server side
 */
@Injectable()
export class OrderClient extends RESTClientBase {
    constructor(protected http: Http) {
        super(http);
    }

    // get orders info by id or company or address
    @GET("orders")
    public getOrders( @Query('orderId') orderId?: string, @Query('company') company?: string, @Query('address') address?: string): Observable<Order[]> { return null; };

    // create order
    @POST("order")
    public createOrder( @Body order: Order): Observable<{ success: boolean }> { return null; };

    // display how often each item has been ordered 
    @GET("items")
    public getItems(): Observable<Item[]> { return null; };

    // delete an order by id
    @DELETE("order")
    public deleteOrder(@Query('orderId') orderId: string): Observable<{ success: boolean }> { return null; };
}