import {Category} from '@/models/category';
import {asyncStorageService} from '@/service/asyncStorage.service';

const categoriesStorageKey = 'categories';

const initCategories = async () => {
    try {
        const results = await getAll();
        if (results) {
            return;
        }
        return asyncStorageService.setItem(categoriesStorageKey, [])
    } catch (e) {
        return asyncStorageService.setItem(categoriesStorageKey, [])
    }
}

const getAll = async (): Promise<Category[]> => {
    return asyncStorageService.getItem(categoriesStorageKey)
}

const addCategory = async (category: Omit<Category, 'id'>) => {
    const categories = await getAll();

    // Create a unique id for the new category by incrementing the last id
    const lastId = categories.length > 0 ? categories[categories.length - 1].id : -1;
    const id = lastId + 1;

    categories.push({...category, id});
    return asyncStorageService.setItem(categoriesStorageKey, categories);
}

const editCategory = async (category: Category) => {
    const categories = await getAll();
    const index = categories.findIndex(c => c.id === category.id);
    if (index === -1) {
        throw new Error('Category not found');
    }

    categories[index] = category;

    return asyncStorageService.setItem(categoriesStorageKey, categories);
}

const deleteCategory = async (categoryId: number) => {
    const categories = await getAll();
    const index = categories.findIndex(c => c.id === categoryId);
    if (index === -1) {
        throw new Error('Category not found');
    }

    categories.splice(index, 1);

    return asyncStorageService.setItem(categoriesStorageKey, categories);
}

export const categoryService = {
    initCategories,
    getAll,
    addCategory,
    editCategory,
    deleteCategory
}
