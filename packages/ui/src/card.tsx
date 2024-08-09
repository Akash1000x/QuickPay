export function Card({
  title,
  children,
  clasName,
}: {
  title?: string;
  children?: React.ReactNode;
  clasName?: string;
}): JSX.Element {
  return (
    <div className={`border p-6 bg-white rounded-xl bg-[#ededed] ${clasName}`}>
      <h1 className="text-xl border-b pb-2">{title}</h1>
      <p>{children}</p>
    </div>
  );
}
