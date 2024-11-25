import { BACKEND_DOMAIN } from "@/constants/.backend-dir";

export const fetchLightIntensity = async (user_id?: number) => {
    const response = await fetch(`http://${BACKEND_DOMAIN}/light-intensity?user_id=${user_id}`);
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

export const fetchEnvironmentalData = async (user_id = 1) => {
    const response = await fetch(`http://${BACKEND_DOMAIN}/api/environmental-data/last/${user_id}`);
    if (!response.ok) throw new Error("Error fetching environmental data");
    return await response.json();
};

export const login = async (email: string, password: string) => {
    const response = await fetch(`http://${BACKEND_DOMAIN}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error("Invalid email or password");
    }

    return await response.json();
};