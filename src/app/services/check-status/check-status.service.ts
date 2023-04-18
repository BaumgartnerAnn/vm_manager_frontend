import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseService } from '../response/response.service';

@Injectable({
  providedIn: 'root'
})
export class CheckStatusService {

  constructor(private responseService: ResponseService) { }
  counter: number = 0;
  //checks all 5 seconds the status of the vm and sets isStopPending accordingly
  checkStatus(vm: any): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      const interval = setInterval(() => {
        const params = new HttpParams().set('vmid', vm.properties.get('VM ID')?.value);
        this.responseService.getRequest('handle_vm/vm_info', params ).subscribe((response: any) => {
            this.counter += 1;
            if (response.status !== 'running') {
              clearInterval(interval);
              vm.properties.get('Status')?.setValue('stopped');
              this.counter = 0;
              observer.next(true);
              observer.complete();
            }
            else if (this.counter === 20) {3
              clearInterval(interval);
              this.counter = 0;
              observer.next(false);
              observer.complete();
            }
        });
      }, 5000);
    });
  }
}
