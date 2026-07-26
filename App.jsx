import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('clcr');

  // State ClCr
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [scr, setScr] = useState('');
  const [gender, setGender] = useState('male');
  const [clcrResult, setClcrResult] = useState(null);

  // State BSA
  const [bsaHeight, setBsaHeight] = useState('');
  const [bsaWeight, setBsaWeight] = useState('');
  const [bsaResult, setBsaResult] = useState(null);

  // State BMI
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState(null);

  // State TDEE/Kalori
  const [tdeeAge, setTdeeAge] = useState('');
  const [tdeeHeight, setTdeeHeight] = useState('');
  const [tdeeWeight, setTdeeWeight] = useState('');
  const [tdeeGender, setTdeeGender] = useState('male');
  const [activity, setActivity] = useState('1.2');
  const [tdeeResult, setTdeeResult] = useState(null);

  // Kalkulasi ClCr
  const calculateClCr = (e) => {
    e.preventDefault();
    const a = parseFloat(age);
    const w = parseFloat(weight);
    const s = parseFloat(scr);

    if (!a || !w || !s || s === 0) return;

    let result = ((140 - a) * w) / (72 * s);
    if (gender === 'female') {
      result *= 0.85;
    }
    setClcrResult(result.toFixed(2));
  };

  // Kalkulasi BSA (Mosteller)
  const calculateBSA = (e) => {
    e.preventDefault();
    const h = parseFloat(bsaHeight);
    const w = parseFloat(bsaWeight);

    if (!h || !w) return;

    const result = Math.sqrt((h * w) / 3600);
    setBsaResult(result.toFixed(2));
  };

  // Kalkulasi BMI
  const calculateBMI = (e) => {
    e.preventDefault();
    const h = parseFloat(bmiHeight) / 100;
    const w = parseFloat(bmiWeight);

    if (!h || !w) return;

    const bmi = w / (h * h);
    let category = '';

    if (bmi < 18.5) category = 'Underweight (Kurang BB)';
    else if (bmi < 24.9) category = 'Normal';
    else if (bmi < 29.9) category = 'Overweight (Kelebihan BB)';
    else category = 'Obese (Obesitas)';

    setBmiResult({ val: bmi.toFixed(1), category });
  };

  // Kalkulasi TDEE (Mifflin-St Jeor)
  const calculateTDEE = (e) => {
    e.preventDefault();
    const a = parseFloat(tdeeAge);
    const h = parseFloat(tdeeHeight);
    const w = parseFloat(tdeeWeight);
    const act = parseFloat(activity);

    if (!a || !h || !w) return;

    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    if (tdeeGender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    const tdee = bmr * act;
    setTdeeResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee)
    });
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-4 sm:p-6">
      {/* Header */}
      <header className="max-w-xl w-full text-center my-6">
        <h1 className="text-3xl font-bold text-teal-400">MedCalc Lite 🩺</h1>
        <p className="text-slate-400 text-sm mt-1">Kalkulator Klinis Farmakokinetik & Medis Gratis</p>
      </header>

      {/* Tab Switcher */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 bg-slate-800 p-1 rounded-xl max-w-xl w-full mb-6 border border-slate-700 text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('clcr')}
          className={`py-2 font-semibold rounded-lg transition-all ${
            activeTab === 'clcr' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          ClCr
        </button>
        <button
          onClick={() => setActiveTab('bsa')}
          className={`py-2 font-semibold rounded-lg transition-all ${
            activeTab === 'bsa' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          BSA
        </button>
        <button
          onClick={() => setActiveTab('bmi')}
          className={`py-2 font-semibold rounded-lg transition-all ${
            activeTab === 'bmi' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          BMI
        </button>
        <button
          onClick={() => setActiveTab('tdee')}
          className={`py-2 font-semibold rounded-lg transition-all ${
            activeTab === 'tdee' ? 'bg-teal-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          Kalori / TDEE
        </button>
      </div>

      {/* Main Card */}
      <main className="bg-slate-800 p-6 rounded-2xl border border-slate-700 max-w-xl w-full shadow-xl">
        {activeTab === 'clcr' && (
          <form onSubmit={calculateClCr} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">
              Cockcroft-Gault Equation
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Umur (Tahun)</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Contoh: 45"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Berat Badan (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="Contoh: 60"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Serum Kreatinin (mg/dL)</label>
                <input
                  type="number"
                  step="0.01"
                  value={scr}
                  onChange={(e) => setScr(e.target.value)}
                  placeholder="Contoh: 1.2"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Jenis Kelamin</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-lg transition-all mt-4"
            >
              Hitung ClCr
            </button>
            {clcrResult && (
              <div className="mt-6 p-4 bg-teal-950/40 border border-teal-500/30 rounded-xl text-center">
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Hasil Clearance Creatinine</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {clcrResult} <span className="text-lg font-normal text-slate-400">mL/min</span>
                </div>
              </div>
            )}
          </form>
        )}

        {activeTab === 'bsa' && (
          <form onSubmit={calculateBSA} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">
              Mosteller Formula
            </h2>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tinggi Badan (cm)</label>
              <input
                type="number"
                value={bsaHeight}
                onChange={(e) => setBsaHeight(e.target.value)}
                placeholder="Contoh: 165"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Berat Badan (kg)</label>
              <input
                type="number"
                step="0.1"
                value={bsaWeight}
                onChange={(e) => setBsaWeight(e.target.value)}
                placeholder="Contoh: 65"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-lg transition-all mt-4"
            >
              Hitung BSA
            </button>
            {bsaResult && (
              <div className="mt-6 p-4 bg-teal-950/40 border border-teal-500/30 rounded-xl text-center">
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Luas Permukaan Tubuh</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {bsaResult} <span className="text-lg font-normal text-slate-400">m²</span>
                </div>
              </div>
            )}
          </form>
        )}

        {activeTab === 'bmi' && (
          <form onSubmit={calculateBMI} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">
              Body Mass Index (BMI)
            </h2>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tinggi Badan (cm)</label>
              <input
                type="number"
                value={bmiHeight}
                onChange={(e) => setBmiHeight(e.target.value)}
                placeholder="Contoh: 170"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Berat Badan (kg)</label>
              <input
                type="number"
                step="0.1"
                value={bmiWeight}
                onChange={(e) => setBmiWeight(e.target.value)}
                placeholder="Contoh: 70"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-lg transition-all mt-4"
            >
              Hitung BMI
            </button>
            {bmiResult && (
              <div className="mt-6 p-4 bg-teal-950/40 border border-teal-500/30 rounded-xl text-center">
                <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Hasil Indeks Massa Tubuh</span>
                <div className="text-3xl font-extrabold text-white mt-1">
                  {bmiResult.val} <span className="text-lg font-normal text-slate-400">kg/m²</span>
                </div>
                <div className="inline-block mt-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-xs font-medium">
                  Kategori: {bmiResult.category}
                </div>
              </div>
            )}
          </form>
        )}

        {activeTab === 'tdee' && (
          <form onSubmit={calculateTDEE} className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-2">
              Kebutuhan Kalori Harian (TDEE)
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Umur (Tahun)</label>
                <input
                  type="number"
                  value={tdeeAge}
                  onChange={(e) => setTdeeAge(e.target.value)}
                  placeholder="Contoh: 25"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Jenis Kelamin</label>
                <select
                  value={tdeeGender}
                  onChange={(e) => setTdeeGender(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                >
                  <option value="male">Laki-laki</option>
                  <option value="female">Perempuan</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Tinggi Badan (cm)</label>
                <input
                  type="number"
                  value={tdeeHeight}
                  onChange={(e) => setTdeeHeight(e.target.value)}
                  placeholder="Contoh: 170"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Berat Badan (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  value={tdeeWeight}
                  onChange={(e) => setTdeeWeight(e.target.value)}
                  placeholder="Contoh: 65"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Tingkat Aktivitas Fisik</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-teal-500 text-xs sm:text-sm"
              >
                <option value="1.2">Sedentari (Jarang / Tidak Pernah Olahraga)</option>
                <option value="1.375">Ringan (Olahraga 1-3 hari/minggu)</option>
                <option value="1.55">Sedang (Olahraga 3-5 hari/minggu)</option>
                <option value="1.725">Berat (Olahraga 6-7 hari/minggu)</option>
                <option value="1.9">Extrem (Olahraga Berat Tiap Hari / Atlet)</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-lg transition-all mt-4"
            >
              Hitung Kalori
            </button>
            {tdeeResult && (
              <div className="mt-6 p-4 bg-teal-950/40 border border-teal-500/30 rounded-xl space-y-3">
                <div className="text-center">
                  <span className="text-xs text-teal-400 font-semibold uppercase tracking-wider">Kebutuhan Kalori Harian (TDEE)</span>
                  <div className="text-3xl font-extrabold text-white mt-1">
                    {tdeeResult.tdee} <span className="text-lg font-normal text-slate-400">kcal/hari</span>
                  </div>
                </div>
                <div className="border-t border-slate-700/60 pt-2 text-center">
                  <span className="text-xs text-slate-400">Basal Metabolic Rate (BMR): </span>
                  <span className="text-sm font-semibold text-slate-200">{tdeeResult.bmr} kcal/hari</span>
                </div>
              </div>
            )}
          </form>
        )}
      </main>

      {/* Disclaimer */}
      <footer className="max-w-xl w-full text-center mt-6 text-xs text-slate-500">
        ⚠️ <strong>Disclaimer:</strong> Aplikasi ini hanya bertindak sebagai alat bantu perhitungan medis. Keputusan dosis klinis tetap berada di bawah wewenang penuh Tenaga Kesehatan Profesional.
      </footer>
    </div>
  );
}