import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ScenarioKPICrForm() {
    const [ram, setRam] = useState('less4');
    const [product, setProduct] = useState('');
    const [testedapp, setTestedapp] = useState('');
    const [app, setApp] = useState('');
    const [measureType, setMeasureType] = useState('ms');
    const [previousOS, setPreviousOS] = useState('');
    const [targetOS, setTargetOS] = useState('');
    const [Svideos, setSvideos] = useState('');

    const [precondition, setPrecondition] = useState('');
    const [testSteps, setTestSteps] = useState('');
    const [testResults, setTestResults] = useState('');

    const [Sresults, setSresults] = useState('');
    const [SAVG, setSAVG] = useState('');
    const [Sbug2go, setSbug2go] = useState('');
    const [Ssystrace, setSsystrace] = useState('');
    const [Sid, setSid] = useState('');
    const [Shw, setShw] = useState('');
    const [Sfp, setSfp] = useState('');

    const [Tresults, setTresults] = useState('');
    const [TAVG, setTAVG] = useState('');
    const [Tbug2go, setTbug2go] = useState('');
    const [Tsystrace, setTsystrace] = useState('');
    const [Tid, setTid] = useState('');
    const [Thw, setThw] = useState('');
    const [Tfp, setTfp] = useState('');

    const [generatedResult, setGeneratedResult] = useState('');
    const [generatedSummary, setGeneratedSummary] = useState('');
    const [copiedContent, setCopiedContent] = useState(false);
    const [copiedSummary, setCopiedSummary] = useState(false);

    const resultRef = useRef<HTMLDivElement>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();

        let deviceSetupText = "";
        if (ram === 'more4') {
            deviceSetupText = `Install the top 30 apps, import 3000 contacts (add 50 favorite contacts), 5000 text messages, 500 call records, 50 videos and 4500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`;
        } else if (ram === 'less4') {
            deviceSetupText = `Install the top 15 apps, import 1000 contacts (add 50 favorite contacts), 3000 text messages, 300 call records, 25 videos and 1500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`;
        } else {
            deviceSetupText = `N/A`;
        }

        const pOS = previousOS || `${product || "N/A"} S`;
        const tOS = targetOS || `${product || "N/A"} T`;

        const sAvgNum = parseFloat(SAVG) || 0;
        const tAvgNum = parseFloat(TAVG) || 0;

        let percentage = 0;
        if (sAvgNum !== 0) {
            percentage = Math.round(((tAvgNum / sAvgNum) * 100) - 100);
        }
        const diffValue = tAvgNum - sAvgNum;
        const diffText = diffValue > 0 ? `+${parseFloat(diffValue.toFixed(2))}` : `${parseFloat(diffValue.toFixed(2))}`;

        const textCR = `{panel:title=Reproducing the issue|titleBGColor=#e6e6ea }
*Device Setup:* ${deviceSetupText}

*App Version:* ${app || "N/A"}


*Test steps - Precondition* 

${precondition || "N/A"}

*Test Step Description* 

${testSteps || "N/A"}

*Test Results* 

${testResults || "N/A"}

{panel}


||OS version||Results (${measureType})||Average (${measureType})||
|${pOS}|${Sresults || "0"}|${sAvgNum}|
|${tOS}|${Tresults || "0"}|${tAvgNum}|

Tested ${testedapp || "N/A"}. Average (${measureType}): ${tAvgNum}. Difference is ${percentage}% (${diffText} ${measureType}) compared to ${pOS}.

*Videos*: [Drive|${Svideos || "N/A"}]



{panel:title=Target OS (${tOS})|titleBGColor=#f4b6c2}
*Build fingerprint:* ${Tfp || "N/A"}
*HW version:* ${Thw || "N/A"}
*Track ID:* ${Tid || "N/A"}
*Logs:* [Bug2gGo|${Tbug2go || "N/A"}] and [Systrace|${Tsystrace || "N/A"}]
{panel}

{panel:title=Previous OS (${pOS})|titleBGColor=#83d0c9}
*Build fingerprint:* ${Sfp || "N/A"}
*HW version:* ${Shw || "N/A"}
*Track ID:* ${Sid || "N/A"}
*Logs:* [Bug2gGo|${Sbug2go || "N/A"}] and [Systrace|${Ssystrace || "N/A"}]
{panel}


Reviewed by *KPI Team*
`;

        setGeneratedResult(textCR);
        
        // Scenario KPI Summary Generation
        let resultLabel = "Slower";
        if (percentage < 0) resultLabel = "Faster";
        if (percentage === 0) resultLabel = "Equal";
        
        let absPercentage = Math.abs(percentage);
        const summaryCR = `[Scenario KPI]${product || "N/A"} + ${tOS}: Cold Launch Tested App its ${absPercentage}% ${resultLabel} than ${product || "N/A"} + ${pOS}`;
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
                
                {/* Reproducing the issue */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Reproducing the Issue</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="col-span-1 md:col-span-2 lg:col-span-4 flex flex-wrap items-center gap-6 bg-slate-900 p-4 rounded-lg border border-slate-700">
                            <span className="text-sm font-medium text-slate-300">Device RAM:</span>
                            <label className="inline-flex items-center cursor-pointer group">
                                <input type="radio" value="less4" checked={ram === 'less4'} onChange={() => setRam('less4')} className="form-radio text-blue-500 bg-slate-800 border-slate-600" />
                                <span className="ml-2 text-sm text-slate-300">&lt;= 4GB</span>
                            </label>
                            <label className="inline-flex items-center cursor-pointer group">
                                <input type="radio" value="more4" checked={ram === 'more4'} onChange={() => setRam('more4')} className="form-radio text-blue-500 bg-slate-800 border-slate-600" />
                                <span className="ml-2 text-sm text-slate-300">&gt; 4GB</span>
                            </label>
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Product</label>
                            <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Tested App</label>
                            <input type="text" value={testedapp} onChange={(e) => setTestedapp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-slate-400 mb-1">App Version <span className="text-slate-500 text-xs">(*if applicable)</span></label>
                            <input type="text" value={app} onChange={(e) => setApp(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-1">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Measure Type</label>
                            <select value={measureType} onChange={(e) => setMeasureType(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white">
                                <option value="ms">ms</option>
                                <option value="FPS">FPS</option>
                                <option value="Janks">Janks</option>
                                <option value="MB">MB</option>
                            </select>
                        </div>

                        <div className="col-span-1 md:col-span-2 lg:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Previous OS</label>
                            <input type="text" value={previousOS} onChange={(e) => setPreviousOS(e.target.value)} placeholder="e.g. Android S" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Target OS</label>
                            <input type="text" value={targetOS} onChange={(e) => setTargetOS(e.target.value)} placeholder="e.g. Android T" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2 lg:col-span-4">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Videos</label>
                            <input type="text" value={Svideos} onChange={(e) => setSvideos(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                    </div>
                </div>

                {/* Test Information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Test Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Precondition:</label>
                            <textarea value={precondition} onChange={(e) => setPrecondition(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Test Step Description:</label>
                            <textarea value={testSteps} onChange={(e) => setTestSteps(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Test Results:</label>
                            <textarea value={testResults} onChange={(e) => setTestResults(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white resize-none"></textarea>
                        </div>
                    </div>
                </div>

                {/* OS Result Information Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Previous OS Results */}
                    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-md font-medium text-blue-400 mb-4">Result information on Previous OS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Results</label>
                                <input type="text" value={Sresults} onChange={(e) => setSresults(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Average (AVG)</label>
                                <input type="number" step="any" value={SAVG} onChange={(e) => setSAVG(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Bug2Go Link</label>
                                <input type="text" value={Sbug2go} onChange={(e) => setSbug2go(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Systrace Link</label>
                                <input type="text" value={Ssystrace} onChange={(e) => setSsystrace(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Track ID</label>
                                <input type="text" value={Sid} onChange={(e) => setSid(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">HW Version</label>
                                <input type="text" value={Shw} onChange={(e) => setShw(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Build Fingerprint</label>
                                <input type="text" value={Sfp} onChange={(e) => setSfp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                            </div>
                        </div>
                    </div>

                    {/* Target OS Results */}
                    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
                        <h3 className="text-md font-medium text-pink-400 mb-4">Result information on Target OS</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Results</label>
                                <input type="text" value={Tresults} onChange={(e) => setTresults(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Average (AVG)</label>
                                <input type="number" step="any" value={TAVG} onChange={(e) => setTAVG(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Bug2Go Link</label>
                                <input type="text" value={Tbug2go} onChange={(e) => setTbug2go(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400 mb-1">Systrace Link</label>
                                <input type="text" value={Tsystrace} onChange={(e) => setTsystrace(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Track ID</label>
                                <input type="text" value={Tid} onChange={(e) => setTid(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">HW Version</label>
                                <input type="text" value={Thw} onChange={(e) => setThw(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-400 mb-1">Build Fingerprint</label>
                                <input type="text" value={Tfp} onChange={(e) => setTfp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-700">
                    <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg transition-transform transform hover:-translate-y-0.5">
                        Generate CR Description
                    </button>
                </div>
            </form>

            <div ref={resultRef} className={`mt-8 bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 ${generatedResult ? 'block' : 'hidden'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Generated Description</h2>
                    <button onClick={() => copyToClipboard(generatedResult, false)} className={`flex items-center space-x-2 px-4 py-2 text-white text-sm font-medium rounded-md ${copiedContent ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                        {copiedContent ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedContent ? 'Copied!' : 'Copy Description'}</span>
                    </button>
                </div>
                <textarea value={generatedResult} readOnly rows={24} className="w-full bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-slate-300 font-mono text-sm resize-y mb-6"></textarea>
                
                <div className="flex justify-between items-center mb-4 border-t border-slate-700 pt-6">
                    <h2 className="text-lg font-semibold text-white">Generated Summary</h2>
                    <button onClick={() => copyToClipboard(generatedSummary, true)} className={`flex items-center space-x-2 px-4 py-2 text-white text-sm font-medium rounded-md ${copiedSummary ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                        {copiedSummary ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
                    </button>
                </div>
                <textarea value={generatedSummary} readOnly rows={2} className="w-full bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-slate-300 font-mono text-sm resize-none"></textarea>
            </div>
        </div>
    );
}
