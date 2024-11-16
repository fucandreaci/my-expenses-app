import {Expense} from '@/models/expense';
import {asyncStorageService} from '@/service/asyncStorage.service';

const expensesStorageKey = 'expenses';

const initExpenses = async () => {
    try {
        const results = await getAll();
        if (results) {
            return;
        }
        return asyncStorageService.setItem(expensesStorageKey, [])
    } catch (e) {
        return asyncStorageService.setItem(expensesStorageKey, [])
    }
}

const getAll = async (): Promise<Expense[]> => {
    return asyncStorageService.getItem(expensesStorageKey)
}

const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const expenses = await getAll();

    // Create a unique id for the new expense by incrementing the last id
    const lastId = expenses.length > 0 ? expenses[expenses.length - 1].id : -1;
    const id = lastId + 1;

    expenses.push({...expense, id});
    return asyncStorageService.setItem(expensesStorageKey, expenses);
}

export const expenseService = {
    initExpenses,
    getAll,
    addExpense
}
