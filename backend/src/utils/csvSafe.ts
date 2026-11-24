/**
 * Prevent CSV formula injection (OWASP CSV Injection / Formula Injection prevention)
 * Characters like =, +, -, @, \t, \r at the beginning of a cell can be executed by Excel/LibreOffice.
 */
export function sanitizeCsvField(field: string): string {
  if (!field) return '';
  const trimmed = field.trim();
  const dangerousPrefixes = ['=', '+', '-', '@', '\t', '\r'];
  
  if (dangerousPrefixes.some(prefix => trimmed.startsWith(prefix))) {
    // Prefix with single quote to force spreadsheet programs to treat it as raw text
    return "'" + trimmed;
  }
  return trimmed;
}

/**
 * Remove dangerous quote prefix if previously added for CSV display
 */
export function unescapeCsvField(field: string): string {
  if (field.startsWith("'")) {
    return field.substring(1);
  }
  return field;
}
