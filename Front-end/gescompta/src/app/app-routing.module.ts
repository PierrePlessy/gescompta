import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ProductComponent } from './product/product.component';
import { CommandComponent } from './command/command.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: AuthenticationComponent },
    { path: 'product/all', component: AllProductComponent },
    { path: 'product/:id', component: ProductComponent },
    { path: 'command', component: CommandComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
