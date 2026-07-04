"use client";

const templates = [
  {
    title:
      "Research Proposal Template",
    description:
      "General research proposal format for funding applications.",
    file:
      "/templates/research-proposal.docx",
  },
  {
    title:
      "Budget Proposal Template",
    description:
      "Budget planning and financial breakdown template.",
    file:
      "/templates/budget-template.xlsx",
  },
  {
    title:
      "Project Concept Note",
    description:
      "Short concept note template for donor submissions.",
    file:
      "/templates/concept-note.docx",
  },
  {
    title:
      "Grant Application Template",
    description:
      "Complete grant application format.",
    file:
      "/templates/grant-application.docx",
  },
];

export default function ProposalTemplates() {
  return (
    <>
      <h1 className="mb-8 text-4xl font-bold">
        Proposal Templates
      </h1>

      <div className="grid gap-6 md:grid-cols-2">
        {templates.map(
          (template) => (
            <div
              key={template.title}
              className="rounded-xl border p-6"
            >
              <h2 className="text-2xl font-bold">
                {template.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {template.description}
              </p>

              <a
                href={template.file}
                download
                className="mt-5 inline-block rounded bg-blue-600 px-5 py-3 text-white"
              >
                Download
              </a>
            </div>
          )
        )}
      </div>
    </>
  );
}