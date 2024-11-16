import MyTextInput from '@/app/components/input/myTextInput';
import {useEffect, useState} from 'react';

interface MyAmountInputProps {
    value?: number;
    onChange: (value?: number) => void;
    placeholder: string;
    label?: string;
}

const MyAmountInput = ({value, placeholder, onChange, label}: MyAmountInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value?.toString() || '');

    useEffect(() => {
        setInputValue(value?.toString() || '');
    }, [value]);

    return (
        <MyTextInput value={inputValue}
                     placeholder={placeholder}
                     onChangeText={setInputValue}
                     onBlur={() => onChange(inputValue ? parseFloat(inputValue) : undefined)}
                     keyboardType={'numeric'}
                     prefix={'£'}
                     label={label}/>
    );
}

export default MyAmountInput;
