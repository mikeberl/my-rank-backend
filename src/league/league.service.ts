import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { League } from 'src/models/league.interface';
import { Registration } from 'src/models/registration.interface';

@Injectable()
export class LeagueService {
    private readonly leagues : League[] = [
        {Lid : 0, name: 'Roundnet BZ', city: 'Bolzano', sport: 'Roundnet', admin_id : 1, img: '/assets/images/users/1.jpg', active: true},
        {Lid : 1, name: 'Roundnet Padova', city: 'Padova', sport: 'Roundnet', admin_id : 2, img: '/assets/images/users/2.jpg', active: true},
        {Lid : 2, name: 'Roundnet Graz', city: 'Graz', sport: 'Roundnet', admin_id : 1, img: '/assets/images/users/3.jpg', active: true},
        {Lid : 3, name: 'Roundnet Monaco', city: 'Monaco', sport: 'Roundnet', admin_id : 3, img: '/assets/images/users/4.jpg', active: true},
        {Lid : 4, name: 'Roundnet Milano', city: 'Milano', sport: 'Roundnet', admin_id : 4, img: '/assets/images/users/5.jpg', active: false},  
      ]

    private readonly registrations : Registration[] = [
      {
        Lid : 0,
        Uid : 1
      },
      {
        Lid : 1,
        Uid : 1
      },
      {
        Lid : 0,
        Uid : 2
      },
      {
        Lid : 2,
        Uid : 1,
      },
      {
        Lid : 1,
        Uid : 0
      },
    ]

    
    getByUser(Uid : number) {
      var tmp : Registration[] = [];
      var tmp_league : League[] = [];
      this.registrations.forEach((reg : Registration)=> {
        if(reg.Uid == Uid) {
          tmp.push(reg);

        }
      })
      tmp.forEach((reg : Registration) => {
        this.leagues.forEach((league : League) => {
          if (league.Lid === reg.Lid) {
            tmp_league.push(league);
            return league;
          }
        })
      })
      return tmp_league;
    }

    getAll() {
      return this.leagues;
    }

    getNotJoined(Uid : number) {
      var tmp : Registration[] = [];
      var tmp_league : League[] = [];
      this.registrations.forEach((reg : Registration)=> {
        if(reg.Uid != Uid) {
          tmp.push(reg);

        }
      })
      tmp.forEach((reg : Registration) => {
        this.leagues.forEach((league : League) => {
          if (league.Lid === reg.Lid) {
            tmp_league.push(league);
            return league;
          }
        })
      })
      return tmp_league;
      
    }

    newRegistration(Uid : number, Lid : number, expire_date? : Date) {
        const reg : Registration = {
          Uid : Uid,
          Lid : Lid,
        }

        this.registrations.push(reg);
        return reg;
    }
}
