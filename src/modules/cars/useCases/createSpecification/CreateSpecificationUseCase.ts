import { inject, injectable } from 'tsyringe';

import { AppError } from '@shared/errors/AppError';
import { Specification } from '@modules/cars/entities/Specification';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private specificationsRepository: ISpecificationsRepository
    ) {}

    async execute({ name, description }: IRequest): Promise<Specification> {
        const SpecificationAlreadyExists =
            await this.specificationsRepository.findByName(name);

        if (SpecificationAlreadyExists) {
            throw new AppError('Specification already exists!');
        }

        const specification = await this.specificationsRepository.create({
            name,
            description,
        });

        return specification;
    }
}

export { CreateSpecificationUseCase };
