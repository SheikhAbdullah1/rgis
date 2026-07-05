import Link from "next/link"; // ✅ Fixed missing import

interface PricingCardProps {
  _id?: string;             // ✅ Added MongoDB unique ID support
  id?: string | number;     // ✅ Added standard ID fallback
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  highlighted?: boolean;
  href: string;
}

export default function PricingCard({
  _id,
  id,
  title,
  price,
  description,
  features,
  buttonText,
  highlighted = false,
}: PricingCardProps) {
  // Safe routing ID resolution
  const planId = _id ?? id;

  return (
    <div
      className={`rounded-2xl border p-8 shadow-sm transition hover:shadow-lg flex flex-col justify-between ${
        highlighted
          ? "border-blue-600 bg-blue-50/50 ring-2 ring-blue-600/20"
          : "border-gray-200 bg-white"
      }`}
    >
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>

        <p className="mt-2 text-sm text-gray-500">
          {description}
        </p>

        <div className="mt-6">
          <span className="text-4xl font-extrabold text-gray-900">
            {price}
          </span>
        </div>

        <ul className="mt-8 space-y-3">
          {/* ✅ Fixed: Using item + index to prevent duplicate key console errors */}
          {features.map((feature, index) => (
            <li
              key={`${feature}-${index}`}
              className="flex items-start gap-2.5 text-sm text-gray-600"
            >
              <span className="text-green-500 font-bold">✓</span> {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 space-y-3">
        {planId ? (
          <Link href={`/membership/${planId}`} className="block w-full">
            <button
              className={`w-full rounded-lg py-3 text-sm font-medium text-white transition-colors ${
                highlighted
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {buttonText}
            </button>
          </Link>
        ) : (
          <button className="w-full rounded-lg bg-gray-400 py-3 text-sm font-medium text-white cursor-not-allowed" disabled>
            Plan Unavailable
          </button>
        )}

        {planId && (
          <div className="text-center">
            <Link 
              href={`/membership/${planId}`} 
              className="text-xs font-medium text-blue-600 hover:underline inline-block"
            >
              View Plan Details
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}