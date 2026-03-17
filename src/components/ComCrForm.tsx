import React, { useState, useRef } from 'react';
import { Copy, Check } from 'lucide-react';

export default function ComCrForm() {
    const [commentType, setCommentType] = useState('single');
    const [buildNumber, setBuildNumber] = useState('');
    const [buildFingerprint, setBuildFingerprint] = useState('');
    const [results, setResults] = useState('');
    const [avg, setAvg] = useState('');
    const [bug2go, setBug2go] = useState('');
    const [systrace, setSystrace] = useState('');
    const [logsScript, setLogsScript] = useState('');
    const [video, setVideo] = useState('');

    const [generatedResult, setGeneratedResult] = useState('');
    const [copiedContent, setCopiedContent] = useState(false);
    const resultRef = useRef<HTMLDivElement>(null);

    const handleGenerate = (e: React.FormEvent) => {
        e.preventDefault();

        const isTable = commentType === 'table';

        let logsLinks = [];
        if (bug2go) logsLinks.push(`[Bug2Go|${bug2go}]`);
        if (systrace) logsLinks.push(`[Systrace|${systrace}]`);
        if (logsScript) logsLinks.push(`[Logs from Script|${logsScript}]`);

        let logsString = logsLinks.length > 0 ? logsLinks.join(', ') : "N/A";
        let videoStr = video ? `[Video|${video}]` : "N/A";

        let finalOutput = "";

        if (isTable) {
            finalOutput = `||Build Number||Results||AVG||Video||Logs||
|${buildNumber}|${results}|${avg}|${videoStr}|${logsString}|

{color:red}*To avoid multiple comments, if the issue is still reproducible, please add the results to this table.*{/color}`;
        } else {
            let singleLogsStr = logsLinks.length > 0 ? `\n*Logs:* ${logsString}` : "";
            let singleVideoStr = video ? `\n*Video:* ${videoStr}` : "";

            finalOutput = `Hi all, this issue is *still reproducible* in ${buildNumber} build, here are the results.

*Build Fingerprint:* ${buildFingerprint}
*Results:* ${results}
*AVG:* ${avg}${singleLogsStr}${singleVideoStr}`;
        }

        setGeneratedResult(finalOutput);

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
                
                {/* Comment Configuration */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Comment Type</h2>
                    <div className="flex flex-wrap items-center gap-6 bg-slate-900 p-4 rounded-lg border border-slate-700">
                        <span className="text-sm font-medium text-slate-300">Format:</span>
                        <label className="inline-flex items-center cursor-pointer group">
                            <input type="radio" value="single" checked={commentType === 'single'} onChange={() => setCommentType('single')} className="form-radio text-blue-500 bg-slate-800 border-slate-600" />
                            <span className="ml-2 text-sm text-slate-300">Single Comment</span>
                        </label>
                        <label className="inline-flex items-center cursor-pointer group">
                            <input type="radio" value="table" checked={commentType === 'table'} onChange={() => setCommentType('table')} className="form-radio text-blue-500 bg-slate-800 border-slate-600" />
                            <span className="ml-2 text-sm text-slate-300">Table</span>
                        </label>
                    </div>
                </div>

                {/* Build & Results Data */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Build & Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Build Number</label>
                            <input type="text" value={buildNumber} onChange={(e) => setBuildNumber(e.target.value)} placeholder="e.g. S3TC32.4" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Build Fingerprint</label>
                            <input type="text" value={buildFingerprint} onChange={(e) => setBuildFingerprint(e.target.value)} placeholder="e.g. motorola/..." className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Results</label>
                            <input type="text" value={results} onChange={(e) => setResults(e.target.value)} placeholder="e.g. 154, 155, 149" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-slate-400 mb-1">Average (AVG)</label>
                            <input type="text" value={avg} onChange={(e) => setAvg(e.target.value)} placeholder="e.g. 152.6" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" required />
                        </div>
                    </div>
                </div>

                {/* Evidence Links */}
                <div>
                    <h2 className="text-lg font-semibold text-white border-b border-slate-700 pb-2 mb-4">Evidence Links</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Bug2Go</label>
                            <input type="text" value={bug2go} onChange={(e) => setBug2go(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Systrace</label>
                            <input type="text" value={systrace} onChange={(e) => setSystrace(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Logs from Script</label>
                            <input type="text" value={logsScript} onChange={(e) => setLogsScript(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400 mb-1">Video</label>
                            <input type="text" value={video} onChange={(e) => setVideo(e.target.value)} placeholder="optional" className="w-full bg-slate-900 border border-slate-700 rounded-md py-2 px-3 text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-700">
                    <button type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-lg transition-transform transform hover:-translate-y-0.5">
                        Generate CR Comment
                    </button>
                </div>
            </form>

            <div ref={resultRef} className={`mt-8 bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 ${generatedResult ? 'block' : 'hidden'}`}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-white">Generated Comment</h2>
                    <button onClick={copyToClipboard} className={`flex items-center space-x-2 px-4 py-2 text-white text-sm font-medium rounded-md ${copiedContent ? 'bg-green-600' : 'bg-slate-700 hover:bg-slate-600'}`}>
                        {copiedContent ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedContent ? 'Copied!' : 'Copy Comment'}</span>
                    </button>
                </div>
                <textarea value={generatedResult} readOnly rows={12} className="w-full bg-slate-900 border border-slate-600 rounded-md py-3 px-4 text-slate-300 font-mono text-sm resize-y"></textarea>
            </div>
        </div>
    );
}
