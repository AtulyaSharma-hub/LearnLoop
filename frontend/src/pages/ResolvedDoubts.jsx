import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const API_BASE = "http://localhost:5000";

function normalizeUploadPath(path) {
  if (!path) return "";
  return path
    .replace(/\\/g, "/")
    .replace(/^uploads\//, "");
}

function buildMediaUrl(responseContent) {
  if (!responseContent) return "";
  return `${API_BASE}/uploads/${normalizeUploadPath(responseContent)}`;
}

function getVideoMimeType(path) {
  const ext = path.split(".").pop()?.toLowerCase();
  const types = {
    mp4: "video/mp4",
    webm: "video/webm",
    ogg: "video/ogg",
    mov: "video/quicktime"
  };
  return types[ext] || "video/mp4";
}

function getFileLabel(path) {
  if (!path) return "";
  const normalized = normalizeUploadPath(path);
  return normalized.split("/").pop() || normalized;
}

function TeacherMediaSolution({ responseType, responseContent }) {
  const mediaSrc = buildMediaUrl(responseContent);
  const fileLabel = getFileLabel(responseContent);

  if (!responseContent) {
    return (
      <p className="mt-3 text-gray-400">
        No {responseType === "image" ? "image" : "video"} file recorded.
      </p>
    );
  }

  const openInNewTab = (
    <a
      href={mediaSrc}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-xl bg-blue-500/20 text-blue-200 text-sm border border-blue-400/30 hover:bg-blue-500/30 transition"
    >
      Open in new tab ↗
    </a>
  );

  if (responseType === "image") {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <a
          href={mediaSrc}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
          title="Click to open full image in a new tab"
        >
          <img
            src={mediaSrc}
            alt="Teacher solution"
            className="w-full max-h-[28rem] object-contain rounded-xl border border-white/10 group-hover:border-blue-400/40 transition"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </a>
        {fileLabel && (
          <p className="mt-3 text-xs text-gray-500 truncate">{fileLabel}</p>
        )}
        {openInNewTab}
      </div>
    );
  }

  if (responseType === "video") {
    return (
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
        <video
          controls
          playsInline
          preload="metadata"
          className="w-full max-h-[28rem] rounded-xl border border-white/10 bg-black"
        >
          <source
            src={mediaSrc}
            type={getVideoMimeType(responseContent)}
          />
          Your browser does not support inline video playback.
        </video>
        {fileLabel && (
          <p className="mt-3 text-xs text-gray-500 truncate">{fileLabel}</p>
        )}
        {openInNewTab}
      </div>
    );
  }

  return null;
}

function ResolvedDoubts() {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResolvedDoubts();
  }, []);

  const fetchResolvedDoubts = async () => {
    try {
      const response = await axios.get(
        `${API_BASE}/api/doubts/resolved`
      );
      setDoubts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-[#0B1020] text-white relative overflow-hidden px-6 py-10">
          <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center py-24">
            <p className="text-2xl text-gray-300">Loading resolved doubts...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0B1020] text-white relative overflow-hidden px-6 py-10">
        <div className="absolute top-0 left-0 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-3xl rounded-full"></div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-sm text-blue-200 mb-6">
                Resolved Doubts Archive
              </div>

              <h1 className="text-5xl md:text-6xl font-black leading-tight">
                Resolved
                <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}Doubts
                </span>
              </h1>

              <p className="text-gray-300 mt-6 text-lg max-w-2xl leading-relaxed">
                Review the doubts that have been successfully answered and learn from teacher responses.
              </p>
            </div>

            <div className="bg-white/10 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 min-w-70 shadow-2xl">
              <p className="text-gray-300 text-sm">Total Resolved</p>
              <h2 className="text-5xl font-black mt-3 text-blue-300">{doubts.length}</h2>
              <p className="text-blue-200 mt-4 text-sm">A growing record of answers and mentorship.</p>
            </div>
          </div>

          <div className="mt-14 grid gap-6">
            {doubts.length === 0 ? (
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl p-12 rounded-3xl text-center">
                <div className="text-6xl mb-5">✨</div>
                <h2 className="text-3xl font-bold text-white">No Resolved Doubts Yet</h2>
                <p className="text-gray-400 mt-4 text-lg">
                  Once doubts are marked as resolved, they will appear here with the full response.
                </p>
              </div>
            ) : (
              doubts.map((doubt) => {
                const responseType =
                  doubt.responseType || doubt.helpType || "text";
                const responseContent =
                  doubt.responseContent || doubt.helpContent || "";

                return (
                  <div
                    key={doubt._id}
                    className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300 shadow-xl"
                  >
                    <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-bold text-white">{doubt.title}</h2>
                        <p className="mt-3 text-sm text-gray-400 uppercase tracking-[0.18em]">
                          {doubt.subject}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {doubt.studentName && (
                            <span className="px-3 py-1 rounded-full text-xs bg-amber-500/20 text-amber-200 border border-amber-400/20">
                              Asked by {doubt.studentName}
                            </span>
                          )}
                          {doubt.mentorName && (
                            <span className="px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-200 border border-purple-400/20">
                              Helped by {doubt.mentorName}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-400">Resolved On</p>
                        <p className="font-semibold text-white">
                          {doubt.resolvedAt
                            ? new Date(doubt.resolvedAt).toLocaleString()
                            : "Date unavailable"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 border-t border-white/10 pt-6">
                      <h3 className="font-semibold text-blue-300">
                        Teacher Solution
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {responseType === "text" && "Written explanation"}
                        {responseType === "image" && "Image solution — preview below or open in a new tab"}
                        {responseType === "video" && "Video solution — play below or open in a new tab"}
                      </p>

                      {responseType === "text" && (
                        <p className="mt-3 text-gray-200 leading-relaxed">
                          {responseContent || "No response recorded."}
                        </p>
                      )}

                      {(responseType === "image" || responseType === "video") && (
                        <TeacherMediaSolution
                          responseType={responseType}
                          responseContent={responseContent}
                        />
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResolvedDoubts;
