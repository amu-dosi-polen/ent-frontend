import { Injectable } from '@angular/core';
import { Output, Input, EventEmitter} from '@angular/core';

@Injectable()
export class SharedService {

  @Output() change: EventEmitter<boolean> = new EventEmitter();
  @Output() jwtTimeOut: EventEmitter<boolean> = new EventEmitter();

  changeAppliBureauWithOtherUser(result) {
    this.change.emit(result);
  }

  initialLogin(){
    this.jwtTimeOut.emit()
  }
}
