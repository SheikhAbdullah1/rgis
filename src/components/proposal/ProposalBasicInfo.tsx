"use client";

import { ProposalData } from "./types";

interface Props {

    data: ProposalData;

    agencies: any[];

    grants: any[];

    errors: Record<string, string>;

    onChange: (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement |
            HTMLSelectElement
        >
    ) => void;
}

export default function ProposalBasicInfo({

    data,

    agencies,

    grants,

    errors,

    onChange,

}: Props) {

    return (

        <section className="rounded-xl border p-6 space-y-5">

            <h2 className="text-2xl font-bold">

                Proposal Information

            </h2>

            <input

                name="title"

                value={data.title}

                onChange={onChange}

                placeholder="Proposal Title"

                className="w-full rounded-lg border p-3"

            />

            {errors.title &&

                <p className="text-red-500 text-sm">

                    {errors.title}

                </p>

            }

            <textarea

                rows={6}

                name="description"

                value={data.description}

                onChange={onChange}

                placeholder="Proposal Description"

                className="w-full rounded-lg border p-3"

            />

            {errors.description &&

                <p className="text-red-500 text-sm">

                    {errors.description}

                </p>

            }

            <input

                name="funding"

                value={data.funding}

                onChange={onChange}

                placeholder="Funding Amount"

                className="w-full rounded-lg border p-3"

            />

            <select

                name="agency"

                value={data.agency}

                onChange={onChange}

                className="w-full rounded-lg border p-3"

            >

                <option value="">

                    Select Agency

                </option>

                {agencies.map((agency) => (

                    <option

                        key={agency._id}

                        value={agency._id}

                    >

                        {agency.name}

                    </option>

                ))}

            </select>

            <select

                name="grant"

                value={data.grant}

                onChange={onChange}

                className="w-full rounded-lg border p-3"

            >

                <option value="">

                    Select Grant

                </option>

                {grants.map((grant) => (

                    <option

                        key={grant._id}

                        value={grant._id}

                    >

                        {grant.title}

                    </option>

                ))}

            </select>

        </section>

    );

}