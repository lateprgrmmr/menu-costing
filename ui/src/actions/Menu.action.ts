import { makeGetRequest } from ".";
import type { MenuUXRecord } from "../shared/types/menu";

export const loadMenus = async (): Promise<MenuUXRecord[]> => {
    const response = await makeGetRequest<MenuUXRecord[]>('/menus');
    return response;
}