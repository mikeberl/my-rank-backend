import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey : 'SECRET' // TODO protected this in env variable
        });
    }

    async validate(payload : any) {
        // TODO add the logic

        return {
            id: payload.sub,  
            name : payload.name,
        }
    }
}