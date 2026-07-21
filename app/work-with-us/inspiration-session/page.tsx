import { permanentRedirect } from "next/navigation";

// The Inspiration Session lives under Learning now. This former "Step 01"
// duplicate permanently redirects there to keep the offer clear.
export default function WorkWithUsInspirationSessionRedirect() {
  permanentRedirect("/learning/inspiration-session");
}
