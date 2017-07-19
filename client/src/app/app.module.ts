import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

// components
import { AppComponent } from './app.component';
import { OrderComponent } from './component/order.component';
import { OrderCreatorComponent } from './component/ordercreator.component';
import { ItemsComponent } from './component/items.component';

// services
import { OrderClient } from './service/orderclient.service';

@NgModule({
    declarations: [
        AppComponent,
        OrderComponent,
        OrderCreatorComponent,
        ItemsComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(rootRouterConfig, { useHash: true }),
    ],
    providers: [
        OrderClient,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
