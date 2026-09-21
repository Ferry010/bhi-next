// Algemene Voorwaarden (NL) + Terms & Conditions (EN) for Brand Humanizing
// Institute. DRAFT — have a lawyer review before relying on these. Business
// terms (cancellation tiers, payment) were confirmed by Ferry; the rest are
// sensible NL B2B defaults and can be tuned.
//
// One shared shape rendered by two routes: /algemene-voorwaarden (nl) and
// /terms (en), with a language switch.

type Block = { p: string } | { list: string[] };
type Article = { title: string; blocks: Block[] };

export type TermsContent = {
  lang: "nl" | "en";
  langSwitch: { href: string; label: string };
  meta: { title: string; description: string };
  breadcrumb: string;
  title: string;
  updated: string;
  intro: string;
  privacyNote: { text: string; linkLabel: string; href: string };
  articles: Article[];
};

const COMPANY = "Brand Humanizing Institute";
const KVK = "67341950";
const BTW = "NL001559743B32";

export const termsNl: TermsContent = {
  lang: "nl",
  langSwitch: { href: "/terms", label: "English" },
  meta: {
    title: "Algemene Voorwaarden | Brand Humanizing Institute",
    description: "De algemene voorwaarden van Brand Humanizing Institute voor keynotes, trainingen, teamdagen en trajecten.",
  },
  breadcrumb: "Algemene Voorwaarden",
  title: "Algemene Voorwaarden",
  updated: "Laatst bijgewerkt: september 2026",
  intro:
    `Deze algemene voorwaarden zijn van toepassing op alle diensten van ${COMPANY} (KvK ${KVK}, btw ${BTW}), gevestigd te Rotterdam. Lees ze goed door. Heb je een vraag? Mail ferry@brandhumanizing.com.`,
  privacyNote: {
    text: "Hoe we met persoonsgegevens omgaan, staat in onze",
    linkLabel: "privacyverklaring",
    href: "/privacy",
  },
  articles: [
    {
      title: "Definities",
      blocks: [
        {
          list: [
            `Opdrachtnemer: ${COMPANY}, eenmanszaak, KvK ${KVK}, btw ${BTW}, gevestigd te Rotterdam.`,
            "Opdrachtgever: de organisatie of persoon die een opdracht aan Opdrachtnemer verstrekt.",
            "Diensten: keynotes, trainingen, workshops, teamdagen (waaronder vibecoding), strategie- en adviestrajecten en onderzoek.",
            "Sessie: een geplande keynote, training, workshop of teamdag op een afgesproken datum.",
            "Overeenkomst: de afspraak tussen partijen over het leveren van diensten.",
          ],
        },
      ],
    },
    {
      title: "Toepasselijkheid",
      blocks: [
        { p: "Deze voorwaarden zijn van toepassing op alle offertes, overeenkomsten en diensten van Opdrachtnemer." },
        { p: "Afwijkingen gelden alleen als ze schriftelijk zijn overeengekomen. Algemene of inkoopvoorwaarden van Opdrachtgever worden uitdrukkelijk van de hand gewezen." },
      ],
    },
    {
      title: "Offertes en prijzen",
      blocks: [
        { p: "Offertes zijn vrijblijvend en 30 dagen geldig, tenzij anders vermeld." },
        { p: "Alle prijzen zijn in euro's en exclusief btw, tenzij anders vermeld." },
        { p: "Reis- en verblijfkosten en eventuele locatie- of cateringkosten kunnen apart in rekening worden gebracht, tenzij anders overeengekomen." },
      ],
    },
    {
      title: "Totstandkoming van de overeenkomst",
      blocks: [
        { p: "De overeenkomst komt tot stand zodra Opdrachtgever akkoord geeft op de offerte of de boeking, en Opdrachtnemer dit schriftelijk (per e-mail) bevestigt." },
        { p: "De datum is pas gereserveerd nadat Opdrachtnemer de boeking schriftelijk heeft bevestigd." },
      ],
    },
    {
      title: "Uitvoering",
      blocks: [
        { p: "Opdrachtnemer voert de opdracht naar beste inzicht en vermogen uit. Het betreft een inspanningsverplichting, geen resultaatsverplichting." },
        { p: "Opdrachtgever zorgt voor een geschikte ruimte en, bij een sessie op locatie van Opdrachtgever, voor voldoende werkende laptops en internet, tenzij anders afgesproken. Bij vibecoding-teamdagen regelt Opdrachtnemer de AI-tools, licenties en tokens." },
        { p: "Opdrachtgever zorgt voor tijdige toegang tot de locatie en de benodigde faciliteiten." },
      ],
    },
    {
      title: "Betaling",
      blocks: [
        { p: "Facturatie vindt plaats na de sessie. Betaling geschiedt binnen 30 dagen na factuurdatum." },
        { p: "Bij niet-tijdige betaling is Opdrachtgever van rechtswege in verzuim. Opdrachtnemer mag dan de wettelijke handelsrente (art. 6:119a BW) en redelijke incassokosten in rekening brengen." },
      ],
    },
    {
      title: "Annulering, no-show en verplaatsen",
      blocks: [
        { p: "Annuleren kan uitsluitend schriftelijk. Bij annulering door Opdrachtgever gelden de volgende annuleringskosten, als percentage van het overeengekomen bedrag:" },
        {
          list: [
            "meer dan 30 dagen voor de sessie: kosteloos;",
            "15 tot en met 30 dagen voor de sessie: 50%;",
            "0 tot en met 14 dagen voor de sessie: 100%.",
          ],
        },
        { p: "No-show: verschijnt het team niet, of zijn de locatie of faciliteiten op de afgesproken dag niet beschikbaar waardoor de sessie geen doorgang kan vinden, dan is 100% van het overeengekomen bedrag verschuldigd." },
        { p: "Verplaatsen: de sessie kan op verzoek eenmalig kosteloos worden verplaatst, mits het verzoek meer dan 14 dagen voor de sessie schriftelijk wordt gedaan en een nieuwe datum binnen 6 maanden wordt afgesproken. Bij een verzoek binnen 14 dagen of een tweede verplaatsing gelden de annuleringskosten." },
        { p: "Annuleert Opdrachtnemer een sessie (anders dan door overmacht), dan wordt in overleg een nieuwe datum gepland of wordt het voor die sessie reeds betaalde bedrag terugbetaald." },
      ],
    },
    {
      title: "Overmacht",
      blocks: [
        { p: "Onder overmacht wordt verstaan elke omstandigheid buiten de wil en controle van een partij die nakoming tijdelijk of blijvend verhindert. Daaronder vallen in elk geval: ziekte of uitval van de spreker of begeleider, staking, brand, uitval van nutsvoorzieningen of internet, pandemie, overheidsmaatregelen en extreme weersomstandigheden." },
        { p: "Bij overmacht worden de verplichtingen opgeschort. Partijen spannen zich in om de sessie kosteloos naar een nieuwe datum te verplaatsen." },
        { p: "Is verplaatsen redelijkerwijs niet mogelijk, dan mag de overeenkomst worden ontbonden. Reeds gemaakte kosten mogen in rekening worden gebracht; nog niet geleverde diensten worden niet in rekening gebracht of, indien al betaald, terugbetaald." },
        { p: "Overmacht geeft geen recht op schadevergoeding." },
      ],
    },
    {
      title: "Aansprakelijkheid",
      blocks: [
        { p: "De aansprakelijkheid van Opdrachtnemer is beperkt tot het bedrag dat voor de betreffende opdracht in rekening is gebracht (exclusief btw), en tot ten hoogste het bedrag dat de aansprakelijkheidsverzekering in het betreffende geval uitkeert." },
        { p: "Opdrachtnemer is niet aansprakelijk voor indirecte schade, waaronder gevolgschade, gederfde winst en gemiste besparingen." },
        { p: "Opdrachtnemer is niet aansprakelijk voor wat deelnemers tijdens een sessie met AI-tools maken, delen of publiceren. De output en het gebruik daarvan vallen onder de verantwoordelijkheid van Opdrachtgever en de deelnemers." },
      ],
    },
    {
      title: "Intellectueel eigendom",
      blocks: [
        { p: "Alle intellectuele-eigendomsrechten op door Opdrachtnemer ontwikkelde materialen (waaronder de methode, frameworks, presentaties en werkbladen) berusten bij Opdrachtnemer. Deze materialen mogen niet zonder schriftelijke toestemming worden verveelvoudigd of aan derden verstrekt." },
        { p: "Wat deelnemers tijdens een teamdag zelf bouwen, mogen zij houden en gebruiken. Opdrachtnemer verkrijgt daarop geen rechten." },
      ],
    },
    {
      title: "Beeldmateriaal",
      blocks: [
        { p: "Opdrachtnemer mag beeldmateriaal van een sessie maken en gebruiken voor promotie, tenzij Opdrachtgever dit vooraf schriftelijk uitsluit." },
      ],
    },
    {
      title: "Geheimhouding en persoonsgegevens",
      blocks: [
        { p: "Beide partijen behandelen vertrouwelijke informatie die zij van elkaar ontvangen vertrouwelijk." },
        { p: "Opdrachtnemer verwerkt persoonsgegevens conform de privacyverklaring op deze website." },
      ],
    },
    {
      title: "Klachten",
      blocks: [
        { p: "Klachten over een sessie meldt Opdrachtgever binnen 14 dagen na de sessie schriftelijk. Partijen zoeken eerst in overleg naar een oplossing." },
      ],
    },
    {
      title: "Toepasselijk recht en geschillen",
      blocks: [
        { p: "Op alle overeenkomsten en diensten is Nederlands recht van toepassing." },
        { p: "Geschillen die partijen niet in onderling overleg oplossen, worden voorgelegd aan de bevoegde rechter in het arrondissement Rotterdam." },
      ],
    },
  ],
};

