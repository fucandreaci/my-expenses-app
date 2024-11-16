import IconButton from '@/app/components/button/iconButton';
import {Alert, Modal, ScrollView, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {MyTextInput} from '@/app/components/input/myTextInput';
import {useEffect, useState} from 'react';
import MyAmountInput from '@/app/components/input/myAmountInput';
import {getDateString} from '@/utils/utility';
import MyDateInput from '@/app/components/input/myDateInput';
import MySelect from '@/app/components/input/mySelect';
import {Category} from '@/models/category';
import MyButton from '@/app/components/button/myButton';
import {useService} from '@/hooks/useService';
import {categoryService} from '@/service/category.service';
import {expenseService} from '@/service/expense.service';


interface CreateExpenseModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onCreated?: () => void;
}

const CreateExpenseModal = ({setIsModalOpen, isModalOpen, onCreated}: CreateExpenseModalProps) => {
    const {
        fetchData,
        isLoading: isFetchingCategories,
        results: categories
    } = useService<Category[]>(categoryService.getAll);

    const [name, setName] = useState<string>('');
    const [amount, setAmount] = useState<number>();
    const [date, setDate] = useState<string>(getDateString(new Date()));
    const [category, setCategory] = useState<Category>();

    const [isCreatingExpense, setIsCreatingExpense] = useState<boolean>(false);

    useEffect(() => {
        // Reset fields when modal is opened and fetch categories
        if (isModalOpen) {
            setName('');
            setAmount(undefined);
            setDate(getDateString(new Date()));
            setCategory(undefined);

            fetchData();
        }
    }, [isModalOpen]);

    const createExpense = async () => {
        if (!name || !amount || !date || !category) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Create expense
        setIsCreatingExpense(true);
        try {
            await expenseService.addExpense({
                amount,
                name,
                date,
                category
            })
        } catch (e) {
            Alert.alert('Error', 'Failed to create expense');
        } finally {
            setIsCreatingExpense(false);
        }
        onCreated?.();
        setIsModalOpen(false);
    }

    return (
        <Modal visible={isModalOpen}
               animationType='slide'
               transparent={true}>
            <SafeAreaProvider>
                <ScrollView onScroll={(event) => {
                    // If scroll down a lot, close the modal
                    if (event.nativeEvent.contentOffset.y < -100) {
                        setIsModalOpen(false);
                    }
                }}>
                    <SafeAreaView className={'flex-1 h-[100vh] bg-transparent'}>
                        <View className='flex-1 items-center bg-white bg-opacity-50'>
                            <View className='justify-end items-end w-full px-4'>
                                <IconButton onPress={() => setIsModalOpen(false)}
                                            iconName='close'
                                            iconColor='black'
                                            type={'text'}/>
                            </View>
                            <Text className='text-xl font-semibold text-center mb-4'>Create an expense</Text>

                            <View className={'flex-1 w-full px-4 gap-12'}>
                                <MyTextInput value={name}
                                             placeholder={'Input expense name...'}
                                             label={'Name'}
                                             onChangeText={setName}/>
                                <MyAmountInput value={amount}
                                               onChange={setAmount}
                                               placeholder={'Input expense amount...'}
                                               label={'Amount'}/>
                                <MyDateInput value={date}
                                             onChange={setDate}
                                             placeholder={'Input expense date (yyyy-mm-dd)'}
                                             label={'Date'}/>

                                <MySelect<Category> onValueChange={setCategory}
                                                    label={'Category'}
                                                    placeholder={'Select a category...'}
                                                    getLabel={(item: Category) => item?.name || ''}
                                                    items={categories || []}
                                                    isDisabled={isFetchingCategories}
                                                    renderItem={(item: Category, index: number, isSelected: boolean) => {
                                                        return (
                                                            <View
                                                                className={'flex-1 w-full p-4 justify-start items-center flex-row ' + (isSelected ? 'bg-gray-200' : '')}>
                                                                <Text className={'text-gray-700 font-md font-semibold'}>
                                                                    {item.name}
                                                                </Text>
                                                                <View className={'rounded-full w-4 h-4 ml-4'}
                                                                      style={{backgroundColor: item.color}}/>
                                                            </View>
                                                        );
                                                    }}/>

                                <MyButton onPress={createExpense}
                                          isLoading={isCreatingExpense}
                                          title={'Create'}/>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaProvider>
        </Modal>
    )
}

export default CreateExpenseModal;
