import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Imprint",
  description: "Legal information about Brand Humanizing Institute.",
  robots: { index: false },
};

export default function ImprintPage() {
  return (
    <>
      <Navbar />
      <main className="bg-secondary min-h-screen">
        <div className="container max-w-3xl pt-28 md:pt-40 pb-20 md:pb-32">
          <Breadcrumb items={[{ label: "Imprint" }]} />
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mt-6 mb-12">
            Imprint
          </h1>

          <div className="space-y-8 text-foreground">

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Company details</h2>
              <dl className="space-y-2 text-muted-foreground">
                <div>
                  <dt className="inline font-semibold text-foreground">Trading name: </dt>
                  <dd className="inline">Brand Humanizing Institute</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Legal form: </dt>
                  <dd className="inline">Eenmanszaak (sole trader), registered in the Netherlands</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Chamber of Commerce (KvK): </dt>
                  <dd className="inline">67341950</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">VAT (BTW): </dt>
                  <dd className="inline">NL001559743B32</dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Address: </dt>
                  <dd className="inline">Rotterdam, The Netherlands</dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Contact</h2>
              <dl className="space-y-2 text-muted-foreground">
                <div>
                  <dt className="inline font-semibold text-foreground">Ferry Hoes: </dt>
                  <dd className="inline">
                    <a href="mailto:ferry@brandhumanizing.com" className="text-accent hover:underline">
                      ferry@brandhumanizing.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Jonathan Flores: </dt>
                  <dd className="inline">
                    <a href="mailto:jonathan@brandhumanizing.com" className="text-accent hover:underline">
                      jonathan@brandhumanizing.com
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="inline font-semibold text-foreground">Website: </dt>
                  <dd className="inline">
                    <a href="https://brandhumanizing.com" className="text-accent hover:underline">
                      brandhumanizing.com
                    </a>
                  </dd>
                </div>
              </dl>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Responsible for content</h2>
              <p className="text-muted-foreground">
                Ferry Hoes, Brand Humanizing Institute, Rotterdam, The Netherlands.
              </p>
            </section>

            <section>
              <h2 className="font-heading font-bold text-xl mb-3">Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The content on this website is provided for informational purposes only. While we
                make every effort to ensure accuracy, Brand Humanizing Institute accepts no
                liability for errors or omissions. Links to external websites are not endorsements.
              </p>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
