type Primitive = string | number | boolean;
type Value = Primitive | Primitive[] | null | undefined | Record<string, any>;

export function buildQueryParams(
  obj: Record<string, Value>,
  prefix = ""
): URLSearchParams {
  const params = new URLSearchParams();

  const append = (key: string, value: any) => {
    if (value == null) return;

    // Arrays → repeated keys
    if (Array.isArray(value)) {
      value.forEach(v => {
        if (v != null) params.append(key, String(v));
      });
      return;
    }

    // Nested objects → flatten (e.g. user.name=John)
    if (typeof value === "object") {
      Object.entries(value).forEach(([k, v]) => {
        append(`${key}.${k}`, v);
      });
      return;
    }

    // Primitive
    params.append(key, String(value));
  };

  Object.entries(obj).forEach(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    append(fullKey, value);
  });

  return params;
}