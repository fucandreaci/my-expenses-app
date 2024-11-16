import {Image, Text, View} from 'react-native';

const Heading = () => {
    return (
        <View className={'my-6 mx-4 flex-row justify-between items-center'}>
            <View className={'flex-col'}>
                <Text className={'font-medium text-md text-gray-800'}>
                    Welcome back on
                </Text>
                <Text className={'font-semibold text-2xl text-gray-800'}>
                    My expenses app
                </Text>
            </View>

            <Image source={require('@/assets/images/dollar.png')}
                   resizeMode={'contain'}
                   className={'w-20 h-20'}/>
        </View>
    )
}

export default Heading;
