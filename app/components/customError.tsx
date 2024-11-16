import {Image, Text} from 'react-native';

interface CustomErrorProps {
    message?: string;
}

const CustomError = ({message}: CustomErrorProps) => {
    return (
        <>
            <Image source={require('@/assets/images/something-went-wrong.png')}
                   className={'w-48 h-48'}
                   resizeMode={'contain'}
            />

            <Text className={'text-xl font-bold mt-4'}>Oops!</Text>
            <Text className={'text-lg text-center mt-2'}>{message || 'Something went wrong'}</Text>
        </>
    );
}

export default CustomError;
