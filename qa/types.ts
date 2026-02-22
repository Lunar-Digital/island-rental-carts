export interface Finding {
  type: "seo" | "images" | "links" | "visual";
  severity: "pass" | "warn";
  url: string;
  message: string;
  evidence: string;
}

export interface AuditSummary {
  meta: {
    timestamp: string;
    environment: string;
    baseUrl: string;
    urlMode: string;
    urlsTested: number;
    gitSha: string;
    runId: string;
    runUrl: string;
  };
  urlsTested: string[];
  totals: {
    pass: number;
    warn: number;
    byType: Record<string, { pass: number; warn: number }>;
  };
  findings: Finding[];
  topFindings: Finding[];
  screenshotPaths: string[];
}
