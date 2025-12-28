import { useEffect, useState } from "react";
import type { MenuItemRecord } from "../../shared/types/menu";
import { loadMenuItems } from "../../actions/MenuItem.action";

const useMenuItems = () => {
    const [menuItems, setMenuItems] = useState<MenuItemRecord[]>([]);


    useEffect(() => {
        const fetchMenuItems = async () => {
            const menuItems = await loadMenuItems();
            setMenuItems(menuItems);
        }
        fetchMenuItems();
    }, []);

    return { menuItems, setMenuItems };
}

export default useMenuItems;