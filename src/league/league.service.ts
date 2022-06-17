import { Injectable } from '@nestjs/common';
import { League } from 'src/models/league.interface';

@Injectable()
export class LeagueService {
    private readonly leagues : League[] = [
        {Lid : 0, name: 'Roundnet BZ', city: 'Bolzano', sport: 'Roundnet', admin_id : 1, img: '/assets/images/users/1.jpg', active: true},
        {Lid : 1, name: 'Roundnet Padova', city: 'Padova', sport: 'Roundnet', admin_id : 2, img: '/assets/images/users/2.jpg', active: true},
        {Lid : 2, name: 'Roundnet Graz', city: 'Graz', sport: 'Roundnet', admin_id : 1, img: '/assets/images/users/3.jpg', active: true},
        {Lid : 3, name: 'Roundnet Monaco', city: 'Monaco', sport: 'Roundnet', admin_id : 3, img: '/assets/images/users/4.jpg', active: true},
        {Lid : 4, name: 'Roundnet Milano', city: 'Milano', sport: 'Roundnet', admin_id : 4, img: '/assets/images/users/5.jpg', active: false},  
      ]

    
    getByUser(Uid : number) {
    }
}
