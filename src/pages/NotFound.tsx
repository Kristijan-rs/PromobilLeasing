import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-3xl font-bold">Seite nicht gefunden (404)</h1>
      <p className="mt-2 text-neutral-600">Der gesuchte Inhalt existiert nicht.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-neutral-900 px-4 py-2 text-white">
        Zur Startseite
      </Link>
    </div>
  );
}
