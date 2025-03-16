export interface NavItem {
    url: string,
    text: string,
}

export const navItems: NavItem[] = [
    {
        url: "/dashboard",
        text: "Profile"
    },
    {
        url: "/dashboard/inventory",
        text: "Inventory"
    },
    {
        url: "/dashboard/shop",
        text: "Shop"
    }
]