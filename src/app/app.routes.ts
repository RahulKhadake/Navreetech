import { Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { ProductComponent } from './product/product.component';
import { ResComponent } from './res/res.component';
import { AllComponent } from './all/all.component';

export const routes: Routes = [
    {
        path:'',redirectTo:'Userlist',pathMatch:'full'
    },
    {
        path:'Userlist',component:UserlistComponent
    },
    {
        path:'Product', component:ProductComponent
    },
    {
        path:'res', component:ResComponent
    },
    
    {
        path:'All', component:AllComponent
    }
];
