import { useRouter } from "next/navigation";

export const useNavigation = () => {
    const router = useRouter();

    const navigateToHome = () => {
        router.push('/');
    }

    const navigateToProducts = () => {
        router.push('/products');
    }

    const navigateToProductDetails = (id: number) => {
        router.push(`/products/${id}`);
    }

    const navigateToCart = () => {
        router.push('/cart');
    }

    const navigateToCheckout = () => {
        router.push('/checkout');
    }

    const navigateToProfile = () => {
        router.push('/user');
    }

    return {
        navigateToProducts,
        navigateToCart,
        navigateToHome,
        navigateToCheckout,
        navigateToProfile,
        navigateToProductDetails
    }
}