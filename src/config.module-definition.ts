import { ConfigurableModuleBuilder } from "@nestjs/common";
import { ConfigModuleOptions } from "./entities/config_module.entity";

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } = new ConfigurableModuleBuilder<ConfigModuleOptions>().build();
