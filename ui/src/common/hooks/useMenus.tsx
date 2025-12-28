import { useEffect, useState } from "react";
import type { MenuUXRecord } from "../../shared/types/menu";
import { loadMenus } from "../../actions/Menu.action";

const useMenus = () => {
    const [menus, setMenus] = useState<MenuUXRecord[]>([]);

    useEffect(() => {
        const fetchMenus = async () => {
            const menus = await loadMenus();
            setMenus(menus);
        };
        fetchMenus();
    }, []);

    return { menus, setMenus };
}

export default useMenus;