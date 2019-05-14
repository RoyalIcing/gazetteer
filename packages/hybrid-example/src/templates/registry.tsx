import React from "react";
import Vue from "vue";

export type RegistryTemplateOptions =
  | { framework: "react"; name: string; component: React.ComponentType }
  | { framework: "vue"; name: string; component: Vue.VueConstructor };

const templateRegistry = new Map<string, RegistryTemplateOptions>();

export function registerTemplate(options: RegistryTemplateOptions) {
  if (options.framework === "react") {
    templateRegistry.set(options.name, options);
  } else if (options.framework === "vue") {
    templateRegistry.set(options.name, options);
  }
}

export function findTemplate(
  name: string
): RegistryTemplateOptions | undefined {
  return templateRegistry.get(name);
}
