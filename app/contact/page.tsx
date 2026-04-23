import type { Metadata } from "next";
import ContactClientPage from "./ContactClientPage";

export const metadata: Metadata = {
  title: "Contact | Talk to a Human",
  description:
    "Talk to a real human. Book a session, discuss a project, or ask a question. We reply personally within 24 hours.",
  openGraph: {
    images: [{ url: "/og/contact.jpg" }],
  },
};

export default function ContactPage() {
  return <ContactClientPage />;
}
