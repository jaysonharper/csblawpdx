// Attorney profiles.
// Edit this list to add/remove/update attorneys — the Attorneys section renders
// one <flow-attorney-card> per entry automatically.
//
// Shape: { name, email, image, imageAlt, imageClass, specialties[], education[],
//          memberships[], admissions[], biography }

export const attorneys = [
  {
    name: "Brett S. Carson",
    email: "",
    image: "./images/brettcarson.jpg",
    imageAlt: "Brett S. Carson Profile",
    imageClass: "brett",
    specialties: [
      "Estate Plans",
      "Real Estate",
      "Business Law",
      "Elder Law",
      "Conservatorships",
      "Guardianships",
      "Personal Injury",
    ],
    education: [
      "B.S., Colorado College and University of Oregon (1976)",
      "J.D., cum laude, Gonzaga University (1979)",
    ],
    memberships: [
      "Multnomah County Bar Association",
      "Oregon State Bar",
      "Realtors Joint Committee (1991-1993): Real Estate, Land Use, Business, Corporate and Debtor-Creditor Sections",
    ],
    admissions: ["Oregon and U.S. District Court, District of Oregon (1979)"],
    biography:
      "Director, Oregon State Council for Senior Citizens, 1989-1999. Multnomah Bar Association Senior Law Project Volunteer of the Year, 1986 & 2004; NE Family YMCA Board of Directors, 1986-1989; Hollywood Booster Board of Directors, 1986-2000; Hollywood Booster President, 1988; Hollywood Senior Center Board of Directors, 1986-2002; President, Hollywood Senior Center, 1993-1995; Lincoln High School Freshman Basketball coach, 1998-2003; Benson High School Assistant Varsity Basketball coach, 2003-present.",
  },
  {
    name: "Randall H. Baker",
    email: "",
    image: "./images/randallbaker.jpg",
    imageAlt: "Randall H. Baker Profile",
    imageClass: "randall",
    specialties: [
      "Litigation",
      "Collections",
      "Business Law",
      "Family Law",
      "Real Estate",
      "Personal Injury",
    ],
    education: [
      "University of Oregon Law School, Eugene, Oregon J.D.; Managing Board Editor, Oregon Law Review (1990)",
      "Lewis and Clark College, Portland, Oregon B.A. Economics; Four-Year Varsity Soccer (1981)",
    ],
    memberships: [
      "Oregon State Bar",
      "Washington State Bar",
      "Multnomah County Bar Association",
      "Oregon Trial Lawyers Association",
    ],
    admissions: [
      "Oregon",
      "Washington",
      "U.S. District Court, District of Oregon",
    ],
    biography:
      "Managing Board Editor, University of Oregon Law Review (1989-1990).",
  },
  {
    name: "Jakob Seegmuller",
    email: "",
    image: "./images/jakobseegmuller.jpeg",
    imageAlt: "Jakob Seegmuller Profile",
    imageClass: "jakob",
    specialties: [
      "Estate Plans",
      "Estate Settlement",
      "Conservatorships",
      "Real Estate",
    ],
    education: [
      "Southern Oregon University B.A. Cum Laude",
      "Seattle University School of Law J.D.",
    ],
    memberships: ["Multnomah Bar Association", "Clark County Bar Association"],
    admissions: [
      "Oregon State Bar Association",
      "Washington State Bar Association",
    ],
    biography:
      "Jakob Seegmuller helps individuals and families plan for the future and navigate the loss of a loved one through thoughtful estate planning and administration. He began his legal career in Vancouver, Washington, focusing on probate and estate settlement before expanding his practice to include estate planning. Today, he serves clients throughout Oregon and Washington from his hometown of Portland. The most rewarding part of Jakob's practice is helping families move through difficult transitions with clarity and confidence rather than confusion and frustration. He believes estate settlement and planning is ultimately about people, values, and the stories that connect generations. Outside the office, Jakob and his wife, Alexandra, enjoy traveling to destinations near and far, from Italy to Vietnam to Peru. Whenever he's near the water, he's likely searching for a local SCUBA shop and the next dive opportunity. At home, he enjoys gathering with friends for Dungeons & Dragons or settling in for an episode—or two—of Star Trek. His love of storytelling serves him well in helping clients shape estate plans that reflect their unique family histories, goals, and legacies.",
  },
];

export default attorneys;
