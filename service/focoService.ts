const BASE_URL = "http://localhost:3000"; // URL del servidor

export const encenderFoco = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/encender`);
    if (response.ok) {
      const message = await response.text();
      return message;
    } else {
      throw new Error("Error al encender el foco.");
    }
  } catch (error) {
    console.error("[ERROR] Error al encender el foco:", error);
    throw error;
  }
};

export const apagarFoco = async (): Promise<string> => {
  try {
    const response = await fetch(`${BASE_URL}/apagar`);
    if (response.ok) {
      const message = await response.text();
      return message;
    } else {
      throw new Error("Error al apagar el foco.");
    }
  } catch (error) {
    console.error("[ERROR] Error al apagar el foco:", error);
    throw error;
  }
};
