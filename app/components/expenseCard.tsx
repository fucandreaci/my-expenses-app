import {Category} from '@/models/category';
import {Text, View} from 'react-native';

interface ExpenseCardProps {
    date: string;
    name: string;
    amount: number;
    category: Category;
}

const ExpenseCard = ({date, name, amount, category}: ExpenseCardProps) => {
    return (
        <View className={'flex-row justify-between flex-1 items-center bg-gray-200 rounded-xl py-4 px-6'}>
            <View className={'flex-col'}>
                <Text className={'text-sm text-gray-500'}>
                    {date}
                </Text>
                <Text className={'text-lg text-gray-800 font-semibold'}>
                    {name}
                </Text>
            </View>
            <View className={'flex-col items-end'}>
                <Text className={'text-lg text-gray-800 font-bold'}>
                    £ {amount.toFixed(2)}
                </Text>
                <View className={'flex-row items-center gap-2'}>
                    {
                        category.color && (
                            <View className={'rounded-full w-4 h-4 ml-4'}
                                  style={{backgroundColor: category.color}}/>
                        )
                    }
                    <Text>{category.name}</Text>
                </View>
            </View>
        </View>
    );
}

export default ExpenseCard;
