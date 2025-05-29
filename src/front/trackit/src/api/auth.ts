export async function getMe(token: string) {
    const response = await fetch("http://localhost:3000/usuarios/me", {
        headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) return null;
    return response.json();
}
