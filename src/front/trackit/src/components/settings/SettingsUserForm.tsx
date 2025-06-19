import { useUser } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { updateProfileUser } from "@/api/users";
import { uploadProfilePhoto } from "@/api/upload";

export function SettingsUserForm({
    onFeedback,
    profilePhotoFile,
    onProfilePhotoUploaded,
    setPreviewUrl,
}: {
    onFeedback: (type: "success" | "error", message: string) => void;
    profilePhotoFile: File | null;
    onProfilePhotoUploaded: () => void;
    setPreviewUrl: (url: string | null) => void;
}) {
    const { user, setUser } = useUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formValues, setFormValues] = useState({
        nome: user?.nome || "",
        email: user?.email || "",
        ramal: user?.ramal || "",
    });
    const [isChanged, setIsChanged] = useState(false);

    // Atualiza formValues quando user muda (ex: ao logar)
    useEffect(() => {
        setFormValues({
            nome: user?.nome || "",
            email: user?.email || "",
            ramal: user?.ramal || "",
        });
    }, [user]);

    // Detecta mudanças nos campos do formulário ou na foto de perfil
    useEffect(() => {
        if (!user) return;
        const changed =
            formValues.nome !== user.nome ||
            formValues.email !== user.email ||
            formValues.ramal !== (user.ramal || "") ||
            !!profilePhotoFile;
        setIsChanged(changed);
    }, [formValues, user, profilePhotoFile]);

    // Handlers para campos controlados
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            let fotoPerfilUrl = user?.fotoPerfil ?? null;
            let skipUserContextPhotoUpdate = false;

            // Se o usuário selecionou uma nova foto, faz o upload antes de atualizar o perfil
            if (profilePhotoFile && user) {
                const result = await uploadProfilePhoto(user.id, profilePhotoFile);
                fotoPerfilUrl = result.fotoPerfil;
                // NÃO atualize o contexto do usuário com a nova foto para manter o preview até o usuário navegar
                skipUserContextPhotoUpdate = true;
                onProfilePhotoUploaded();
                setPreviewUrl(null);
            }

            // Atualiza os dados do perfil (nome, email, ramal)
            const response = await updateProfileUser(user!.id, {
                nome: formValues.nome,
                email: formValues.email,
                ramal: formValues.ramal,
            });

            if (!response.ok) {
                const errorData = await response.json();
                onFeedback("error", errorData.error || "Erro ao atualizar perfil.");
                setIsSubmitting(false);
                return;
            }

            // Atualiza o contexto do usuário com os novos dados, mas NÃO atualize fotoPerfil se skipUserContextPhotoUpdate for true
            const updated = await response.json();
            if (setUser) {
                setUser({
                    ...user!,
                    ...updated,
                    fotoPerfil: skipUserContextPhotoUpdate ? user!.fotoPerfil : fotoPerfilUrl
                });
            }

            onFeedback("success", "Perfil atualizado com sucesso!");
            setIsChanged(false);
        } catch {
            onFeedback("error", "Erro ao atualizar perfil.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="flex flex-col gap-6 max-w-xl"
            onSubmit={handleSubmit}
        >
            <div className="flex gap-4">
                <div className="flex-1">
                    <label>Nome:</label>
                    <Input
                        type="text"
                        name="nome"
                        value={formValues.nome}
                        onChange={handleChange}
                        placeholder="Nome Completo"
                        autoComplete="off"
                        inputMode="text"
                    />
                </div>
                <div className="flex-1">
                    <label>Matrícula:</label>
                    <Input
                        type="text"
                        value={user?.matricula || "Não informado"}
                        disabled
                        className="bg-slate-100 cursor-not-allowed"
                        placeholder="XXXXXXXX-Y"
                    />
                </div>
            </div>
            <div>
                <label className="block mb-1 font-medium">E-mail:</label>
                <Input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    autoComplete="off"
                    inputMode="email"
                />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label>Ramal:</label>
                    <Input
                        type="text"
                        name="ramal"
                        value={formValues.ramal}
                        onChange={handleChange}
                        placeholder="31XXXXYYYY"
                        autoComplete="off"
                        inputMode="numeric"
                    />
                </div>
                <div className="flex-1">
                    <label>Gerência:</label>
                    <Input
                        type="text"
                        value={user?.nomeGerencia || "Não informado"}
                        disabled
                        className="bg-slate-100 cursor-not-allowed"
                        placeholder="ASTIN"
                    />
                </div>
            </div>
            <div className="flex gap-4 items-center">
                <Button
                    type="button"
                    variant="outlineDisabled"
                    size="fit"
                >
                    <Shield />
                    Trocar senha
                </Button>
            </div>
            <div className="flex gap-4">
                <Button
                    type="submit"
                    className="w-40"
                    disabled={isSubmitting || !isChanged}
                >
                    Salvar
                </Button>
                <Button variant="outline"
                    size="fit"
                    type="button"
                    onClick={() => setFormValues({
                        nome: user?.nome || "",
                        email: user?.email || "",
                        ramal: user?.ramal || "",
                    })}
                >
                    Cancelar
                </Button>
            </div>
        </form>
    );
}