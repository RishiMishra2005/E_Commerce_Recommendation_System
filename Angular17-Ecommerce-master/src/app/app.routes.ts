import { Routes } from '@angular/router';
import { ProductsComponent } from '../components/products/products.component';
import { ProudctDetailsComponent } from '../components/proudct-details/proudct-details.component';
import { AboutusComponent } from '../components/aboutus/aboutus.component';
import { NotfoundpageComponent } from '../components/notfoundpage/notfoundpage.component';
import { ProductsParentComponent } from '../components/products-parent/products-parent.component';
import { ObsAndOperatorsComponent } from '../components/obs-and-operators/obs-and-operators.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginAuthComponent } from '../components/login-auth/login-auth.component';
import { UserAuthComponent } from '../components/user-auth/user-auth.component';
import { userGuardGuard } from '../Guards/user-guard.guard';
import { CartComponent } from '../components/cart/cart.component';

export const routes: Routes = [
  { path: '', component: UserAuthComponent, title: 'Home' },
  { path: 'home', component: ProductsParentComponent, title: 'Products' },
  { path: 'products', component: ProductsComponent, title: 'Products' },
  { path: 'prd/:productID', component: ProudctDetailsComponent, title: 'Details'},
  { path: 'details', component: ProudctDetailsComponent, title: 'Details' },
  { path: 'Admin', component: AdminComponent, title: 'Admin Page', canActivate:[userGuardGuard] },
  { path: 'AboutUs', component: AboutusComponent, title: 'About Page' },
  { path: 'signup', component: LoginAuthComponent, title: 'Sign Up' },
  { path: 'login', component: UserAuthComponent, title: 'Login' },
  { path: 'Obs', component: ObsAndOperatorsComponent, title: 'Observer Page' },
  {path: 'cart', component: CartComponent, title: 'Cart'},
  { path: '**', component: NotfoundpageComponent, title: 'Not found page' }
];
