export interface NavItem {
    url: string,
    text: string,
}

export const navItems: NavItem[] = [
    {
        url: "/dashboard",
        text: "Overview"
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