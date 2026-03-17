import { useState } from 'react';
import KPICrForm from './components/KPICrForm';
import ScenarioKPICrForm from './components/ScenarioKPICrForm';
import ObservationCrForm from './components/ObservationCrForm';
import ComCrForm from './components/ComCrForm';

function App() {
  const [activeTab, setActiveTab] = useState('kpi');

  return (
    <>
      <nav className="bg-slate-800 border-b border-slate-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <span className="text-xl font-semibold text-white tracking-wide">KPI CR Description Generator</span>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button onClick={() => setActiveTab('kpi')} className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'kpi' ? 'text-white bg-blue-600 shadow border border-blue-500 hover:bg-blue-700' : 'text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-white'}`}>KPI CR</button>
          <button onClick={() => setActiveTab('scenario')} className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'scenario' ? 'text-white bg-blue-600 shadow border border-blue-500 hover:bg-blue-700' : 'text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-white'}`}>Scenario KPI</button>
          <button onClick={() => setActiveTab('obs')} className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'obs' ? 'text-white bg-blue-600 shadow border border-blue-500 hover:bg-blue-700' : 'text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-white'}`}>Observation CR</button>
          <button onClick={() => setActiveTab('com')} className={`px-6 py-2 rounded-md font-medium transition-colors ${activeTab === 'com' ? 'text-white bg-blue-600 shadow border border-blue-500 hover:bg-blue-700' : 'text-slate-400 border border-slate-700 hover:bg-slate-800 hover:text-white'}`}>CR Comments</button>
        </div>

        {activeTab === 'kpi' && <KPICrForm />}
        {activeTab === 'scenario' && <ScenarioKPICrForm />}
        {activeTab === 'obs' && <ObservationCrForm />}
        {activeTab === 'com' && <ComCrForm />}
      </main>
    </>
  );
}

export default App;
