// Practice-area service data.
// Edit this list to add/remove/update services — the Services section renders
// one <flow-service-card> per entry automatically.
//
// Shape: { id, title, summary, description, features: string[] }
// `id` MUST start with "service-" and be unique. It is reflected onto the card
// host element so attorney specialty tags can deep-link/scroll to it.

export const services = [
  {
    id: "service-estate-plans",
    title: "Estate Planning",
    summary: "Wills, trusts, and comprehensive tax strategies",
    description:
      "Create a plan that protects your family, preserves your assets, and reflects your wishes. We help individuals and families develop wills, trusts, powers of attorney, tax-conscious planning, and succession strategies designed to provide clarity and peace of mind.",
    features: [
      "Wills, Trusts, and Powers of Attorney",
      "Trust Formation and Maintenance",
      "Tax Optimization Strategies",
      "Succession Planning",
    ],
  },
  {
    id: "service-litigation",
    title: "Civil Litigation",
    summary: "Court representation and dispute resolution",
    description:
      "When a dispute cannot be resolved outside of court, we provide skilled and strategic representation. We handle civil and business disputes, contract claims, judgment collection, and appeals while working to achieve the best possible outcome for our clients.",
    features: [
      "Civil Litigation",
      "Commercial Disputes",
      "Contract Breaches",
      "Appeals Process",
    ],
  },
  {
    id: "service-personal-injury",
    title: "Personal Injury",
    summary: "Accident claims and compensation cases",
    description:
      "We advocate for individuals who have been injured due to negligence or wrongful acts. Our personal injury practice covers auto accidents, slip and fall cases, medical malpractice, and wrongful death claims. We often work on a contingency basis to ensure access to justice.",
    features: [
      "Auto and Motorcycle Accidents",
      "Slip and Fall Cases",
      "Medical Malpractice",
      "Wrongful Death Claims",
    ],
  },
  {
    id: "service-estate-settlement",
    title: "Estate Settlement",
    summary: "Probate, trust administration, and estate disputes",
    description:
      "Settling a loved one's estate can feel overwhelming. We guide personal representatives, trustees, and beneficiaries through probate and trust administration, helping ensure estates are handled with confidence, efficiency and in keeping with the decedent's wishes.",
    features: [
      "Probate Services in Oregon and Washington",
      "Trust Administration Services in Oregon and Washington",
      "Estate Tax Strategy Implementation",
      "Mediation, Dispute Resolution, and Trial Advocacy",
    ],
  },
  {
    id: "service-family-law",
    title: "Family Law",
    summary: "Divorce, separation, and family disputes",
    description:
      "Family law issues can be emotionally and financially challenging. We provide practical guidance and effective representation in divorce, separation, post-separation estate planning, and other family-related legal matters.",
    features: [
      "Divorce and Separation",
      "Domestic Relations",
      "Enforcement of Judgments",
      "Post Dissolution Estate Planning",
    ],
  },
  {
    id: "service-elder-law",
    title: "Elder Law",
    summary: "Senior care planning and elder rights protection",
    description:
      "We help older adults and their families navigate legal issues related to aging, healthcare, long-term care, and asset protection. Our goal is to provide solutions that support independence, dignity, and peace of mind.",
    features: [
      "Long-term Care Planning",
      "Medicare and Medicaid Guidance",
      "Elder Abuse Protection",
      "Age Discrimination Claims",
    ],
  },
  {
    id: "service-conservatorships",
    title: "Conservatorships",
    summary: "Care and protection for financially vulnerable individuals",
    description:
      "When adults become unable to manage their own affairs, conservatorships provide essential protection. We guide families through the legal process of establishing conservatorships and ensure the ongoing protection of vulnerable adults' rights and interests.",
    features: [
      "Conservatorship for Minors and Adults",
      "Court Proceedings",
      "Asset Preservation",
      "Compliance and Reporting",
    ],
  },
  {
    id: "service-guardianships",
    title: "Guardianships",
    summary: "Care and protection for personally vulnerable individuals",
    description:
      "We assist families seeking guardianships for minors or adults who are unable to care for themselves. From the initial court process through ongoing responsibilities, we provide guidance to help ensure the vulnerable person's safety, well-being, and best interests.",
    features: [
      "Guardianship for Minors and Adults",
      "Court Proceedings",
      "Dependent Adult Protection",
      "Compliance and Reporting",
    ],
  },
  {
    id: "service-real-estate-business",
    title: "Real Estate & Business",
    summary: "Property transactions and real estate matters",
    description:
      "Whether you are buying, selling, leasing, or developing property, we provide practical legal guidance at every stage. We help clients navigate transactions, title concerns, entity formation, and real estate disputes with confidence.",
    features: [
      "Residential and Commercial Sales",
      "Lease Agreements",
      "Real Estate Disputes",
      "Business Entity Formation",
    ],
  },
];

export default services;