export const termsEn: TermsContent = {
  lang: "en",
  langSwitch: { href: "/algemene-voorwaarden", label: "Nederlands" },
  meta: {
    title: "Terms & Conditions | Brand Humanizing Institute",
    description: "The terms and conditions of Brand Humanizing Institute for keynotes, training, team days and projects.",
  },
  breadcrumb: "Terms & Conditions",
  title: "Terms & Conditions",
  updated: "Last updated: September 2026",
  intro:
    `These terms apply to all services of ${COMPANY} (Chamber of Commerce ${KVK}, VAT ${BTW}), based in Rotterdam, the Netherlands. Please read them carefully. Questions? Email ferry@brandhumanizing.com.`,
  privacyNote: {
    text: "How we handle personal data is set out in our",
    linkLabel: "privacy policy",
    href: "/privacy",
  },
  articles: [
    {
      title: "Definitions",
      blocks: [
        {
          list: [
            `Provider: ${COMPANY}, sole trader, Chamber of Commerce ${KVK}, VAT ${BTW}, based in Rotterdam, the Netherlands.`,
            "Client: the organisation or person that engages the Provider.",
            "Services: keynotes, training, workshops, team days (including vibecoding), strategy and advisory projects, and research.",
            "Session: a scheduled keynote, training, workshop or team day on an agreed date.",
            "Agreement: the arrangement between the parties for the delivery of services.",
          ],
        },
      ],
    },
    {
      title: "Applicability",
      blocks: [
        { p: "These terms apply to all quotes, agreements and services of the Provider." },
        { p: "Deviations only apply if agreed in writing. Any general or purchasing terms of the Client are expressly rejected." },
      ],
    },
    {
      title: "Quotes and prices",
      blocks: [
        { p: "Quotes are without obligation and valid for 30 days, unless stated otherwise." },
        { p: "All prices are in euros and exclusive of VAT, unless stated otherwise." },
        { p: "Travel and accommodation costs and any venue or catering costs may be charged separately, unless agreed otherwise." },
      ],
    },
    {
      title: "Formation of the agreement",
      blocks: [
        { p: "The agreement is formed once the Client accepts the quote or booking and the Provider confirms this in writing (by email)." },
        { p: "The date is only reserved once the Provider has confirmed the booking in writing." },
      ],
    },
    {
      title: "Performance",
      blocks: [
        { p: "The Provider performs the assignment to the best of its insight and ability. This is a best-efforts obligation, not an obligation to achieve a specific result." },
        { p: "The Client provides a suitable room and, for a session at the Client's location, enough working laptops and internet, unless agreed otherwise. For vibecoding team days the Provider arranges the AI tools, licenses and tokens." },
        { p: "The Client ensures timely access to the venue and the necessary facilities." },
      ],
    },
    {
      title: "Payment",
      blocks: [
        { p: "Invoicing takes place after the session. Payment is due within 30 days of the invoice date." },
        { p: "If payment is late, the Client is in default by operation of law. The Provider may then charge the statutory commercial interest (art. 6:119a Dutch Civil Code) and reasonable collection costs." },
      ],
    },
    {
      title: "Cancellation, no-show and rescheduling",
      blocks: [
        { p: "Cancellation must be made in writing. If the Client cancels, the following cancellation fees apply, as a percentage of the agreed price:" },
        {
          list: [
            "more than 30 days before the session: free of charge;",
            "15 to 30 days before the session: 50%;",
            "0 to 14 days before the session: 100%.",
          ],
        },
        { p: "No-show: if the team does not attend, or the venue or facilities are unavailable on the agreed day so the session cannot go ahead, 100% of the agreed price is due." },
        { p: "Rescheduling: the session may be rescheduled once free of charge, provided the request is made in writing more than 14 days before the session and a new date within 6 months is agreed. For a request within 14 days or a second reschedule, the cancellation fees apply." },
        { p: "If the Provider cancels a session (other than due to force majeure), a new date is scheduled in consultation or any amount already paid for that session is refunded." },
      ],
    },
    {
      title: "Force majeure",
      blocks: [
        { p: "Force majeure means any circumstance beyond a party's will and control that temporarily or permanently prevents performance, including at least: illness or unavailability of the speaker or facilitator, strikes, fire, failure of utilities or internet, pandemic, government measures and extreme weather." },
        { p: "In the event of force majeure, obligations are suspended. The parties will make an effort to reschedule the session to a new date free of charge." },
        { p: "If rescheduling is not reasonably possible, the agreement may be terminated. Costs already incurred may be charged; services not yet delivered are not charged or, if already paid, are refunded." },
        { p: "Force majeure does not give rise to any right to compensation." },
      ],
    },
    {
      title: "Liability",
      blocks: [
        { p: "The Provider's liability is limited to the amount charged for the relevant assignment (excluding VAT), and to at most the amount paid out by the liability insurer in the relevant case." },
        { p: "The Provider is not liable for indirect damage, including consequential loss, lost profit and missed savings." },
        { p: "The Provider is not liable for what participants create, share or publish with AI tools during a session. The output and its use are the responsibility of the Client and the participants." },
      ],
    },
    {
      title: "Intellectual property",
      blocks: [
        { p: "All intellectual property rights in materials developed by the Provider (including the method, frameworks, presentations and worksheets) belong to the Provider. These materials may not be reproduced or shared with third parties without written permission." },
        { p: "Whatever participants build themselves during a team day is theirs to keep and use. The Provider acquires no rights in it." },
      ],
    },
    {
      title: "Photos and video",
      blocks: [
        { p: "The Provider may take photos or video of a session and use them for promotion, unless the Client excludes this in writing beforehand." },
      ],
    },
    {
      title: "Confidentiality and personal data",
      blocks: [
        { p: "Both parties treat confidential information they receive from each other as confidential." },
        { p: "The Provider processes personal data in accordance with the privacy policy on this website." },
      ],
    },
    {
      title: "Complaints",
      blocks: [
        { p: "The Client reports any complaint about a session in writing within 14 days of the session. The parties first seek a solution in consultation." },
      ],
    },
    {
      title: "Governing law and disputes",
      blocks: [
        { p: "Dutch law applies to all agreements and services." },
        { p: "Disputes that the parties do not resolve by mutual consultation are submitted to the competent court in the district of Rotterdam." },
      ],
    },
  ],
};
