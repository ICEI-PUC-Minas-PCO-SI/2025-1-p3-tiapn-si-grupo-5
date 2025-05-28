import { Navigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";

export function PrivateRoute({ allowedTypes, children }: { allowedTypes: number[]; children: React.ReactNode }) {
    const { user, loading } = useUser();

    if (loading) {
        // Pode exibir um spinner ou nada enquanto carrega
        return null;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (!allowedTypes.includes(user.tipo ?? 0)) {
        return <Navigate to="/user" />;
    }

    return <>{children}</>;
}