import { BACKEND_DOMAIN } from "@/constants/.backend-dir";

// services/apiService.ts
export const fetchLightIntensity = async (user_id?: number) => {
    console.log("hhtp: ", `http://${BACKEND_DOMAIN}/light-intensity?user_id=${user_id}`)
    const response = await fetch(`http://${BACKEND_DOMAIN}/light-intensity?user_id=${user_id}`);
    console.log("que hace TT: ", response);
    if (!response.ok) throw new Error("Error fetching light intensity");
    return await response.json();
};

export const fetchEnergyConsumption = async (user_id?: number) => {
    const response = await fetch(`http://${BACKEND_DOMAIN}/energy-consumption?user_id=${user_id}`);
    if (!response.ok) throw new Error("Error fetching energy consumption");
    return await response.json();
};

export const fetchAverageLightIntensity = async (user_id?: number) => {
    const response = await fetch(`http://${BACKEND_DOMAIN}/average-light-intensity?user_id=${user_id}`);
    if (!response.ok) throw new Error("Error fetching average light intensity");
    return await response.json();
};

export const fetchEnergyConsumptionError = async (user_id?: number) => {
    const response = await fetch(`http://${BACKEND_DOMAIN}/energy-consumption-error?user_id=${user_id}`);
    if (!response.ok) throw new Error("Error fetching energy consumption error");
    return await response.json();
};
