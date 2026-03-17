import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ObservationCrForm() {
    const [fp, setFp] = useState('');
    const [hw, setHw] = useState('');
    const [app, setApp] = useState('');
    
    const [testSteps, setTestSteps] = useState('');
    const [actualResults, setActualResults] = useState('');
    const [expectResults, setExpectResults] = useState('');

    const [logs, setLogs] = useState('');
    const [video, setVideo] = useState('');
    const [information, setInformation] = useState('');

    const [generatedResult, setGeneratedResult] = useState('');
    const [copiedContent, setCopiedContent] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();

        let appText = app ? `*App Version:* ${app}` : "";
        let videoText = video ? `*Video:* ${video}` : "";

        let textCR = `{panel:title=Reproducing the issue|titleBGColor=#e6e6ea }
    
*Build fingerprint:* ${fp || "N/A"}
*HW version:* ${hw || "N/A"}
${appText}


{panel}

----

*Steps to reproduce* 

${testSteps || "N/A"}

*Test Step Description* 

${testSteps || "N/A"}

*Actual result* 

${actualResults || "N/A"}

*Expected Result* 

${expectResults || "N/A"}


*Reproducibility rate:* (5/5) - 100%

*Logs:* ${logs || "N/A"}
${videoText}

----

*Additional information:*
* ${information || "N/A"}


Reviewed by *KPI Team*
`;

        setGeneratedResult(textCR);
        
        setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    };

    const copyToClipboard = () => {
        if (!generatedResult) return;
        navigator.clipboard.writeText(generatedResult).then(() => {
            setCopiedContent(true);
            setTimeout(() => setCopiedContent(false), 2000);
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
                            <input type="text" value={fp} onChange={(e) => setFp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">HW Version</label>
                            <input type="text" value={hw} onChange={(e) => setHw(e.target.value)} placeholder="PVT" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">App Version <span className="text-slate-500 text-xs">(*if applicable)</span></label>
                            <input type="text" value={app} onChange={(e) => setApp(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                    </div>
                </div>

                {/* Test Information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Test Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Steps to Reproduce</label>
                            <textarea value={testSteps} onChange={(e) => setTestSteps(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Actual Result</label>
                            <textarea value={actualResults} onChange={(e) => setActualResults(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white resize-none"></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Expected Result</label>
                            <textarea value={expectResults} onChange={(e) => setExpectResults(e.target.value)} rows={4} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white resize-none"></textarea>
                        </div>
                    </div>
                </div>

                {/* Result Information */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Result Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Logs (Bug2Go / etc.)</label>
                            <input type="text" value={logs} onChange={(e) => setLogs(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Videos</label>
                            <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Additional Information</label>
                            <input type="text" value={information} onChange={(e) => setInformation(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
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
                    <button onClick={copyToClipboard} className={`flex items-center space-x-2 px-4 py-2 text-white text-sm font-medium rounded-md ${copiedContent ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                        {copiedContent ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedContent ? 'Copied!' : 'Copy Description'}</span>
                    </button>
                </div>
                <textarea value={generatedResult} readOnly rows={24} className="w-full bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-slate-300 font-mono text-sm resize-y mb-6"></textarea>
            </div>
        </div>
    );
}
