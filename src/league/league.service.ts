import { Injectable } from '@nestjs/common';
import { ignoreElements, Observable } from 'rxjs';
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
          if (league.Lid == reg.Lid) {
            tmp_league.push(league);
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

    leaveLeague(Uid : number, Lid : number) {
      var i = 0;
      var regg : Registration | undefined = undefined;
      this.registrations.forEach((reg : Registration)=> {
        if((reg.Uid == Uid) && (reg.Lid == Lid)) {
          regg = this.registrations.splice(i, 1)[0];
        }
        i++;
      })
      return regg;
    }

    newLeague(body : any) {
      const league : League = {
        Lid : this.getNewId(),
        name : body.name,
        city : body.city,
        active : true,
        admin_id : body.admin_id,
        img : '/assets/images/users/1.jpg',
        sport : 'Roundnet'
      }
      this.leagues.push(league);
      return this.leagues;
    }

    getNewId() {
      var i = 0;
      while (i >= 0) {
          var check_if_exist = false;
          for (let u of this.leagues) {
              if (i === u.Lid) {
                  check_if_exist = true;
                  break;
              }
          }
          if (check_if_exist === false) {
              break;
          }
          i++;
      }
      return i;
  }
}
