import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '@modules/accounts/useCases/CreateUser/CreateUserUseCase';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@test.com',
            password: '1234',
            name: 'User Test',
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: '1234',
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '1234',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '000123',
                email: 'user@user.com',
                password: '1234',
                name: 'User Test',
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassWord',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
