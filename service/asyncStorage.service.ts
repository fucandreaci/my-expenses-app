import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error('Error setting item:', error);
        throw error;
    }
};

const getItem = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value != null ? JSON.parse(value) : null;
    } catch (error) {
        console.error('Error getting item:', error);
        return null;
    }
};

const removeItem = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('Error removing item:', error);
        throw error;
    }
};

export const asyncStorageService = {
    setItem,
    getItem,
    removeItem,
};
