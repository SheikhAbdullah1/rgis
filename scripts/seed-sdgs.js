// const mongoose = require("mongoose");
// const path = require("path");
// require("dotenv").config({
//   path: path.resolve(__dirname, "../.env"),
// });

// console.log("MONGODB_URI:", process.env.MONGODB_URI);
// const MONGODB_URI = process.env.MONGODB_URI;
// console.log (MONGODB_URI)
// const sdgs = [
//   {
//     number: 1,
//     name: "No Poverty",
//     slug: "no-poverty",
//     color: "#E5243B",
//     description:
//       "End poverty in all its forms everywhere."
//   },
//   {
//     number: 2,
//     name: "Zero Hunger",
//     slug: "zero-hunger",
//     color: "#DDA63A",
//     description:
//       "End hunger, achieve food security and improved nutrition."
//   },
//   {
//     number: 3,
//     name: "Good Health and Well-being",
//     slug: "good-health-and-well-being",
//     color: "#4C9F38",
//     description:
//       "Ensure healthy lives and promote well-being."
//   },
//   {
//     number: 4,
//     name: "Quality Education",
//     slug: "quality-education",
//     color: "#C5192D",
//     description:
//       "Ensure inclusive and equitable quality education."
//   },
//   {
//     number: 5,
//     name: "Gender Equality",
//     slug: "gender-equality",
//     color: "#FF3A21",
//     description:
//       "Achieve gender equality and empower all women and girls."
//   },
//   {
//     number: 6,
//     name: "Clean Water and Sanitation",
//     slug: "clean-water-and-sanitation",
//     color: "#26BDE2",
//     description:
//       "Ensure availability and sustainable management of water."
//   },
//   {
//     number: 7,
//     name: "Affordable and Clean Energy",
//     slug: "affordable-and-clean-energy",
//     color: "#FCC30B",
//     description:
//       "Ensure access to affordable and sustainable energy."
//   },
//   {
//     number: 8,
//     name: "Decent Work and Economic Growth",
//     slug: "decent-work-and-economic-growth",
//     color: "#A21942",
//     description:
//       "Promote sustained and inclusive economic growth."
//   },
//   {
//     number: 9,
//     name: "Industry, Innovation and Infrastructure",
//     slug: "industry-innovation-and-infrastructure",
//     color: "#FD6925",
//     description:
//       "Build resilient infrastructure and foster innovation."
//   },
//   {
//     number: 10,
//     name: "Reduced Inequalities",
//     slug: "reduced-inequalities",
//     color: "#DD1367",
//     description:
//       "Reduce inequality within and among countries."
//   },
//   {
//     number: 11,
//     name: "Sustainable Cities and Communities",
//     slug: "sustainable-cities-and-communities",
//     color: "#FD9D24",
//     description:
//       "Make cities inclusive, safe and sustainable."
//   },
//   {
//     number: 12,
//     name: "Responsible Consumption and Production",
//     slug: "responsible-consumption-and-production",
//     color: "#BF8B2E",
//     description:
//       "Ensure sustainable consumption and production patterns."
//   },
//   {
//     number: 13,
//     name: "Climate Action",
//     slug: "climate-action",
//     color: "#3F7E44",
//     description:
//       "Take urgent action to combat climate change."
//   },
//   {
//     number: 14,
//     name: "Life Below Water",
//     slug: "life-below-water",
//     color: "#0A97D9",
//     description:
//       "Conserve and sustainably use oceans and marine resources."
//   },
//   {
//     number: 15,
//     name: "Life on Land",
//     slug: "life-on-land",
//     color: "#56C02B",
//     description:
//       "Protect and restore terrestrial ecosystems."
//   },
//   {
//     number: 16,
//     name: "Peace, Justice and Strong Institutions",
//     slug: "peace-justice-and-strong-institutions",
//     color: "#00689D",
//     description:
//       "Promote peaceful and inclusive societies."
//   },
//   {
//     number: 17,
//     name: "Partnerships for the Goals",
//     slug: "partnerships-for-the-goals",
//     color: "#19486A",
//     description:
//       "Strengthen the means of implementation and global partnerships."
//   }
// ];

// async function seed() {
//   await mongoose.connect(MONGODB_URI, {
//     dbName: "rgis",
//   });

//   const SDG = mongoose.model(
//     "SDG",
//     new mongoose.Schema({}, { strict: false })
//   );

//   await SDG.deleteMany({});
//   await SDG.insertMany(sdgs);

//   console.log("17 SDGs Seeded Successfully");

//   process.exit();
// }

// seed();

const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

console.log("MONGODB_URI:", process.env.MONGODB_URI);
const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI);

// These map to files that already exist in /public/guides and /public/templates.
const resources = [
  {
    title: "Proposal Writing Guide",
    category: "Guides",
    description:
      "Step-by-step guidance on structuring a competitive research proposal.",
    fileUrl: "/guides/proposal-writing-guide.pdf",
    fileType: "pdf",
    downloadCount: 0,
    isFeatured: true,
  },
  {
    title: "Budget Guide",
    category: "Guides",
    description:
      "How to plan, justify, and present a research budget to funders.",
    fileUrl: "/guides/budget-guide.pdf",
    fileType: "pdf",
    downloadCount: 0,
    isFeatured: false,
  },
  {
    title: "Donor Guidelines",
    category: "Policy Documents",
    description:
      "Common compliance and reporting expectations across major donors.",
    fileUrl: "/guides/donor-guidelines.pdf",
    fileType: "pdf",
    downloadCount: 0,
    isFeatured: false,
  },
  {
    title: "Research Proposal Template",
    category: "Proposal Samples",
    description:
      "A ready-to-use starting template for a full research proposal.",
    fileUrl: "/templates/research-proposal.docx",
    fileType: "docx",
    downloadCount: 0,
    isFeatured: true,
  },
  {
    title: "Grant Application Template",
    category: "Proposal Samples",
    description:
      "Standard template for grant applications across most agencies.",
    fileUrl: "/templates/grant-application.docx",
    fileType: "docx",
    downloadCount: 0,
    isFeatured: false,
  },
  {
    title: "Concept Note Template",
    category: "Research Toolkits",
    description:
      "A short-form template to pitch a research idea before a full proposal.",
    fileUrl: "/templates/concept-note.docx",
    fileType: "docx",
    downloadCount: 0,
    isFeatured: false,
  },
  {
    title: "Budget Template",
    category: "Research Toolkits",
    description: "Spreadsheet template for itemized research budgets.",
    fileUrl: "/templates/budget-template.xlsx",
    fileType: "xlsx",
    downloadCount: 0,
    isFeatured: false,
  },
];

async function seed() {
  await mongoose.connect(MONGODB_URI, {
    dbName: "rgis",
  });

  const Resource = mongoose.model(
    "Resource",
    new mongoose.Schema({}, { strict: false })
  );

  await Resource.deleteMany({});
  await Resource.insertMany(resources);

  console.log("Resources Seeded Successfully");

  process.exit();
}

seed();