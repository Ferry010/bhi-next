// Short, unguessable session codes for the Impact Gap.
//
// Not sequential, and not derived from anything about the team or the company.
// 10 characters from a 30 character alphabet is roughly 49 bits, which is far
// beyond guessing for something whose only value to an outsider is a set of
// anonymous survey answers.

// Crockford-style alphabet: no 0/O/1/I/L/U, so a code survives being read
// aloud, retyped from a screenshot, or pasted into a chat that autocorrects.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTVWXYZ";
const LENGTH = 10;

export function generateCode(): string {
  const bytes = new Uint8Array(LENGTH);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < LENGTH; i++) {
    out += ALPHABET[bytes[i] % ALPHABET.length];
  }
  return out;
}

/** Shape check only. Says nothing about whether the code exists. */
export function isValidCodeShape(code: string): boolean {
  if (typeof code !== "string" || code.length !== LENGTH) return false;
  return code.split("").every((c) => ALPHABET.includes(c));
}
