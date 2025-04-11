// src/auth/jwt.strategy.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './auth.interface';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AuthService extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: fs.readFileSync(
                path.resolve(__dirname, '../../keys/public.key'),
                'utf8',
            ),
            algorithms: ['RS256'],
        });
    }

    validate(payload: JwtPayload): JwtPayload {
        if (!payload.userId || !payload.role || !payload.clientId) {
            throw new BadRequestException('Invalid JWT payload');
        }

        return payload;
    }
}
