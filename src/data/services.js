// Practice-area service data.
// Edit this list to add/remove/update services — the Services section renders
// one <flow-service-card> per entry automatically.
//
// Shape: { id, title, summary, description, features: string[] }
// `id` MUST start with "service-" and be unique. It is reflected onto the card
// host element so attorney specialty tags can deep-link/scroll to it.

export const services = [
  {
    id: "service-personal-injury",
    title: "Personal Injury",
    summary: "Accident claims and compensation cases",
    description:
      "We advocate for individuals who have been injured due to negligence or wrongful acts. Our personal injury practice covers auto accidents, slip and fall cases, medical malpractice, and wrongful death claims. We work on a contingency basis to ensure access to justice.",
    features: [
      "Auto & Motorcycle Accidents",
      "Slip & Fall Cases",
      "Medical Malpractice",
      "Wrongful Death Claims",
    ],
  },
  {
    id: "service-family-law",
    title: "Family Law",
    summary: "Divorce, custody, and family legal matters",
    description:
      "Our family law attorneys handle sensitive family matters with compassion and expertise. We provide guidance through divorce proceedings, child custody arrangements, adoption processes, and domestic relations issues while prioritizing the best interests of all family members.",
    features: [
      "Divorce & Separation",
      "Child Custody & Support",
      "Adoption Services",
      "Domestic Relations",
    ],
  },
  {
    id: "service-estate-plans",
    title: "Estate Plans",
    summary: "Wills, trusts, and comprehensive tax strategies",
    description:
      "Protect your legacy and minimize tax burdens with our comprehensive estate planning services. We create customized strategies including wills, trusts, tax planning, and succession planning to ensure your assets are distributed according to your wishes.",
    features: [
      "Wills & Testament Drafting",
      "Trust Creation & Management",
      "Tax Optimization Strategies",
      "Succession Planning",
    ],
  },
  {
    id: "service-estate-settlement",
    title: "Estate Settlement",
    summary:
      "Probate and Trust Administration, Beneficiary Advocacy, and Dispute Resolution",
    description:
      "Honor your loved one's legacy and minimize the frustration of navigating complex legal proceedings with our comprehensive estate settlement services. We provide you with a proven and effective roadmap for administering a loved one's estate with attentive guidance and support. If a dispute arises, our attorneys are here to help you reach a resolution that honors your loved one's wishes.",
    features: [
      "Probate Services in Oregon and Washington",
      "Trust Administration",
      "Estate Tax Strategy Implementation",
      "Mediation, Dispute Resolution, and Trial Advocacy",
    ],
  },
  {
    id: "service-elder-care-planning",
    title: "Elder Care Planning",
    summary: "Elder law, conservatorships, and guardianship planning",
    description:
      "Our elder care planning practice combines elder law, conservatorships, and guardianships to protect vulnerable adults and families. We help clients plan for long-term care, establish legal protections, and navigate court processes with practical guidance and compassion.",
    features: [
      "Long-term Care Planning",
      "Conservatorship Establishment",
      "Guardianship Appointments",
      "Court Representation and Compliance",
    ],
  },
  {
    id: "service-real-estate-business",
    title: "Real Estate | Business",
    summary: "Property and business counsel for transactions and disputes",
    description:
      "Our integrated real estate and business practice supports clients through property transactions, contracts, operations, and disputes. We provide coordinated counsel across residential and commercial matters so you can move forward with confidence.",
    features: [
      "Residential and Commercial Transactions",
      "Contract Drafting and Negotiation",
      "Business Operations and Compliance",
      "Property and Commercial Dispute Support",
    ],
  },
  {
    id: "service-litigation",
    title: "Litigation",
    summary: "Court representation and dispute resolution",
    description:
      "When disputes cannot be resolved through negotiation, our experienced litigators provide aggressive representation in court. We handle civil litigation, commercial disputes, contract breaches, and appeal processes with strategic precision.",
    features: [
      "Civil Litigation",
      "Commercial Disputes",
      "Contract Breaches",
      "Appeals Process",
    ],
  },
];

export default services;
