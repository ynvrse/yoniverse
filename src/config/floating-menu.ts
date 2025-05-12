import { CirclePlus, Home, LucideIcon, ScrollText, ShoppingBasket } from 'lucide-react';

interface NavItem {
    title: string;
    to: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
    icon?: LucideIcon;
    label?: string;
    isCenter?: boolean;
}

export const floatingMenu: NavItem[] = [
    {
        title: 'Cart',
        to: '/carts',
        icon: ShoppingBasket,
    },

    {
        title: 'Product',
        to: '/master-data/products',
        icon: CirclePlus,
    },
    {
        title: 'Dashboard',
        to: '/',
        icon: Home,
        isCenter: true,
    },
    {
        title: 'Riwayat Transaksi',
        to: '/history-transactions',
        icon: ScrollText,
    },
];
