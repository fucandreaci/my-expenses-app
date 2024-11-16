import {Image, Text, View} from 'react-native';

const CustomError = () => {
    return (
        <View className={'flex flex-col items-center justify-center'}>
            <Image source={require('@/assets/images/empty-folder.png')}
                   className={'w-48 h-48'}
                   resizeMode={'contain'}
            />

            <Text className={'text-xl font-bold mt-4'}>No results found</Text>
        </View>
    );
}

export default CustomError;
