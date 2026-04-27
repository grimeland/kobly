import { PostnummerInput } from "./PostnummerInput";

export function FooterCTA() {
  return (
    <section className="px-6 py-14 sm:px-10 sm:py-20">
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl">
          Klar for å flytte?
        </h2>
        <PostnummerInput className="mt-6 sm:mt-8" />
      </div>
    </section>
  );
}
