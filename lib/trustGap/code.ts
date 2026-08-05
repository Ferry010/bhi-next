// Short, unguessable session codes.
//
// Not sequential and not derived from anything about the team. 10 characters
// from a 32 character alphabet is about 50 bits, which is far beyond guessable
// for something with no value to an attacker beyond a set of anonymous answers.

// Crockford-style alphabet: no 0/O/1/I/L/U, so a code is safe to read aloud
// or retype from a screenshot.
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
