"use client";

import { useEffect, useState } from "react";

export interface BudgetItem {
  id: number;
  category: string;
  item: string;
  quantity: number;
  unitCost: number;
  total: number;
  remarks: string;
}

interface Props {
  value?: BudgetItem[];
  onChange?: (items: BudgetItem[]) => void;
}

export default function BudgetPlanner({
  value = [],
  onChange,
}: Props) {

  const [items, setItems] = useState<BudgetItem[]>([
    {
      id: Date.now(),
      category: "Equipment",
      item: "",
      quantity: 1,
      unitCost: 0,
      total: 0,
      remarks: "",
    },
  ]);
  
  useEffect(() => {
    if (value.length > 0) {
      setItems(value);
    }
  }, [value]);
  
  useEffect(() => {
    onChange?.(items);
  }, [items, onChange]);
  // const [items, setItems] = useState<BudgetItem>(value.length? value : [{
  //           id: Date.now(),
  //           category: "Equipment",
  //           item: "",
  //           quantity: 1,
  //           unitCost: 0,
  //           total: 0,
  //           remarks: "",
  //         },
  //       ]
  // );

  // useEffect(() => {
  //   onChange?.(items);
  // }, [items]);

  function update(
    id: number,
    field: keyof BudgetItem,
    value: any
  ) {
    setItems((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const updated = {
          ...row,
          [field]: value,
        };

        updated.total =
          updated.quantity *
          updated.unitCost;

        return updated;
      })
    );
  }

  function addRow() {
    setItems([
      ...items,
      {
        id: Date.now(),
        category: "Equipment",
        item: "",
        quantity: 1,
        unitCost: 0,
        total: 0,
        remarks: "",
      },
    ]);
  }

  function remove(id: number) {
    setItems(items.filter((i) => i.id !== id));
  }

  const grandTotal = items.reduce(
    (sum, row) => sum + row.total,
    0
  );

  return (
    <div className="rounded-xl border p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Budget Planner
        </h2>

        <button
          type="button"
          onClick={addRow}
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add Item
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="bg-gray-100">

              <th className="p-3">
                Category
              </th>

              <th className="p-3">
                Item
              </th>

              <th className="p-3">
                Qty
              </th>

              <th className="p-3">
                Unit Cost
              </th>

              <th className="p-3">
                Total
              </th>

              <th className="p-3">
                Remarks
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {items.map((row) => (

              <tr key={row.id}>

                <td>

                  <select
                    value={row.category}
                    onChange={(e)=>
                      update(
                        row.id,
                        "category",
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  >
                    <option>
                      Equipment
                    </option>

                    <option>
                      Personnel
                    </option>

                    <option>
                      Travel
                    </option>

                    <option>
                      Software
                    </option>

                    <option>
                      Training
                    </option>

                    <option>
                      Miscellaneous
                    </option>

                  </select>

                </td>

                <td>

                  <input
                    value={row.item}
                    onChange={(e)=>
                      update(
                        row.id,
                        "item",
                        e.target.value
                      )
                    }
                    className="border rounded p-2 w-full"
                  />

                </td>

                <td>

                  <input
                    type="number"
                    value={row.quantity}
                    onChange={(e)=>
                      update(
                        row.id,
                        "quantity",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded p-2 w-20"
                  />

                </td>

                <td>

                  <input
                    type="number"
                    value={row.unitCost}
                    onChange={(e)=>
                      update(
                        row.id,
                        "unitCost",
                        Number(e.target.value)
                      )
                    }
                    className="border rounded p-2"
                  />

                </td>

                <td>

                  {row.total.toLocaleString()}

                </td>

                <td>

                  <input
                    value={row.remarks}
                    onChange={(e)=>
                      update(
                        row.id,
                        "remarks",
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  />

                </td>

                <td>

                  <button
                    type="button"
                    onClick={() =>
                      remove(row.id)
                    }
                    className="text-red-600"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="mt-8 text-right">

        <h3 className="text-xl font-bold">

          Total Budget :

          <span className="ml-3 text-blue-700">

            PKR {grandTotal.toLocaleString()}

          </span>

        </h3>

      </div>

    </div>
  );
}