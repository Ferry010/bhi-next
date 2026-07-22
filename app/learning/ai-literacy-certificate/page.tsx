import { permanentRedirect } from "next/navigation";

// The AI Literacy Certificate now lives on the Certification page.
export default function AILiteracyCertificateRedirect() {
  permanentRedirect("/certification");
}
