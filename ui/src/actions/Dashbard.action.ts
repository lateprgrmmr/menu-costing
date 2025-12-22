import { makeGetRequest } from ".";
import type { DashboardData } from "../shared/types/dashboard";


export function getDashboardData() {
    return makeGetRequest<DashboardData>('/dashboard/data');
}