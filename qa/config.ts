import { readFileSync } from "fs";
import { resolve } from "path";

export interface QAConfig {
  environment: "preview" | "production";
  baseUrl: string;
  urlMode: "single" | "sitemap";
  maxUrls: number;
  oneUrl?: string;
  criticalPaths: string[];
}

interface TargetsFile {
  production: {
    baseUrl: string;
    urlMode: string;
    maxUrls: number;
    criticalPaths: string[];
  };
  preview: {
    baseUrl: string;
    urlMode: string;
    maxUrls: number;
    criticalPaths: string[];
  };
}

export function resolveConfig(): QAConfig {
  const env = (process.env.INPUT_ENVIRONMENT || "preview") as
    | "preview"
    | "production";
  const inputBaseUrl = process.env.INPUT_BASE_URL || "";
  const inputUrlMode = process.env.INPUT_URL_MODE || "";
  const inputMaxUrls = process.env.INPUT_MAX_URLS || "";
  const inputOneUrl = process.env.INPUT_ONE_URL || "";

  let targets: TargetsFile;
  try {
    const raw = readFileSync(
      resolve(process.cwd(), "qa-targets.json"),
      "utf-8"
    );
    targets = JSON.parse(raw);
  } catch {
    targets = {
      production: {
        baseUrl: "",
        urlMode: "sitemap",
        maxUrls: 20,
        criticalPaths: ["/"],
      },
      preview: {
        baseUrl: "",
        urlMode: "single",
        maxUrls: 10,
        criticalPaths: ["/"],
      },
    };
  }

  const defaults = targets[env];

  const baseUrl = inputBaseUrl || defaults.baseUrl;
  if (!baseUrl) {
    throw new Error(
      `No baseUrl resolved for environment "${env}". ` +
        `Set INPUT_BASE_URL env var or fill in qa-targets.json → ${env}.baseUrl`
    );
  }

  const urlMode = (inputUrlMode || defaults.urlMode || "single") as
    | "single"
    | "sitemap";
  const maxUrls = inputMaxUrls ? parseInt(inputMaxUrls, 10) : defaults.maxUrls;
  const oneUrl = inputOneUrl || undefined;

  return {
    environment: env,
    baseUrl: baseUrl.replace(/\/+$/, ""),
    urlMode,
    maxUrls,
    oneUrl,
    criticalPaths: defaults.criticalPaths || ["/"],
  };
}
