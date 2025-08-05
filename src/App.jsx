import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";


const App = () => {
  const [weather, setWeather] = useState(null);
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "03408c5c3f754bf1956154143250308";

  const fetchWeather = async (q) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        "https://api.weatherapi.com/v1/current.json",
        {
          params: {
            key: API_KEY,
            q,
          },
        }
      );
      setWeather(res.data);
    } catch (e) {
      console.error(e);
      setError("Hudud topilmadi yoki tarmoqda muammo bor.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather("Andijon");
  }, []);

  const searchRegion = (e) => {
    e.preventDefault();
    if (!region.trim()) return;
    fetchWeather(region.trim());
    setRegion("");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-white p-6">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-6 relative">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gray-200 rounded-full"></div>
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-4">
          Weather
        </h1>

        <form onSubmit={searchRegion} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Hudud (masalan: Paris)"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:italic shadow-sm"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition"
          >
            Qidirish
          </button>
        </form>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-600">Yuklanmoqda...</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 mb-2">{error}</div>
        ) : weather ? (
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500">Hudud</p>
                <h2 className="text-lg font-semibold">
                  {weather.location?.name}
                </h2>
                <p className="text-[11px] text-gray-400">
                  {weather.location?.country}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Mahalliy vaqt</p>
                <p className="font-medium">{weather.location?.localtime}</p>
              </div>
            </div>

            <div className="bg-indigo-50 rounded-2xl p-4 flex items-center gap-4 shadow-inner">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Hozirgi harorat</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold">
                    {weather.current?.temp_c}°C
                  </span>
                  <span className="text-sm text-gray-500">
                    Feels like {weather.current?.feelslike_c}°C
                  </span>
                </div>
                <p className="text-xs mt-1">
                  {weather.current?.condition?.text}
                </p>
              </div>
              <div className="flex flex-col items-center">
                {weather.current?.condition?.icon ? (
                  <img
                    src={`https:${weather.current.condition.icon}`}
                    alt={weather.current.condition.text}
                    className="w-16 h-16"
                    loading="lazy"
                  />
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase text-gray-500">Shamol</p>
                <p className="font-semibold">{weather.current?.wind_kph} kph</p>
                <p className="text-[11px] text-gray-400">
                  Yo‘nalish: {weather.current?.wind_dir}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <p className="text-[10px] uppercase text-gray-500">Namlik</p>
                <p className="font-semibold">{weather.current?.humidity}%</p>
                <p className="text-[11px] text-gray-400">
                  UV: {weather.current?.uv}
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-gray-100 shadow-sm col-span-2">
                <p className="text-[10px] uppercase text-gray-500">Sharoit</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 text-sm">
                    <div>Ko‘rinish: {weather.current?.condition?.text}</div>
                    <div>Bosim: {weather.current?.pressure_mb} mb</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-6">
            Ma'lumot yo‘q, hudud kiriting.
          </div>
        )}
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default App;