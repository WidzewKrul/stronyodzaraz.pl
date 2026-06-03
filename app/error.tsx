"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-3xl font-bold text-slate-900 mb-3">Coś poszło nie tak</h1>
      <p className="text-slate-600 mb-8 max-w-md">
        Przepraszamy za utrudnienia. Spróbuj odświeżyć stronę lub wróć do strony głównej.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
        >
          Spróbuj ponownie
        </button>
        <a
          href="/"
          className="px-5 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
        >
          Strona główna
        </a>
      </div>
    </main>
  );
}
