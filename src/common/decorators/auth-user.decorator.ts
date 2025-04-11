import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtResponse } from '../../auth/auth.interface'; // Adjust the path as needed

export const AuthUser = createParamDecorator(
    (data: keyof JwtResponse | undefined, context: ExecutionContext) => {
        const request: Request = context.switchToHttp().getRequest();

        const user: JwtResponse = request.user as JwtResponse;

        return data ? user?.[data] : user;
    },
);
