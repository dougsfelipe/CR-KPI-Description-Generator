import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function KPICrForm() {
    const [fp, setFp] = useState('');
    const [cycle, setCycle] = useState('Core KPI');
    const [product, setProduct] = useState('');
    const [hw, setHw] = useState('');
    const [app, setApp] = useState('');
    const [measureType, setMeasureType] = useState('ms');
    const [previousOS, setPreviousOS] = useState('');
    const [targetOS, setTargetOS] = useState('');
    
    const [testPlan, setTestPlan] = useState('');
    const [testCase, setTestCase] = useState('');
    const [initialSetup, setInitialSetup] = useState('');
    const [testSteps, setTestSteps] = useState('');
    const [expectResults, setExpectResults] = useState('');
    
    const [kpiID, setKpiID] = useState('');
    const [avg, setAvg] = useState('');
    const [results, setResults] = useState('');
    const [goal, setGoal] = useState('');
    const [logs, setLogs] = useState('');
    const [systrace, setSystrace] = useState('');
    const [videos, setVideos] = useState('');
    
    const [fpBaseline, setFpBaseline] = useState('');
    const [hwBaseline, setHwBaseline] = useState('');
    const [avgBaseline, setAvgBaseline] = useState('');
    const [resultsBaseline, setResultsBaseline] = useState('');
    const [logsBaseline, setLogsBaseline] = useState('');
    const [systraceBaseline, setSystraceBaseline] = useState('');
    const [videosBaseline, setVideosBaseline] = useState('');

    const [generatedResult, setGeneratedResult] = useState('');
    const [generatedSummary, setGeneratedSummary] = useState('');
    const [copiedContent, setCopiedContent] = useState(false);
    const [copiedSummary, setCopiedSummary] = useState(false);

    const resultRef = useRef<HTMLDivElement>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();
        
        let fpText = `*Build fingerprint:* ${fp || "N/A"}`;
        let hwText = `*Hw Version:* ${hw || "N/A"}`;
        let appText = app ? `*App Version:* ${app}` : "";
        
        let currentSystraceName = measureType === 'MB' ? "Logs from Script" : "Systrace";
        
        let targetVideosStr = videos ? `\n*Videos:* [drive|${videos}]` : "";
        let targetLogsLinks = [];
        if (logs) targetLogsLinks.push(`[Bug2Go|${logs}]`);
        if (systrace) targetLogsLinks.push(`[${currentSystraceName}|${systrace}]`);
        let targetLogsStr = targetLogsLinks.length > 0 ? `\n*Logs:* ${targetLogsLinks.join(' and ')}` : "";

        let baselineVideosStr = videosBaseline ? `\n*Video:* [drive|${videosBaseline}]` : "";
        let baselineLogsLinks = [];
        if (logsBaseline) baselineLogsLinks.push(`[Bug2Go|${logsBaseline}]`);
        if (systraceBaseline) baselineLogsLinks.push(`[${currentSystraceName}|${systraceBaseline}]`);
        let baselineLogsStr = baselineLogsLinks.length > 0 ? `\n*Logs:* ${baselineLogsLinks.join(' and ')}` : "";

        let textCR = `{panel:title=Reproducing the issue|titleBGColor=#e6e6ea }
${fpText} 
${hwText} 
${appText}


*Test Case:* ${testCase || "N/A"}
*Test Plan:* ${testPlan || "N/A"}

{panel}

{panel:title=Test Case Description|titleBGColor=#d2d4dc}

*Initial Setup:*

${initialSetup || "N/A"}

*Test step description:*

${testSteps || "N/A"}


*Expected Results:*
${expectResults || "N/A"}

{panel}


{panel:title=${kpiID || "KPI Component"} - Target OS (${targetOS || "Target OS"})|titleBGColor=#f4b6c2}
*Average (${measureType}):* ${avg || "0"}
*Readings (${measureType}):* ${results || "0"}
*Goal + tolerance (${measureType}):* ${goal || "0"}
Status: {color:#FF0000}*Fail*{color}${targetVideosStr}${targetLogsStr}
{panel}

{panel:title=Baseline Results on Previous OS (${previousOS || "Previous OS"})|titleBGColor=#83d0c9}
*Fingerprint:* ${fpBaseline || "N/A"}
*Hw Version:* ${hwBaseline || "N/A"}
*Results (${measureType}):* ${resultsBaseline || "0"}
*AVG (${measureType}):* ${avgBaseline || "0"}${baselineLogsStr}${baselineVideosStr}
{panel}


Reviewed by *KPI Team*
`;

        setGeneratedResult(textCR);
        
        const summaryCR = `[${cycle}]${product}: ${kpiID || "KPI Component"} - Failed`;
        setGeneratedSummary(summaryCR);
        
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    };

    const copyToClipboard = (text: string, isSummary: boolean) => {
        if (!text) return;
        navigator.clipboard.writeText(text).then(() => {
            if (isSummary) {
                setCopiedSummary(true);
                setTimeout(() => setCopiedSummary(false), 2000);
            } else {
                setCopiedContent(true);
                setTimeout(() => setCopiedContent(false), 2000);
            }
        });
    };

    return (
        <div>
            <form onSubmit={handleGenerate} className="space-y-8 bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700">
                {/* Device information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Device Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Build Fingerprint</label>
                            <input type="text" value={fp} onChange={(e) => setFp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Cycle</label>
                            <select value={cycle} onChange={(e) => setCycle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                <option value="Core KPI">Core KPI</option>
                                <option value="Secondary KPI">Secondary KPI</option>
                                <option value="Specific KPI">Specific KPI</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Product</label>
                            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">HW Version</label>
                            <input type="text" value={hw} onChange={(e) => setHw(e.target.value)} placeholder="PVT" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">App Version <span className="text-slate-500 text-xs">(*if applicable)</span></label>
                            <input type="text" value={app} onChange={(e) => setApp(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Measure Type</label>
                            <select value={measureType} onChange={(e) => setMeasureType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                                <option value="ms">ms</option>
                                <option value="FPS">FPS</option>
                                <option value="Janks">Janks</option>
                                <option value="MB">MB</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Previous OS</label>
                            <input type="text" value={previousOS} onChange={(e) => setPreviousOS(e.target.value)} placeholder="e.g. Android S" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Target OS</label>
                            <input type="text" value={targetOS} onChange={(e) => setTargetOS(e.target.value)} placeholder="e.g. Android T" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                    </div>
                </div>

                {/* Test Information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Test Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Test Plan</label>
                            <input type="text" value={testPlan} onChange={(e) => setTestPlan(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Test Case</label>
                            <input type="text" value={testCase} onChange={(e) => setTestCase(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Initial Setup:</label>
                            <textarea value={initialSetup} onChange={(e) => setInitialSetup(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Test step description:</label>
                            <textarea value={testSteps} onChange={(e) => setTestSteps(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Expected Results:</label>
                            <textarea value={expectResults} onChange={(e) => setExpectResults(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"></textarea>
                        </div>
                    </div>
                </div>

                {/* Result Information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Result Information</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">KPI ID</label>
                            <input type="text" value={kpiID} onChange={(e) => setKpiID(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">AVG</label>
                            <input type="text" value={avg} onChange={(e) => setAvg(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Results</label>
                            <input type="text" value={results} onChange={(e) => setResults(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">KPI Goal + Tolerance</label>
                            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Bug2Go (Logs)</label>
                            <input type="text" value={logs} onChange={(e) => setLogs(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">{measureType === 'MB' ? 'Logs from Script' : 'Systrace'}</label>
                            <input type="text" value={systrace} onChange={(e) => setSystrace(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Video</label>
                            <input type="text" value={videos} onChange={(e) => setVideos(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Baseline Information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Baseline Information</h2>
                    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Build Fingerprint</label>
                                <input type="text" value={fpBaseline} onChange={(e) => setFpBaseline(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">HW Version</label>
                                <input type="text" value={hwBaseline} onChange={(e) => setHwBaseline(e.target.value)} placeholder="PVT" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">AVG</label>
                                <input type="text" value={avgBaseline} onChange={(e) => setAvgBaseline(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Results</label>
                                <input type="text" value={resultsBaseline} onChange={(e) => setResultsBaseline(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Bug2Go (Logs)</label>
                                <input type="text" value={logsBaseline} onChange={(e) => setLogsBaseline(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">{measureType === 'MB' ? 'Logs from Script' : 'Systrace'}</label>
                                <input type="text" value={systraceBaseline} onChange={(e) => setSystraceBaseline(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Video</label>
                                <input type="text" value={videosBaseline} onChange={(e) => setVideosBaseline(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-700">
                    <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg transition-transform transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900">
                        Generate CR Description
                    </button>
                </div>
            </form>

            <div ref={resultRef} className={`mt-8 bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 ${generatedResult ? 'block' : 'hidden'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Generated Description</h2>
                    <button 
                        onClick={() => copyToClipboard(generatedResult, false)} 
                        className={`flex items-center space-x-2 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 ${copiedContent ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                        {copiedContent ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedContent ? 'Copied!' : 'Copy Description'}</span>
                    </button>
                </div>
                <textarea value={generatedResult} readOnly rows={24} className="w-full bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y mb-6"></textarea>
                
                <div className="flex justify-between items-center mb-4 border-t border-slate-700 pt-6">
                    <h2 className="text-lg font-semibold text-white">Generated Summary</h2>
                    <button 
                        onClick={() => copyToClipboard(generatedSummary, true)} 
                        className={`flex items-center space-x-2 px-4 py-2 text-white text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 ${copiedSummary ? 'bg-green-600 hover:bg-green-700' : 'bg-slate-700 hover:bg-slate-600'}`}
                    >
                        {copiedSummary ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
                    </button>
                </div>
                <textarea value={generatedSummary} readOnly rows={2} className="w-full bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
            </div>
        </div>
    );
}
