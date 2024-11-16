import {Text, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import React from 'react';

interface MySelectProps<T> {
    items: T[];
    label?: string;
    onValueChange: (value: T) => void;
    placeholder: string;
    getLabel: (item?: T) => string;
    renderItem?: (item: T, index: number, isSelected: boolean) => React.JSX.Element;
    isDisabled?: boolean;
}

const MySelect = <T, >({items, label, onValueChange, placeholder, getLabel, renderItem, isDisabled}: MySelectProps<T>) => {
    const renderRow = (item: T, index: number, isSelected: boolean) => {
        if (renderItem !== undefined) {
            return renderItem(item, index, isSelected);
        }

        return (
            <View className={'flex-1 w-full p-4 justify-center ' + (isSelected ? 'bg-gray-200' : '')}>
                <Text className={'text-gray-700 font-md font-semibold'}>
                    {getLabel(item)}
                </Text>
            </View>
        );
    }

    return (
        <View className={'w-full gap-2'}>
            {
                label && (
                    <Text className={'text-gray-700 font-md font-semibold'}>
                        {label}
                    </Text>
                )
            }
            <SelectDropdown
                data={items}
                onSelect={(selectedItem) => {
                    onValueChange(selectedItem);
                }}
                disabled={isDisabled}
                renderItem={renderRow}
                showsVerticalScrollIndicator={false}
                dropdownStyle={{borderRadius: 8}}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View className={'h-16 py-2 px-4 bg-gray-100 rounded-xl gap-2 flex-row justify-between ' + (isDisabled ? 'opacity-50' : '')}>
                            <Text className={(selectedItem ? 'text-gray-700' : 'text-gray-500') + ' text-xl self-center justify-center'}>
                                {selectedItem ? getLabel(selectedItem) : placeholder}
                            </Text>
                            <MaterialCommunityIcons name={isOpened ? 'chevron-up' : 'chevron-down'}
                                                    size={28}
                                                    color={'gray'}
                                                    className={'self-center'}/>
                        </View>
                    );
                }}
            />
        </View>
    )
}

export default MySelect;
