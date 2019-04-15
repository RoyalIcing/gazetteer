import React from "react";

export type RegistryTemplateOptions = { framework: "react"; name: string, component: React.ComponentType };

const templateRegistry = new Map<string, RegistryTemplateOptions>();

export function registerTemplate(options: RegistryTemplateOptions) {
  if (options.framework === "react") {
    templateRegistry.set(options.name, options);
  }
}

export function findTemplate(name: string): RegistryTemplateOptions | undefined {
  return templateRegistry.get(name);
}
