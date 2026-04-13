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
      "In a poster presentation, participants explain a topic in a visual format using charts and images. Creativity and clarity are the main focus. It is a great opportunity to improve communication skills.",
    date: "April 17, 2026",
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
      "In a paper presentation, students present a research-based topic using slides. Technical knowledge and clear explanation are very important. It helps enhance presentation and academic skills.",
    date: "April 17, 2026",
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
      "In a hackathon, teams work together to develop solutions for real-world problems within a limited time. Coding and innovation play a key role. It improves teamwork and problem-solving skills.",
    date: "April 17, 2026",
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
      "In a technical quiz, participants are tested on technology-related questions. Speed and accuracy are important across different rounds. It makes learning fun and competitive.",
    date: "April 17, 2026",
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
      "In speed typing, participants must type fast with high accuracy. The main goal is to complete the given text within a time limit. It helps improve typing speed and efficiency.",
    date: "April 17, 2026",
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
      "In a web expo, participants design and present websites creatively. UI/UX and functionality are evaluated. It is a great platform to showcase web development skills.",
    date: "April 17, 2026",
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
      "In a group discussion, participants share and discuss ideas on a given topic. Communication and confidence are very important. It helps develop leadership and thinking skills.",
    date: "April 17, 2026",
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