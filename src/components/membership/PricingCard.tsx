interface PricingCardProps {
    title: string;
    price: string;
    description: string;
    features: string[];
    buttonText: string;
    highlighted?: boolean;
  }
  
  export default function PricingCard({
    title,
    price,
    description,
    features,
    buttonText,
    highlighted = false,
  }: PricingCardProps) {
    return (
      <div
        className={`rounded-2xl border p-8 shadow-sm transition hover:shadow-lg ${
          highlighted
            ? "border-blue-600 bg-blue-50"
            : "border-gray-200 bg-white"
        }`}
      >
        <h3 className="text-2xl font-bold">{title}</h3>
  
        <p className="mt-2 text-gray-500">
          {description}
        </p>
  
        <div className="mt-6">
          <span className="text-4xl font-bold">
            {price}
          </span>
        </div>
  
        <ul className="mt-8 space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2"
            >
              ✅ {feature}
            </li>
          ))}
        </ul>
  
        <button
          className={`mt-8 w-full rounded-lg py-3 text-white ${
            highlighted
              ? "bg-blue-600"
              : "bg-gray-900"
          }`}
        >
          {buttonText}
        </button>
      </div>
    );
  }