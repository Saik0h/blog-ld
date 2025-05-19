import { NgModule } from "@angular/core";
import { AuthShellRoutingModule } from "./auth-shell-routing.module";

@NgModule({
    imports: [AuthShellRoutingModule],
})
export class AuthShellModule {
    // Este módulo é responsável por carregar os componentes de autenticação
    // e suas rotas. Ele não contém lógica adicional, mas pode ser expandido
    // no futuro para incluir serviços ou outros módulos relacionados à autenticação.
}