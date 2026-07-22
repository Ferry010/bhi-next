import { permanentRedirect } from "next/navigation";

// AI literacy is an external AIGA product, surfaced on the Learning page.
export default function AILiteracyCertificateRedirect() {
  permanentRedirect("/learning");
}
