import { Injectable } from '@nestjs/common';
import { Registration } from 'src/models/registration.interface';

@Injectable()
export class RegistrationService {

    registrations : Registration[] = [];


    addRegistration(Uid : number, Lid : number) {
        var reg : Registration = {
            Uid : Uid,
            Lid : Lid
        }

        this.registrations.push(reg);
    }

    removeRegistration(Uid : number, Lid : number) {}

    getRegistrationOfUser(Uid : number) {
        var tmp : Registration[] = [];
        this.registrations.forEach(reg => {
            if (reg.Uid === Uid) {
                tmp.push(reg);
            }
        });
        return tmp;
    }
}
