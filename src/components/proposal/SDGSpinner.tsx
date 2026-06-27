type Props = {
    selectedSDG: number | null;
    setSelectedSDG: React.Dispatch<
      React.SetStateAction<number | null>
    >;
  };
  
  export default function SDGSpinner({
    selectedSDG,
    setSelectedSDG,
  }: Props) {
    const goals = Array.from({ length: 17 }, (_, i) => i + 1);
  
    return (
      <div className="grid grid-cols-5 gap-4">
        {goals.map((goal) => (
          <button
            key={goal}
            onClick={() => setSelectedSDG(goal)}
            className={`h-16 w-16 rounded-full border
              ${
                selectedSDG === goal
                  ? "bg-blue-600 text-white"
                  : ""
              }`}
          >
            {goal}
          </button>
        ))}
      </div>
    );
  }