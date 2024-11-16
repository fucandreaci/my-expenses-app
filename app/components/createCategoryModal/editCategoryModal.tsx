import {categoryService} from '@/service/category.service';
import CreateCategoryModalContent from '@/app/components/createCategoryModal/createCategoryModalContent';

interface EditCategoryModalProps {
    name?: string;
    color?: string;
    id?: number;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onCreated?: () => void;
}

const EditCategoryModal = ({
                               id,
                               name: defaultName,
                               color: defaultColor,
                               setIsModalOpen,
                               isModalOpen,
                               onCreated
                           }: EditCategoryModalProps) => {
    const editCategory = (name: string, color: string) => {
        if (id !== undefined) {
            return categoryService.editCategory({id, name, color});
        }
    }

    return (
        <CreateCategoryModalContent defaultName={defaultName}
                                    defaultColor={defaultColor}
                                    isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen}
                                    createCategory={editCategory}
                                    onCreated={onCreated}/>
    )
}

export default EditCategoryModal;
