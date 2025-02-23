"use client";

import { ClipLoader } from "react-spinners";
import { SparkleIcon } from "./elements/SparkleIcon";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";

export function Transcript() {
  const { transcript, loading } = useContext(AppContext);

  return (
    <>
      {loading && (
        <div className="flex h-screen items-center justify-center">
          <ClipLoader color="#36d7b7" size={60} />
        </div>
      )}

      {transcript && transcript.length > 0 && (
        <div className="mx-auto max-w-3xl p-6 pt-20">
          <h1 className="mb-8 flex items-center gap-3 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            <SparkleIcon className="mt-1 size-7 text-blue-500" /> Extracted
            Transcript
          </h1>

          <div className="space-y-8">
            {transcript.map((item, index) =>
              item.type === "heading" ? (
                <h2
                  key={index}
                  className="mt-8 text-3xl font-bold text-blue-600 dark:text-blue-400"
                >
                  {item.text}
                </h2>
              ) : (
                <p
                  key={index}
                  className="text-lg leading-relaxed text-gray-800 dark:text-gray-300"
                >
                  {item.text}
                </p>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
}
