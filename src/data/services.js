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
    id: "service-elder-law",
    title: "Elder Law",
    summary: "Senior care planning and elder rights protection",
    description:
      "Our elder law practice focuses on the unique legal needs of seniors and their families. We assist with long-term care planning, Medicare and Medicaid guidance, age discrimination issues, and protecting seniors from financial exploitation.",
    features: [
      "Long-term Care Planning",
      "Medicare & Medicaid Guidance",
      "Elder Abuse Protection",
      "Age Discrimination Cases",
    ],
  },
  {
    id: "service-business-law",
    title: "Business Law",
    summary: "Commercial transactions and business operations",
    description:
      "Support your business operations with our comprehensive business law services. We handle commercial transactions, employment law, intellectual property protection, and business disputes to help your company thrive in competitive markets.",
    features: [
      "Commercial Transactions",
      "Employment Law",
      "Intellectual Property",
      "Business Disputes",
    ],
  },
  {
    id: "service-real-estate",
    title: "Real Estate",
    summary: "Property transactions and real estate law",
    description:
      "Navigate complex real estate transactions with confidence. Our real estate practice covers residential and commercial property sales, lease agreements, title issues, zoning matters, and real estate development projects.",
    features: [
      "Residential & Commercial Sales",
      "Lease Agreements",
      "Title & Zoning Issues",
      "Property Development",
    ],
  },
  {
    id: "service-conservatorships",
    title: "Conservatorships",
    summary: "Legal guardianship for incapacitated adults",
    description:
      "When adults become unable to manage their own affairs, conservatorships provide essential protection. We guide families through the legal process of establishing conservatorships and ensure the ongoing protection of vulnerable adults' rights and interests.",
    features: [
      "Conservatorship Establishment",
      "Court Representation",
      "Asset Protection",
      "Ongoing Compliance",
    ],
  },
  {
    id: "service-guardianships",
    title: "Guardianships",
    summary: "Legal protection for minors and dependents",
    description:
      "Protect minors and dependent adults through proper guardianship arrangements. We assist with guardianship appointments, court proceedings, and ongoing responsibilities to ensure the safety and well-being of those who cannot care for themselves.",
    features: [
      "Minor Guardianship",
      "Dependent Adult Protection",
      "Court Proceedings",
      "Guardian Responsibilities",
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
  {
    id: "service-collections",
    title: "Collections",
    summary: "Debt recovery and collection services",
    description:
      "Recover outstanding debts efficiently and legally through our collections practice. We represent creditors in debt recovery efforts, judgment enforcement, asset recovery, and bankruptcy proceedings while ensuring compliance with consumer protection laws.",
    features: [
      "Debt Recovery",
      "Judgment Enforcement",
      "Asset Recovery",
      "Bankruptcy Proceedings",
    ],
  },
];

export default services;
