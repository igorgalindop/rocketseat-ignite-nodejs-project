import { Category } from '../model/Category';

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

class CategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO) {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        this.categories.push(category);

        return category;
    }

    list() {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(
            (category) => category.name === name
        );

        return category;
    }
}

export { CategoriesRepository };
