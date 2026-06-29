interface Props {
  title: string;
  subtitle?: string;
}

export default function PageHero({
  title,
  subtitle,
}: Props) {
  return (
    <section className="bg-blue-600 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h1 className="text-5xl font-bold">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-6 text-xl text-blue-100">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}