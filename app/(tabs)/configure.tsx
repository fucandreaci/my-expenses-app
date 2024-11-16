import {ActivityIndicator, Alert, FlatList, View} from 'react-native';
import {useService} from '@/hooks/useService';
import {Expense} from '@/models/expense';
import {categoryService} from '@/service/category.service';
import {useEffect, useState} from 'react';
import CustomError from '@/app/components/customError';
import IconButton from '@/app/components/button/iconButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Category} from '@/models/category';
import Heading from '@/app/components/heading';
import CategoryCard from '@/app/components/categoryCard';
import CreateCategoryModal from '@/app/components/createCategoryModal/createCategoryModal';
import EditCategoryModal from '@/app/components/createCategoryModal/editCategoryModal';
import EmptyState from '@/app/components/emptyState';
import MyButton from '@/app/components/button/myButton';
import {StatusBar} from 'expo-status-bar';

const Configure = () => {
    const {
        isLoading,
        fetchData,
        error,
        results
    } = useService<Category[]>(categoryService.getAll);

    useEffect(() => {
        fetchData();
    }, []);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [editingItem, setEditingItem] = useState<Category>();

    const onDelete = async (id: number) => {
        try {
            await categoryService.deleteCategory(id);
            fetchData();
        } catch (e) {
            Alert.alert('Error', e.message);
        }
    }

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
                                              renderItem={({item}: { item: Category }) => (
                                                  <CategoryCard name={item.name}
                                                                color={item.color}
                                                                onEdit={() => {
                                                                    setEditingItem(item);
                                                                    setIsEditModalOpen(true);
                                                                }}
                                                                onDelete={() => onDelete(item.id)}/>
                                              )}
                                              keyExtractor={(item: Expense) => item.id.toString()}
                                              contentContainerClassName={'gap-4 px-4'}
                                              ListHeaderComponent={() => (
                                                  <Heading/>
                                              )}
                                    />

                                    {/* Floating button to create a category */}
                                    <View className='absolute bottom-4 left-[50%] -translate-x-[50%]'>
                                        <IconButton onPress={() => setIsCreateModalOpen(true)}
                                                    iconName='plus'
                                                    iconColor='white'
                                                    type={'contained'}/>
                                    </View>
                                    <EditCategoryModal id={editingItem?.id}
                                                       name={editingItem?.name}
                                                       color={editingItem?.color}
                                                       isModalOpen={isEditModalOpen}
                                                       setIsModalOpen={setIsEditModalOpen}
                                                       onCreated={fetchData}/>
                                </>
                            ) : (
                                <View className={'flex-1 px-4'}>
                                    <Heading/>
                                    <View className={'flex-1 justify-center items-center p-4 flex-col gap-12'}>
                                        <EmptyState/>

                                        <View className={'w-full'}>
                                            <MyButton onPress={() => setIsCreateModalOpen(true)}
                                                      title={'Create your first category'}/>
                                        </View>
                                    </View>
                                </View>
                            )
                        }


                        <CreateCategoryModal isModalOpen={isCreateModalOpen}
                                             onCreated={fetchData}
                                             setIsModalOpen={setIsCreateModalOpen}/>
                    </>
                )

            }

            <StatusBar style='dark'/>
        </SafeAreaView>
    );
}

export default Configure;
