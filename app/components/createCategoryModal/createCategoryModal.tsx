import {categoryService} from '@/service/category.service';
import CreateCategoryModalContent from '@/app/components/createCategoryModal/createCategoryModalContent';


interface CreateCategoryModalProps {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
    onCreated?: () => void;
}

const CreateCategoryModal = ({setIsModalOpen, isModalOpen, onCreated}: CreateCategoryModalProps) => {
    const createCategory = (name: string, color: string) => {
        return categoryService.addCategory({name, color});
    }

    return (
        <CreateCategoryModalContent isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen}
                                    createCategory={createCategory}
                                    onCreated={onCreated}/>
    )
}

export default CreateCategoryModal;
