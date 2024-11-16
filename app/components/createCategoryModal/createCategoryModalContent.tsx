import {useEffect, useState} from 'react';
import {Alert, Modal, ScrollView, Text, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import IconButton from '@/app/components/button/iconButton';
import MyButton from '@/app/components/button/myButton';
import MyTextInput from '@/app/components/input/myTextInput';

interface CreateCategoryModalContentProps {
    defaultName?: string;
    defaultColor?: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    createCategory: (name: string, color: string) => Promise<void>;
    onCreated?: () => void;
}

const CreateCategoryModalContent = ({
                                        defaultName,
                                        defaultColor,
                                        setIsModalOpen,
                                        isModalOpen,
                                        createCategory,
                                        onCreated
                                    }: CreateCategoryModalContentProps) => {
    const [name, setName] = useState<string>(defaultName || '');
    const [color, setColor] = useState<string>(defaultColor || '');

    const [isCreatingCategory, setIsCreatingCategory] = useState<boolean>(false);

    const isEditing = !!defaultName;

    useEffect(() => {
        // Reset fields when modal is opened
        if (isModalOpen) {
            setName('');
            setColor('');
        }
    }, []);

    // Update default name and color
    useEffect(() => {
        if (defaultName) {
            setName(defaultName || '');
        }
    }, [defaultName]);

    useEffect(() => {
        if (defaultColor) {
            setColor(defaultColor || '');
        }
    }, [defaultColor]);

    const createOrUpdateCategory = async () => {
        if (!name) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Execute create or update category
        setIsCreatingCategory(true);
        try {
            await createCategory(name, color.toLowerCase())
        } catch (e) {
            Alert.alert('Error', 'Failed to create category');
        } finally {
            setIsCreatingCategory(false);
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
                            <Text className='text-xl font-semibold text-center mb-4'>
                                {isEditing ? 'Edit category' : 'Create a new category'}
                            </Text>

                            <View className={'flex-1 w-full px-4 gap-12'}>
                                <MyTextInput value={name}
                                             placeholder={'Input category name...'}
                                             label={'Name'}
                                             onChangeText={setName}/>

                                <MyTextInput value={color}
                                             placeholder={'Input category color...'}
                                             label={'Color (optional)'}
                                             onChangeText={setColor}/>

                                <MyButton onPress={createOrUpdateCategory}
                                          isLoading={isCreatingCategory}
                                          title={isEditing ? 'Update' : 'Create'}/>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </SafeAreaProvider>
        </Modal>
    )
}

export default CreateCategoryModalContent;
