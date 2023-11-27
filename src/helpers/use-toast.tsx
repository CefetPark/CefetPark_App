import { useToast as useNativeBaseToast } from 'native-base';

export interface toastProps {
    description: string,
    variant: 'subtle',
    bgColor: 'success' | 'danger' | 'warning',
    placement: 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-left' | 'bottom-right'
}

const useToast = () => {
    const toast = useNativeBaseToast();

    const showToast = (props: toastProps) => {
        toast.show({
            duration: 2000,
            title: props.bgColor == 'success' ? 'Tudo certo!' : props.bgColor == 'danger' ? 'Algo deu errado!' : 'Ops...',
            ...props,
        });
    };

    return showToast;
};

export default useToast;

