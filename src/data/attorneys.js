// Attorney profiles.
// Edit this list to add/remove/update attorneys — the Attorneys section renders
// one <flow-attorney-card> per entry automatically.
//
// Shape: { name, email, image, imageAlt, imageClass, specialties[], education[],
//          memberships[], admissions[], biography[] }

export const attorneys = [
  {
    name: "Brett S. Carson",
    email: "",
    image: "./images/brettcarson.jpg",
    imageAlt: "Brett S. Carson Profile",
    imageClass: "brett",
    specialties: [
      "Estate Planning",
      "Personal Injury",
      "Elder Law",
      "Conservatorships",
      "Guardianships",
      "Real Estate & Business",
    ],
    education: [
      "B.S., Colorado College and University of Oregon",
      "J.D., Gonzaga University, cum laude",
    ],
    memberships: [
      "Oregon State Bar",
      "Multnomah Bar Association",
      "Estate Planning and Administration Section",
    ],
    admissions: ["Oregon", "U.S. District Court, District of Oregon"],
    biography: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    name: "Randall H. Baker",
    email: "",
    image: "./images/randallbaker.jpg",
    imageAlt: "Randall H. Baker Profile",
    imageClass: "randall",
    specialties: [
      "Estate Planning",
      "Civil Litigation",
      "Personal Injury",
      "Estate Settlement",
      "Family Law",
      "Real Estate & Business",
    ],
    education: [
      "B.A., Economics, Lewis and Clark College, Four-Year Varsity Soccer",
      "J.D., University of Oregon School of Law, Managing Board Editor, Oregon Law Review",
    ],
    memberships: [
      "Oregon State Bar",
      "Washington State Bar Association",
      "Multnomah Bar Association",
      "Oregon Trial Lawyers Association",
    ],
    admissions: [
      "Oregon",
      "Washington",
      "U.S. District Court, District of Oregon",
    ],
    biography: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    ],
  },
  {
    name: "Jakob O. Seegmuller",
    email: "",
    image: "./images/jakobseegmuller.jpeg",
    imageAlt: "Jakob O. Seegmuller Profile",
    imageClass: "jakob",
    specialties: [
      "Estate Planning",
      "Estate Settlement",
      "Elder Law",
      "Conservatorships",
      "Guardianships",
      "Real Estate & Business",
    ],
    education: [
      "B.A., History and Political Science, Southern Oregon University, Cum Laude",
      "J.D., Seattle University School of Law, CALI Award for Indian Trusts & Estates Clinic",
    ],
    memberships: [
      "Oregon State Bar",
      "Washington State Bar Association",
      "Multnomah Bar Association",
      "Clark County Bar Association",
      "Estate Planning and Administration Section",
    ],
    admissions: ["Oregon", "Washington"],
    biography: [
      "Jakob Seegmuller helps individuals and families plan for the future and navigate the loss of a loved one through thoughtful estate planning and administration. He began his legal career in Vancouver, Washington, focusing on probate and estate settlement before expanding his practice to include estate planning. Today, he serves clients throughout Oregon and Washington from his hometown of Portland.",
      "The most rewarding part of Jakob's practice is helping families move through difficult transitions with clarity and confidence rather than confusion and frustration. He believes estate settlement and planning is ultimately about people, values, and the stories that connect generations.",
      "Outside the office, Jakob and his wife, Alexandra, enjoy traveling to destinations near and far, from Italy to Vietnam to Peru. Whenever he's near the water, he's likely searching for a local SCUBA shop and the next dive opportunity. At home, he enjoys gathering with friends for Dungeons & Dragons or settling in for an episode—or two—of Star Trek. His love of storytelling serves him well in helping clients shape estate plans that reflect their unique family histories, goals, and legacies.",
    ],
  },
];

export default attorneys;
