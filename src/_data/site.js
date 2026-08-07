module.exports = {
  name: "Signature Therapeutic Wellness",
  shortName: "Signature Wellness",
  url: "https://www.signaturetherapeuticwellness.com",
  phone: "206-384-3379",
  phoneHref: "tel:+12063843379",
  email: "sigtherapeutics@gmail.com",
  address: {
    line1: "2535 152nd Ave NE, Suite B1",
    line2: "Redmond, WA 98052",
    mapsUrl: "https://maps.google.com/?q=2535+152nd+Ave+NE+Suite+B1+Redmond+WA+98052",
  },
  bookUrl: "https://app.squareup.com/gift/ML8XEWEKAC8YP/order",
  giftCardUrl: "https://app.squareup.com/gift/ML8XEWEKAC8YP/order",
  nav: [
    { label: "Home", href: "/" },
    { label: "Gift Card", href: "https://app.squareup.com/gift/ML8XEWEKAC8YP/order", external: true },
    { label: "Insurance Accepted", href: "/insurance-accepted-massage/" },
    {
      label: "Our Services",
      href: "/services/",
      children: [
        { label: "PIP/L&I Injury Massage", href: "/pip-li-injury-massage/" },
        { label: "Insurance-Covered Massage", href: "/insurance-coveredmassage/" },
        { label: "Swedish Massage", href: "/swedish-massage/" },
        { label: "Deep Tissue Massage", href: "/deep-tissue-massage/" },
        { label: "Pain Relief Massage", href: "/pain-relief-massage/" },
        { label: "Lymphatic Detox Massage", href: "/lymphatic-detox-massage/" },
        { label: "Facial & Skin Care", href: "/facial-skincare/" },
      ],
    },
    {
      label: "Conditions We Treat",
      href: "#",
      children: [
        { label: "Neck & Shoulder Pain", href: "/neck-shoulder-pain/" },
        { label: "Back & Lower Back Pain", href: "/lower-back-pain/" },
        { label: "Hips & Legs Pain", href: "/hips-legs-pain/" },
        { label: "Manual Lymphatic Drainage", href: "/manual-lymphatic-drainage/" },
      ],
    },
    { label: "Price", href: "/price/" },
  ],
  footerLinks: [
    { label: "Privacy Policy", href: "/privacy-policy/" },
    { label: "Accessibility Statement", href: "/accessibility-statement/" },
  ],
};
