import { useRouter } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    }

    const navigateToProducts = () => {
        router.push('/products');
    }

    const navigateToCart = () => {
        router.push('/cart');
    }

    const navigateToCategories = () => {
        router.push('/categories');
    }

    const navigateToContacts = () => {
        router.push('/contacts');
    }

    return {
        navigateToProducts,
        navigateToCart,
        navigateToHome,
        navigateToCategories,
        navigateToContacts
    }
}
