import { Component } from '@angular/core';
import { ResponseService } from 'app/services/response/response.service';

@Component({
  selector: 'app-upload-wireguard-pop-up',
  templateUrl: './upload-wireguard-pop-up.component.html',
  styleUrls: ['./upload-wireguard-pop-up.component.css']
})
export class UploadWireguardPopUpComponent {
  hiddenPrivatKey: boolean = true;
  publicKey: string = '';
  privatKey: string = '';
  wireguardConfig: string = '';

  constructor(private responseService: ResponseService) { }

  changePrivateKeyHidden(){
    this.hiddenPrivatKey = !this.hiddenPrivatKey
  }
  getWireguradConfig(){
    this.responseService.postRequest('handle_user/wireguard_config', {TODO: 'add_private_public_key'}).subscribe((response: any) => {
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
    });
  }
  updatePrivateKey(event: any){
    this.privatKey = (event.target as HTMLInputElement).value;
  }
  updatePublicKey(event: any){
    this.publicKey = (event.target as HTMLInputElement).value;
  }
}