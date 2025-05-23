import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/Register";
import { Login } from "../pages/login/Login";
import { ForgotPassword } from "../pages/reset-password/ForgotPassword";
import { DefaultLayoult } from "../layoults/DefaultLayoult";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/user" element={<DefaultLayoult />}>
                {/*
                    As páginas de usuário deverão ser renderizadas aqui
                    e o layout padrão será aplicado a elas. Pra fazer isso, quando você criar a página de usuário no diretório pages, crie uma route dentro daqui, o path deverá seguir um padrão coerente, e pra acessar você pode digitar no navegador localhost:5173:/user/ nome da sua página.
                */}
            </Route>
            <Route path="/analyst" element={<DefaultLayoult />}>
                {/*
                    As páginas de analista deverão ser renderizadas aqui
                    e o layout padrão será aplicado a elas. Pra fazer isso, quando você criar a página de analista no diretório pages, crie uma route dentro daqui, o path deverá seguir um padrão coerente, e pra acessar você pode digitar no navegador localhost:5173:/user/ nome da sua página.
                */}
            </Route>
            <Route path="/admin" element={<DefaultLayoult />}>
                {/*
                    As páginas de gestor deverão ser renderizadas aqui
                    e o layout padrão será aplicado a elas. Pra fazer isso, quando você criar a página de gestor no diretório pages, crie uma route dentro daqui, o path deverá seguir um padrão coerente, e pra acessar você pode digitar no navegador localhost:5173:/user/ nome da sua página.
                */}
            </Route>
        </Routes>
    );
}
