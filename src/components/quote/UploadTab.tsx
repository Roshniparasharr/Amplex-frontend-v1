import React, { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addFiles, removeFile } from "../../app/features/quote/quoteSlice";

type UploadTabProps = {
  onParse: () => void;
};

export default function UploadTab({ onParse }: UploadTabProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const dispatch = useAppDispatch();
  const files = useAppSelector((state) => state.quote.files);

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;

    const mappedFiles = Array.from(incoming).map((file, index) => ({
      id: `${file.name}-${file.size}-${index}-${Date.now()}`,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    dispatch(addFiles(mappedFiles));
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-7">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`rounded-3xl border-2 border-dashed p-12 text-center cursor-pointer transition ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-slate-300 bg-slate-50 hover:bg-slate-100 hover:border-blue-400"
        }`}
      >
        <div className="mx-auto h-16 w-16 rounded-2xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-5">
          <UploadCloud size={30} className="text-blue-600" />
        </div>
        <h4 className="text-lg font-semibold">Drop RFQ files here</h4>
        <p className="text-sm text-slate-500 mt-2">
          PDF, images, Excel, Word, screenshots, email exports
        </p>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((file) => (
            <div
              key={file.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600" size={18} />
                <div>
                  <p className="font-medium text-slate-900">{file.name}</p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              <button
                onClick={() => dispatch(removeFile(file.id))}
                className="text-slate-400 hover:text-red-500"
              >
                <X size={18} />
              </button>
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={onParse}
              className="bg-blue-600 text-white px-5 py-3 rounded-2xl hover:bg-blue-700 transition"
            >
              Parse Uploaded RFQ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}