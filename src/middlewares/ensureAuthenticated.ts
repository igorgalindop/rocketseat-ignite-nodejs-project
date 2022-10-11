import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    respose: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('Token missing');
    }

    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = verify(
            token,
            '67d03aa456607de9059b4f7de23ea5a8'
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new Error('User does not exists');
        }

        request.user = {
            id: user.id,
        };

        next();
    } catch (error) {
        throw new Error('Invalid token');
    }
}
