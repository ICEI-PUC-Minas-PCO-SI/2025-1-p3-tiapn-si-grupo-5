import { API_BASE_URL } from "@/api/config";
import { authHeaders } from "@/contexts/helperCookies";

export interface UploadResponse {
    url: string;
}

export async function uploadFile(file: File, signal?: AbortSignal, onProgress?: (percent: number) => void): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${API_BASE_URL}/upload`);
        Object.entries(authHeaders()).forEach(([key, value]) => {
            xhr.setRequestHeader(key, value as string);
        });
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
