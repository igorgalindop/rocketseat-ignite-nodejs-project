import { Request, Response } from 'express';

import { ImportCategoriesUseCase } from './importCategoriesUseCase';

class ImportCategoriesController {
    constructor(private importCategoriesUseCase: ImportCategoriesUseCase) {}

    handle(request: Request, response: Response): Response {
        const { file } = request;

        this.importCategoriesUseCase.execute(file);

        return response.send();
    }
}

export { ImportCategoriesController };
