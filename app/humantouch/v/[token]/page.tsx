import type { Metadata } from "next";
import HumanTouchVerifyClient from "./HumanTouchVerifyClient";

export const metadata: Metadata = {
  title: "Human Touch Verification",
  description: "Verify whether an email was sent by a human.",
  openGraph: { images: [{ url: "/og/human-touch.jpg" }] },
};

export default function HumanTouchVerifyPage({ params }: { params: { token: string } }) {
  return <HumanTouchVerifyClient token={params.token} />;
}
