import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1.
            ignoreExpiration: false, // 2.
            secretOrKey: process.env.SECRET, // 3.
        });
    }
    async validate(payload: any) {
        // 4.
        return {
            userId: payload.userId,
            email: payload.email,
            artistId: payload.artistId, // 2
        };
    }
}