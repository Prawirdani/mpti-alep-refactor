import TitleSetter from '../pageTitle';

export default function IndexContent() {
  return (
    <section className="flex-grow py-12 px-4 sm:px-12 2xl:px-80 bg-primary-foreground">
      <TitleSetter title="LoremBookStore" />
      <p>This is public index</p>
    </section>
  );
}
