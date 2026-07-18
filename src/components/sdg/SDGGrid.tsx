"use client";

import { useEffect, useState } from "react";
import SDGCard from "./SDGCard";

export default function SDGGrid() {
  const [sdgs, setSdgs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/sdgs")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSdgs(data.sdgs);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading SDGs...</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sdgs.map((sdg) => (
        <SDGCard
          key={sdg._id}
          sdg={sdg}
        />
      ))}
    </div>
  );
}