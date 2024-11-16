import MyTextInput from '@/app/components/input/myTextInput';
import {useEffect, useState} from 'react';

interface DateInputProps {
    value?: string; // yyyy-mm-dd
    onChange: (value?: string) => void;
    placeholder: string;
    label?: string;
}

const MyDateInput = ({value, placeholder, onChange, label}: DateInputProps) => {
    const [inputValue, setInputValue] = useState<string>(value || '');

    useEffect(() => {
        setInputValue(value || '');
    }, [value]);

    // Validate date yyyy-mm-dd
    const validateDate = (date: string): boolean => {
        const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
        if (!date.match(dateRegex)) {
            return false;
        }
        const [_, month, day] = date.split('-').map(Number);
        if (month < 1 || month > 12) {
            return false;
        }
        return !(day < 1 || day > 31);

    }

    const onBlur = () => {
        if (inputValue && validateDate(inputValue)) {
            onChange(inputValue);
        } else {
            onChange(undefined);
            setInputValue('');
        }
    }

    return (
        <MyTextInput value={inputValue}
                     placeholder={placeholder}
                     onChangeText={setInputValue}
                     onBlur={onBlur}
                     keyboardType={'numeric'}
                     label={label}/>
    );
}

export default MyDateInput;
