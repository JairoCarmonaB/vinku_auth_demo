import { Module, DynamicModule } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ConfigurableModuleClass } from "./config.module-definition";
import { AuthProviderModule } from "./providers/provider.module";

@Module({
    imports: [AuthProviderModule],
    providers: [AuthService],
    exports: [AuthService],
})
export class AuthModule extends ConfigurableModuleClass {}
