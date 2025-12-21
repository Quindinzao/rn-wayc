export function useBase64Image() {
  function resolveBase64Image(base64?: string | null): string | null {
    if (!base64) return null;

    if (base64.startsWith('data:image')) {
      return base64;
    }

    return `data:image/jpeg;base64,${base64}`;
  }

  return {
    resolveBase64Image,
  };
}
