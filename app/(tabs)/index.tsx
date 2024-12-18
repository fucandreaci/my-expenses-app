import {ActivityIndicator, FlatList, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useService} from '@/hooks/useService';
import {expenseService} from '@/service/expense.service';
import {Expense} from '@/models/expense';
import {useEffect, useState} from 'react';
import ExpenseCard from '@/app/components/expenseCard';
import IconButton from '@/app/components/button/iconButton';
import CustomError from '@/app/components/customError';
import CreateExpenseModal from '@/app/components/createExpenseModal';
import Heading from '@/app/components/heading';
import EmptyState from '@/app/components/emptyState';
import MyButton from '@/app/components/button/myButton';
import {StatusBar} from 'expo-status-bar';

const Home = () => {
    const {
        isLoading,
        fetchData,
        error,
        results
    } = useService<Expense[]>(expenseService.getAll);

    useEffect(() => {
        fetchData();
    }, []);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);

    return (
        <SafeAreaView className='flex-1 bg-white'>
            {
                isLoading ? (
                    <View className={'flex-1 justify-center items-center'}>
                        <ActivityIndicator size='large'/>
                    </View>
                ) : error ? (
                    <View className={'flex-1 justify-center items-center p-4'}>
                        <CustomError message={error}/>
                    </View>
                ) : !!results && (
                    <>
                        {
                            results.length > 0 ? (
                                <>
                                    <FlatList data={results}
                                              renderItem={({item}: { item: Expense }) => (
                                                  <ExpenseCard date={item.date}
                                                               name={item.name}
                                                               amount={item.amount}
                                                               category={item.category}/>
                                              )}
                                              keyExtractor={(item: Expense) => item.id.toString()}
                                              contentContainerClassName={'gap-4 px-4'}
                                              ListHeaderComponent={() => (
                                                  <Heading/>
                                              )}
                                    />
                                    {/* Floating button to create an expense */}
                                    <View className='absolute bottom-4 left-[50%] -translate-x-[50%]'>
                                        <IconButton onPress={() => setIsCreateModalOpen(true)}
                                                    iconName='plus'
                                                    iconColor='white'
                                                    type={'contained'}/>
                                    </View>
                                </>
                            ) : (
                                <View className={'flex-1 px-4'}>
                                    <Heading/>
                                    <View className={'flex-1 justify-center items-center p-4 flex-col gap-12'}>
                                        <EmptyState/>

                                        <View className={'w-full'}>
                                            <MyButton onPress={() => setIsCreateModalOpen(true)}
                                                      title={'Create your first expense'}/>
                                        </View>
                                    </View>
                                </View>
                            )
                        }

                        <CreateExpenseModal isModalOpen={isCreateModalOpen}
                                            onCreated={fetchData}
                                            setIsModalOpen={setIsCreateModalOpen}/>
                    </>
                )

            }
            <StatusBar style='dark'/>
        </SafeAreaView>
    );
}

export default Home;
