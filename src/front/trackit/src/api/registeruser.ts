import type { RegisterUserPayload } from "../interfaces/InterfaceRegisterUser";

export async function registerNewUser(payload: RegisterUserPayload): Promise<Response> {
    return fetch("http://localhost:3000/usuarios/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
}