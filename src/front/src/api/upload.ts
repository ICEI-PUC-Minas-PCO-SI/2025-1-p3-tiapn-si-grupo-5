import { API_BASE_URL } from "@/api/config";

export interface UploadResponse {
    url: string;
}

// Upload de arquivo genérico (para chat/ticket)
export async function uploadFile(
    file: File,
    signal?: AbortSignal,
    onProgress?: (percent: number) => void
): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    // Se não precisar de progresso, use fetch (mais simples)
    if (!onProgress) {
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: "POST",
            credentials: 'include',
            body: formData,
            signal,
        });
        if (!response.ok) throw new Error("Erro ao fazer upload do arquivo");
        return response.json();
    }

    // Se quiser progresso, use XMLHttpRequest
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_BASE_URL}/upload`);
        xhr.withCredentials = true;
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error("Erro ao fazer upload do arquivo"));
            }
        };
        xhr.onerror = () => reject(new Error("Erro ao fazer upload do arquivo"));
        if (signal) {
            signal.addEventListener("abort", () => {
                xhr.abort();
                reject(new Error("Upload cancelado"));
            });
        }
        xhr.send(formData);
    });
}

// Upload de foto de perfil (mantido se usado em outro lugar)
export async function uploadProfilePhoto(
    userId: number,
    file: File,
    onProgress?: (percent: number) => void
): Promise<{ fotoPerfil: string }> {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_BASE_URL}/users/${userId}/profile-photo`);
        xhr.withCredentials = true;
        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable && onProgress) {
                onProgress(Math.round((event.loaded / event.total) * 100));
            }
        };
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject(new Error("Erro ao enviar foto de perfil"));
            }
        };
        xhr.onerror = () => reject(new Error("Erro ao enviar foto de perfil"));
        xhr.send(formData);
    });
}
