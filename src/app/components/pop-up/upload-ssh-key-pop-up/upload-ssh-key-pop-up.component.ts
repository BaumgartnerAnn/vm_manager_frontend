import { Component, Inject } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-wireguard-pop-up',
  templateUrl: './upload-ssh-key-pop-up.component.html',
  styleUrls: ['./upload-ssh-key-pop-up.component.css']
})
export class UploadSshKeyPopUpComponent {
  hiddenPrivatKey: boolean = true;
  publicKey: string = '';
  privatKey: string = '';
  wireguardConfig: string = '';
  openAsShareKey: boolean = false;
  title: string = 'Wireguard config';
  buttonTitle: string = 'Generate Wireguard config';

  constructor(private responseService: ResponseService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UploadSshKeyPopUpComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    if (this.data) {
      this.openAsShareKey = true;
      this.title = 'Configure Share';
      this.buttonTitle = 'Configure Share';
    }
  }

  changePrivateKeyHidden() {
    this.hiddenPrivatKey = !this.hiddenPrivatKey
  }
  getWireguradConfig() {
    if(!this.openAsShareKey) {
      this.responseService.postRequest('handle_user/wireguard_config', { "private_key": this.privatKey, "public_key": this.publicKey }).subscribe((response: any) => {
        if (response.wireguard_config === 'failed') {
          this.openSnackBar('Failed to generate Wireguard config', 'OK');
          return;
        }
        this.wireguardConfig = response.wireguard_config;
        // download the wireguard config
        const data = new Blob([this.wireguardConfig], { type: 'text/plain' });
        const url = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'saiberleergang.conf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        this.dialogRef.close();
      });
    } else {
      this.responseService.postRequest('handle_user/upload_share_key', { "public_key": this.publicKey }).subscribe(() => {});
      this.dialogRef.close();
    }
  }
  updatePrivateKey(event: any) {
    this.privatKey = (event.target as HTMLInputElement).value;
  }
  updatePublicKey(event: any) {
    this.publicKey = (event.target as HTMLInputElement).value;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}