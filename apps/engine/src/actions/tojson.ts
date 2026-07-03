export default function convertToJson(payload: string[]) {
  const result: any = {};

  for (let i = 0; i < payload.length; i += 2) {
    const key = payload[i] as string;
    const rawValue = payload[i + 1] as string;
    try {
      result[key] = JSON.parse(rawValue);
    } catch {
      result[key] = rawValue;
    }
  }
  return result;
}
