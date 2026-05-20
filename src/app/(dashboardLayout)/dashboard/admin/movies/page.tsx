import AddMovieForm from "@/src/app/components/Layout/AddMovieForm";

export default function ManageMoviePage() {
  return (
    <div className="text-white">
      <div className="mb-8">
        <p className="text-[11px] tracking-[0.45em] uppercase text-white/50 mb-3">
          New addition
        </p>
        <h1
          className="text-white font-light leading-[1] tracking-tight"
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
        >
          Add a film to the{" "}
          <span className="italic font-serif text-white/80">catalogue.</span>
        </h1>
        <p className="text-white/55 mt-3 max-w-xl text-sm">
          Provide the poster, trailer, synopsis and pricing — the studio will
          publish it instantly.
        </p>
      </div>
      <AddMovieForm />
    </div>
  );
}
