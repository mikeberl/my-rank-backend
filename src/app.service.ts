import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getHello() {
    //return this.user;
    return 'Hello world.';
  }
}
