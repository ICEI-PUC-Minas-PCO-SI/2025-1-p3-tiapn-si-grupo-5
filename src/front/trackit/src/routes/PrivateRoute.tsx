import { Navigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { DefaultSpinner } from "@/components/ui/spinner";

export function PrivateRoute({ allowedTypes, children }: { allowedTypes: number[]; children: React.ReactNode }) {
    const { user, loading } = useUser();

    if (loading) {
        <DefaultSpinner />
        return null;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (!allowedTypes.includes(user.tipo ?? 0)) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
}