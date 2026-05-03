const BASE32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

export function generateSecret(length = 16): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, byte => BASE32[byte % 32]).join("");
}

export function currentCode(secret: string, time = Date.now()): string {
  const window = Math.floor(time / 30000);
  let hash = 0;
  const combined = secret + window;

  for (let index = 0; index < combined.length; index++) {
    hash = ((hash << 5) - hash) + combined.charCodeAt(index);
    hash |= 0;
  }

  const code = Math.abs(hash) % 1000000;
  return code.toString().padStart(6, "0");
}

export function verifyCode(secret: string, code: string): boolean {
  const now = Date.now();

  return [now, now - 30000, now + 30000].some(time =>
    currentCode(secret, time) === code
  );
}

export function otpAuthUrl(
  secret: string,
  account: string,
  issuer = "NordVault Global Capital"
): string {
  return `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(account)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`;
}

export function generateBackupCodes(count = 10): string[] {
  const codes: string[] = [];

  for (let index = 0; index < count; index++) {
    const bytes = new Uint8Array(5);
    crypto.getRandomValues(bytes);

    const code = Array.from(bytes, byte =>
      byte.toString(36).padStart(2, "0")
    ).join("").toUpperCase().slice(0, 10);

    codes.push(`${code.slice(0, 5)}-${code.slice(5)}`);
  }

  return codes;
          }
