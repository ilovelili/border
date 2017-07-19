import { Routes } from '@angular/router';

import { OrderComponent } from './component/order.component';
import { OrderCreatorComponent } from './component/ordercreator.component';
import { ItemsComponent } from './component/items.component';

export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: OrderComponent },
    { path: 'ordecreator', component: OrderCreatorComponent },
    { path: 'items', component: ItemsComponent },
];