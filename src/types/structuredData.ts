/**
 * Sanity-driven controls for JSON-LD structured data.
 * When undefined, builders preserve existing behavior (no toggles, no removals).
 */
export interface StructuredDataSettings {
  enableFaq?: boolean;
  enableReviews?: boolean;
  disableItemReviewed?: boolean;
  removeFields?: string[];
}
