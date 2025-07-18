/* eslint-disable no-unused-vars */
import { useState } from "react";
import { fetchPlaylistInfo, downloadPlaylist } from "../api/playlist";

const Home = () => {
  const [url, setUrl] = useState("");
  const [playlist, setPlaylist] = useState(null);
  const [format, setFormat] = useState("mp3");
  const [loading, setLoading] = useState(false);

  const handleFetch = async () => {
    setLoading(true);
    try {
      const data = await fetchPlaylistInfo(url);
      setPlaylist(data);
    } catch (err) {
      alert("Failed to fetch playlist");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      await downloadPlaylist(url, format);
    } catch (err) {
      alert("Download failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center sm:justify-start">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M18 3a1 1 0 00-1.196-.98L4 5.687a1 1 0 00-.804.98V9H2a1 1 0 000 2h1v3.313a1 1 0 00.804.98L15.804 18.98A1 1 0 0018 18V3z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                  YouTube Downloader
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">Professional playlist downloader</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Input Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-6 sm:p-8 mb-8">
          <div className="space-y-6">
            {/* URL Input */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Playlist URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://www.youtube.com/playlist?list=..."
                className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400 text-sm sm:text-base"
              />
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Fetch Button */}
              <div className="sm:col-span-2 lg:col-span-2">
                <button
                  onClick={handleFetch}
                  disabled={!url.trim() || loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none text-sm sm:text-base"
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Fetching...</span>
                    </span>
                  ) : (
                    "Fetch Playlist"
                  )}
                </button>
              </div>

              {/* Format Select */}
              <div className="lg:col-span-1">
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-700 text-sm sm:text-base"
                >
                  <option value="mp3">MP3 Audio</option>
                  <option value="mp4_360">MP4 360p</option>
                  <option value="mp4_720">MP4 720p</option>
                  <option value="mp4_1080">MP4 1080p</option>
                </select>
              </div>

              {/* Download Button */}
              <div className="lg:col-span-1">
                <button
                  onClick={handleDownload}
                  disabled={!playlist || loading}
                  className="w-full px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl hover:from-emerald-700 hover:to-teal-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none text-sm sm:text-base"
                >
                  {loading ? "Downloading..." : "Download"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-6 mb-8">
            <div className="flex items-center justify-center space-x-3 text-purple-700">
              <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-medium">Processing your request...</p>
            </div>
          </div>
        )}

        {/* Playlist Display */}
        {playlist && (
          <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden">
            {/* Playlist Header */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 sm:px-8 py-6 border-b border-purple-100">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{playlist.title}</h2>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  {playlist.entries.length} videos
                </span>
              </div>
            </div>

            {/* Video List */}
            <div className="max-h-96 overflow-y-auto">
              <div className="divide-y divide-gray-100">
                {playlist.entries.map((v, idx) => (
                  <div key={idx} className="px-6 sm:px-8 py-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-100 to-indigo-100 text-purple-700 rounded-xl flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 leading-relaxed text-sm sm:text-base font-medium">{v.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
