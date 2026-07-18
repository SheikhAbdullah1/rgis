"use client";

interface Props {

  proposalFile: File | null;

  onFileChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;

  error?: string;

}

export default function ProposalAttachments({

  proposalFile,

  onFileChange,

  error,

}: Props) {

  return (

    <section className="rounded-xl border p-6 space-y-5">

      <h2 className="text-2xl font-bold">
        Proposal Attachment
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={onFileChange}
        className="w-full rounded-lg border p-3"
      />

      <p className="text-sm text-gray-500">
        PDF, DOC or DOCX (Maximum 10 MB)
      </p>

      {proposalFile && (

        <div className="rounded-lg bg-green-50 p-4">

          <strong>
            Selected File
          </strong>

          <p>
            {proposalFile.name}
          </p>

          <p className="text-sm text-gray-500">
            {(proposalFile.size / 1024 / 1024).toFixed(2)} MB
          </p>

        </div>

      )}

      {error && (

        <p className="text-red-500">
          {error}
        </p>

      )}

    </section>

  );

}