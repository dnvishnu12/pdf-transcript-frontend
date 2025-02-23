"use client";

import { useContext, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { Button } from "./elements/Button";
import { AppContext } from "@/context/AppContext";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useId } from "react";
import { StarField } from "@/components/elements/StarField";

const api = process.env.NEXT_PUBLIC_API_URL;

export function PdfUploadComponent() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState(null);
  const { setTranscript, setLoading } = useContext(AppContext);

  // Initialize the default pdf viewer layout without sidebar options
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
  });

  const handleExtractText = async () => {
    if (!pdfUrl) return;
    setSubmittedUrl(pdfUrl);
    setLoading(true);

    try {
      const response = await fetch(`${api}/extract`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pdf_url: pdfUrl }),
      });
      const data = await response.json();
      console.log(data);

      if (!data.data || data.data.length === 0) {
        setTranscript([{ type: "paragraph", text: "No text extracted." }]);
        return;
      }

      // Process data to format into headings and paragraphs
      const formattedTranscript = data.data.map((item) => {
        const text = item.text.trim();

        if (text.length < 40 && /^[A-Z\s]+$/.test(text)) {
          return { type: "heading", text };
        } else {
          return { type: "paragraph", text };
        }
      });

      setTranscript(formattedTranscript);
    } catch (error) {
      console.error("Error extracting text:", error);
      setTranscript([{ type: "paragraph", text: "Error extracting text." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadNewPdf = () => {
    setPdfUrl("");
    setTranscript();
    setSubmittedUrl("");
  };

  return (
    <>
      {submittedUrl ? (
        <div className="w-screen flex-col items-center justify-center lg:w-full">
          <div className="mb-4 flex items-center justify-between">
            <Button onClick={handleUploadNewPdf} type="button">
              Upload New PDF
            </Button>
          </div>

          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div className="h-[600px] w-screen overflow-hidden rounded-lg border border-gray-500 lg:w-full">
              <Viewer
                fileUrl={submittedUrl}
                plugins={[defaultLayoutPluginInstance]}
              />
            </div>
          </Worker>
        </div>
      ) : (
        <>
          <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
            Extract text from your{" "}
            <span className="text-sky-300">PDF files</span>
          </h1>
          <p className="mt-4 text-sm/6 text-gray-300">
            Upload or provide a URL to your PDF file and extract the transcript
            easily.
          </p>
          <p className="mt-4 text-lg font-semibold text-white">
            Get the transcript of the PDF
          </p>
          <form
            onSubmit={handleExtractText}
            className="relative isolate mt-8 flex w-full items-center gap-2 pr-1"
          >
            <input
              required
              type="url"
              name="pdfUrl"
              placeholder="Enter PDF URL"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              className="peer w-full rounded-lg border border-gray-500 bg-transparent px-4 py-2.5 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-[0.8125rem]/6"
            />
            <Button type="submit" arrow className="px-4 py-2.5">
              Extract & View PDF
            </Button>
          </form>
        </>
      )}
    </>
  );
}

function Glow() {
  let id = useId();

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gray-950 lg:right-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem]">
      <svg
        className="absolute -bottom-48 left-[-40%] h-[80rem] w-[180%] lg:top-[-40%] lg:-right-40 lg:bottom-auto lg:left-auto lg:h-[180%] lg:w-[80rem]"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id={`${id}-desktop`} cx="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
          <radialGradient id={`${id}-mobile`} cy="100%">
            <stop offset="0%" stopColor="rgba(56, 189, 248, 0.3)" />
            <stop offset="53.95%" stopColor="rgba(0, 71, 255, 0.09)" />
            <stop offset="100%" stopColor="rgba(10, 14, 23, 0)" />
          </radialGradient>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-desktop)`}
          className="hidden lg:block"
        />
        <rect
          width="100%"
          height="100%"
          fill={`url(#${id}-mobile)`}
          className="lg:hidden"
        />
      </svg>
      <div className="absolute inset-x-0 right-0 bottom-0 h-px bg-white mix-blend-overlay lg:top-0 lg:left-auto lg:h-auto lg:w-px" />
    </div>
  );
}

export function PdfUpload() {
  return (
    <div className="relative flex-none overflow-hidden px-6 lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex lg:px-0">
      <Glow />
      <div className="relative flex w-full lg:pointer-events-auto lg:mr-[calc(max(2rem,50%-38rem)+40rem)] lg:min-w-[32rem] lg:overflow-x-hidden lg:overflow-y-auto lg:pl-[max(4rem,calc(50%-38rem))]">
        <div className="mx-auto max-w-lg lg:mx-0 lg:flex lg:w-96 lg:max-w-none lg:flex-col lg:before:flex-1 lg:before:pt-6">
          <div className="pt-20 pb-16 sm:pt-32 sm:pb-20 lg:py-20">
            <div className="relative">
              <StarField className="top-14 -right-44" />
              <PdfUploadComponent />
            </div>
          </div>
          <div className="flex flex-1 items-end justify-center pb-4 lg:justify-start lg:pb-6"></div>
        </div>
      </div>
    </div>
  );
}
