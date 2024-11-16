import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
    onPress: () => void;
    title: string;
    isLoading?: boolean;
}

const MyButton = ({onPress, title, isLoading}: ButtonProps) => {
    return (
        <TouchableOpacity
            disabled={isLoading}
            className={'bg-blue-500 rounded-xl min-h-[52px] justify-center items-center'}
            onPress={onPress}>
            {isLoading ? (
                <ActivityIndicator size='small' color='white'/>
            ) : (
                <Text className={'text-white font-semibold text-lg'}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

export default MyButton;
