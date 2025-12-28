import { makeGetRequest } from ".";
import type { MenuItemRecord } from "../shared/types/menu";

export const loadMenuItems = async () => {
    const response = await makeGetRequest<MenuItemRecord[]>('/menu-item');
    return response;
}
