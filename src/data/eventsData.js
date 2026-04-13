import img1 from "../assets/images/events/event1.jpg";
import img2 from "../assets/images/events/event2.jpg";
import img3 from "../assets/images/events/event3.jpg";
import img4 from "../assets/images/events/event4.jpg";
import img5 from "../assets/images/events/event5.jpg";
import img6 from "../assets/images/events/event6.jpg";
import img7 from "../assets/images/events/event7.jpg";

const events = [
  {
    id: "poster",
    title: "Poster Presentation",
    desc: "Showcase your ideas through creative posters.",
    details:
      "Poster presentation lo participants oka topic ni visual format lo explain chestaru using charts and images. Creativity mariyu clarity main focus ga untayi. Idi communication skills ni improve cheyadaniki manchi avakasam.",
    date: "April 16, 2026",
    location: "Room no:102",
    image: img1,

    rules: [
      "Team size: 1 to 3 members",
      "Abstract submission is mandatory before the event",
      "Abstract must include topic, objective, and key idea",
      "Poster must be neat, creative, and informative",
      "Content should be relevant to the theme",
      "Use proper headings, visuals, and minimal text",
      "Follow given size and format instructions",
      "Maximum 5 minutes presentation time",
      "All members are encouraged to participate",
      "Clear communication and time management are important",
      "Judging based on innovation, clarity, design, and confidence",
      "No plagiarism allowed",
      "Judges decision is final",
      "Participation certificates will be provided",
    ],

    coordinators: [
      { name: "K. Madhu Sai", phone: "9553684041" },
      { name: "C. Sravani", phone: "6304144794" },
    ],
  },

  {
    id: "paper",
    title: "Paper Presentation",
    desc: "Present innovative technical ideas.",
    details:
      "Paper presentation lo students research-based topic ni slides dwara present chestaru. Technical knowledge mariyu explanation clarity chala important. Idi presentation mariyu academic skills ni enhance chestundi.",
    date: "April 16, 2026",
    location: "Room no:102",
    image: img2,

    rules: [
      "Team size: Minimum 1, Maximum 3 members",
      "Maximum number of slides: 12",
      "Presentation time: 5–8 minutes",
      "Question & Answer: 2–3 minutes",
      "Judging based on content, technical knowledge, presentation, creativity",
      "Report 30 minutes before event",
      "Judges decision is final",
    ],

    coordinators: [
      { name: "M Harinivas", phone: "6302867559" },
      { name: "Y Hemalatha", phone: "9392388850" },
    ],
  },

  {
    id: "hackathon",
    title: "Hackathon",
    desc: "Build real-world projects.",
    details:
      "Hackathon lo teams kalisi real-world problems ki solutions develop chestaru within limited time. Coding mariyu innovation key role play chestayi.",
    date: "April 16, 2026",
    location: "Lab",
    image: img3,

    rules: [
      "Team size: Min 3 - Max 4",
      "Each team must have at least one girl",
      "Teams can be formed across years & branches",
      "2-phase hackathon (idea + prototype)",
      "Participation certificate for all",
    ],

    coordinators: [
      { name: "C. Theja", phone: "9390009700" },
      { name: "T. Yamuna", phone: "6281946482" },
    ],
  },

  {
    id: "quiz",
    title: "Technical Quiz",
    desc: "Test your knowledge.",
    details:
      "Technical quiz lo technology related questions dwara knowledge ni test chestaru. Speed mariyu accuracy important.",
    date: "April 16, 2026",
    location: "Seminar Hall",
    image: img4,

    rules: [
      "Each team can have 2 members",
      "No use of mobile phones or internet",
      "Teams must answer within the given time limit",
      "Quizmasters decision is final",
      "No shouting answers unless its a rapid-fire round",
      "Points will be updated after each round",
    ],

    coordinators: [
      { name: "Pallavi", phone: "7981398883" },
      { name: "Vamsi", phone: "8121173597" },
    ],
  },

  {
    id: "speed-typo",
    title: "Speed Typo",
    desc: "Test typing speed.",
    details:
      "Speed typo lo participants fast ga typing cheyyali with high accuracy. Typing efficiency improve avutundi.",
    date: "April 16, 2026",
    location: "New Computer Lab",
    image: img5,

    rules: [
      "Report on time",
      "System will be provided",
      "Fixed time typing test",
      "Type exactly as displayed",
      "No copy paste",
    ],

    coordinators: [
      { name: "M. Chakri", phone: "9381171286" },
      { name: "Ashwini", phone: "7989196507" },
    ],
  },

  {
    id: "webexpo",
    title: "Web Expo",
    desc: "Showcase web projects.",
    details:
      "Webexpo lo participants websites design chesi present chestaru. UI/UX mariyu functionality evaluate chestaru.",
    date: "April 16, 2026",
    location: "Old Computer Lab",
    image: img6,

    rules: [
      "Individual or team (1-3 members)",
      "Bring your own laptop",
      "Internet restricted",
      "No malpractice",
      "Judges decision final",
    ],

    coordinators: [
      { name: "M. Susmitha", phone: "9032632733" },
      { name: "Saketh", phone: "8309880592" },
    ],
  },

  {
    id: "gd",
    title: "Group Discussion",
    desc: "Group discussion.",
    details:
      "Group discussion lo participants oka topic mida ideas share chestaru. Communication mariyu confidence important.",
    date: "April 16, 2026",
    location: "Conference Hal",
    image: img7,

    rules: [
      "Team size: 4–5 members",
      "No changes after registration",
      "Topic given on spot",
      "10–15 minutes discussion",
    ],

    coordinators: [
      { name: "K. Pradeep", phone: "7385514993" },
      { name: "M. Sumera", phone: "8341199150" },
    ],
  },
];

export default events;