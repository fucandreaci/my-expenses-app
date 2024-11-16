import {TouchableOpacity} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

interface FloatingButtonProps {
    onPress: () => void;
    iconName: string;
    iconSize?: number;
    iconColor?: string;
    type?: 'contained' | 'text';
}

const IconButton = ({
                        onPress,
                        iconName,
                        iconSize = 24,
                        iconColor = 'white',
                        type = 'contained'
                    }: FloatingButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}
                          className={`rounded-full shadow-lg w-[48px] h-[48px] items-center justify-center${type === 'contained' ? ' bg-blue-500' : ''}`}>
            <MaterialCommunityIcons name={iconName}
                                    size={iconSize}
                                    color={iconColor}/>
        </TouchableOpacity>
    );
}

export default IconButton;
