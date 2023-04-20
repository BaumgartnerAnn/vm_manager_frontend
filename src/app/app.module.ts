import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { TemplateDetailComponent } from './components/template-detail/template-detail.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DisplayService } from './services/display/display.service';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { DozentComponent } from './views/dozent/dozent.component';
import { AdminComponent } from './views/admin/admin.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { DeployPopUpComponent } from './components/pop-up/deploy-pop-up/deploy-pop-up.component';
import { PopUpDetailsComponent } from './components/pop-up/pop-up-details/pop-up-details.component';
import { VmListComponent } from './components/vms/vm-list/vm-list.component';
import { VmDetailComponent } from './components/vms/vm-detail/vm-detail.component';
import { DeployComponent } from './views/deploy/deploy.component';
import { DeployPopUpButtonsComponent } from './components/pop-up/pop-up-buttons/deploy/deploy.component';
import { SelectUserPopUpComponent } from './components/pop-up/pop-up-buttons/select-user-pop-up/select-user-pop-up.component';
import { ConfirmationPopUpComponent } from './components/pop-up/pop-up-buttons/confirmation-pop-up/confirmation-pop-up.component';
import { DozentPopUpButtonsComponent } from './components/pop-up/pop-up-buttons/dozent/dozent.component';
import { AdminVmDetailsComponent } from './components/vms/admin-vm-details/admin-vm-details.component';
import { ProxmoxDetaisComponent } from './components/proxmox/proxmox-detais/proxmox-detais.component';
import { RunningVmsComponent } from './components/pop-up/admin/running-vms/running-vms.component';
import { TileComponent } from './components/tile/tile.component';
import { AdminMatCarDetailComponent } from './components/admin-mat-car-detail/admin-mat-car-detail.component';
import { SideBarComponent } from './components/sidenav-toolbar/sidenav-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { LdapCardComponent } from './components/ldap-card/ldap-card.component';
import { UploadSshKeyPopUpComponent } from './components/pop-up/upload-ssh-key-pop-up/upload-ssh-key-pop-up.component';
import { UploadPopUpComponent } from './components/pop-up/upload-pop-up/upload-pop-up.component';
import { SnapshotPopUpComponent } from './components/pop-up/snapshot-pop-up/snapshot-pop-up.component';
import { EditProfileComponent } from './views/edit-profile/edit-profile.component';
import { ChangePasswordPopUpComponent } from './components/pop-up/change-password-pop-up/change-password-pop-up.component';
import { EditUserComponent } from './components/pop-up/edit-user/edit-user/edit-user.component';
import { ActionOnClassComponent } from './components/pop-up/action-on-class/action-on-class.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VmListComponent,
    VmDetailComponent,
    DeployComponent,
    TemplateDetailComponent,
    DeployPopUpComponent,
    PopUpDetailsComponent,
    DeployPopUpButtonsComponent,
    SelectUserPopUpComponent,
    ConfirmationPopUpComponent,
    DozentComponent,
    DozentPopUpButtonsComponent,
    AdminComponent,
    AdminVmDetailsComponent,
    ProxmoxDetaisComponent,
    RunningVmsComponent,
    TileComponent,
    AdminMatCarDetailComponent,
    SideBarComponent,
    LdapCardComponent,
    UploadPopUpComponent,
    SnapshotPopUpComponent,
    EditProfileComponent,
    ChangePasswordPopUpComponent,
    UploadSshKeyPopUpComponent,
    EditUserComponent,
    ActionOnClassComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    ClipboardModule,
    MatDialogModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [DisplayService, {
    provide: MAT_DIALOG_DEFAULT_OPTIONS,
    useValue: { hasBackdrop: true }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

