import {Text, View} from 'react-native';
import IconButton from '@/app/components/button/iconButton';

interface CategoryCardProps {
    name: string;
    color?: string;
    onEdit: () => void;
    onDelete: () => void;
}

const CategoryCard = ({name, color, onEdit, onDelete}: CategoryCardProps) => {
    return (
        <View className={'flex-1 flex-row justify-between items-center border-solid border-2 border-gray-200 rounded-xl py-4 px-6'}>
            <View className={'flex-row items-center'}>
                <Text className={'text-lg text-gray-800 font-semibold'}>
                    {name}
                </Text>
                {
                    color && (
                        <View className={'rounded-full w-4 h-4 ml-4'}
                              style={{backgroundColor: color}}/>
                    )
                }
            </View>
            <View className={'flex-row'}>
                <IconButton onPress={onEdit}
                            iconName='pencil'
                            iconColor='#2196F3'
                            type={'text'}/>
                <IconButton onPress={onDelete}
                            iconName='delete'
                            iconColor='#D32F2F'
                            type={'text'}/>

            </View>
        </View>
    );
}

export default CategoryCard;
