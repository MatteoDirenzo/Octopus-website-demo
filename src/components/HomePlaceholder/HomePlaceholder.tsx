type HomePlaceholderProps = {
  heading: string;
};

export function HomePlaceholder({ heading }: HomePlaceholderProps) {
  return (
    <main className="p-6 tablet:p-8 desktop:p-12">
      <h1 className="text-2xl font-semibold">{heading}</h1>
    </main>
  );
}