interface Props {
    title: string;
    description: string;
  }
  
  export default function CategoryCard({
    title,
    description,
  }: Props) {
    return (
      <div className="bg-white rounded-xl shadow p-6 border">
        <h3 className="text-xl font-bold mb-3">
          {title}
        </h3>
  
        <p className="text-gray-600">
          {description}
        </p>
      </div>
    );
  }