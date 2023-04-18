import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { DozentComponent } from './views/dozent/dozent.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DeployComponent } from './views/deploy/deploy.component';
import { AdminComponent } from './views/admin/admin.component';
import { SideBarComponent } from './components/sidenav-toolbar/sidenav-toolbar.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: SideBarComponent, canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent},
    { path: 'loeftis', component: DozentComponent},
    { path: 'deploy', component: DeployComponent},
    { path: 'admin', component: AdminComponent},
    { path: 'edit-profile', component: EditProfileComponent},
    { path: '**', redirectTo: '/home' } //TODO: change to login page
  ]},
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

