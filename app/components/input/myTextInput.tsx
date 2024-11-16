import {Text, TextInput, View} from 'react-native';

interface MyTextInputProps {
    value: string;
    placeholder: string;
    onChangeText: (value: string) => void;
    label?: string;
    keyboardType?: 'numeric' | 'default';
    onBlur?: () => void;
    prefix?: string;
    onPress?: () => void;
}

export const MyTextInput = ({
                                value,
                                placeholder,
                                onChangeText,
                                label,
                                keyboardType,
                                onBlur,
                                prefix,
                                onPress
                            }: MyTextInputProps) => {
    return (
        <View className={'w-full gap-2'}>
            {
                label && (
                    <Text className={'text-gray-700 font-md font-semibold'}>
                        {label}
                    </Text>
                )
            }
            <View className={'h-16 py-2 px-4 bg-gray-100 rounded-xl gap-2 flex-row'} onTouchEnd={onPress}>
                {
                    prefix && (
                        <Text className={'text-gray-700 text-xl self-center justify-center font-semibold'}>
                            {prefix}
                        </Text>
                    )
                }
                <TextInput value={value}
                           onBlur={onBlur}
                           placeholder={placeholder}
                           placeholderClassName={'text-gray-500 text-[16px] flex-1'}
                           placeholderTextColor={'gray'}
                           keyboardType={keyboardType}
                           onChangeText={onChangeText}
                           className={'text-gray-700 text-[16px] flex-1'}/>
            </View>
        </View>
    );
}

export default MyTextInput;
