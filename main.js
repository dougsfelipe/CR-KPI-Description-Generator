document.addEventListener('DOMContentLoaded', () => {
    const crForm = document.getElementById('cr-form');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const resultTextarea = document.getElementById('result');

    const measureTypeSelect = document.getElementById('measureType');
    const systraceLabel = document.querySelector('label[for="Systrace"]');
    const systraceBaselineLabel = document.querySelector('label[for="systraceBaseline"]');

    if (measureTypeSelect) {
        measureTypeSelect.addEventListener('change', (e) => {
            if (e.target.value === 'MB') {
                systraceLabel.innerText = "Logs from Script";
                systraceBaselineLabel.innerText = "Logs from Script";
            } else {
                systraceLabel.innerText = "Systrace";
                systraceBaselineLabel.innerText = "Systrace";
            }
        });
    }

    crForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateDescription();
    });

    copyBtn.addEventListener('click', copyToClipboard);

    function generateDescription() {
        let x = document.getElementById("fp").value || "N/A";
        let fpText = `*Build fingerprint:* ${x}`;

        let y = document.getElementById("hw").value || "N/A";
        let hwText = `*Hw Version:* ${y}`;

        let tp = document.getElementById("testPlan").value || "N/A";
        let tc = document.getElementById("testCase").value || "N/A";

        let is = document.getElementById("initialSetup").value || "N/A";
        let tsd = document.getElementById("testSteps").value || "N/A";
        let er = document.getElementById("expectResults").value || "N/A";

        let titleID = document.getElementById("kpiID").value || "KPI Component";
        let avg = document.getElementById("AVG").value || "0";
        let results = document.getElementById("results").value || "0";
        let goal = document.getElementById("goal").value || "0";

        let linkLogs = document.getElementById("logs").value.trim();
        let linkSystrace = document.getElementById("Systrace").value.trim();
        let linkDrive = document.getElementById("videos").value.trim();

        let fpBaseline = document.getElementById("fpBaseline").value || "N/A";
        let hwBaseline = document.getElementById("hwBaseline").value || "N/A";
        let avgBaseline = document.getElementById("avgBaseline").value || "0";
        let resultsBaseline = document.getElementById("resultsBaseline").value || "0";
        let logsBaseline = document.getElementById("logsBaseline").value.trim();
        let systraceBaseline = document.getElementById("systraceBaseline").value.trim();
        let videosBaseline = document.getElementById("videosBaseline").value.trim();

        let w = document.getElementById("app").value;
        let appText = "";
        if(w !== "") {
            appText = `*App Version:* ${w}`;
        }
        
        const measureType = document.getElementById("measureType").value;
        const previousOS = document.getElementById("previousOS").value || "Previous OS";
        const targetOS = document.getElementById("targetOS").value || "Target OS";
        
        let currentSystraceName = measureType === 'MB' ? "Logs from Script" : "Systrace";
        
        let targetVideosStr = linkDrive ? `\n*Videos:* [drive|${linkDrive}]` : "";
        let targetLogsLinks = [];
        if (linkLogs) targetLogsLinks.push(`[Bug2Go|${linkLogs}]`);
        if (linkSystrace) targetLogsLinks.push(`[${currentSystraceName}|${linkSystrace}]`);
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


*Test Case:* ${tc}
*Test Plan:* ${tp}

{panel}

{panel:title=Test Case Description|titleBGColor=#d2d4dc}

*Initial Setup:*

${is}

*Test step description:*

${tsd}


*Expected Results:*
${er}

{panel}


{panel:title=${titleID} - Target OS (${targetOS})|titleBGColor=#f4b6c2}
*Average (${measureType}):* ${avg}
*Readings (${measureType}):* ${results}
*Goal + tolerance (${measureType}):* ${goal}
Status: {color:#FF0000}*Fail*{color}${targetVideosStr}${targetLogsStr}
{panel}

{panel:title=Baseline Results on Previous OS (${previousOS})|titleBGColor=#83d0c9}
*Fingerprint:* ${fpBaseline}
*Hw Version:* ${hwBaseline}
*Results (${measureType}):* ${resultsBaseline}
*AVG (${measureType}):* ${avgBaseline}${baselineLogsStr}${baselineVideosStr}
{panel}


Reviewed by *KPI Team*
`;

        // Output to text area
        resultTextarea.value = textCR;
        resultSection.classList.remove('hidden');
        
        // Optional smooth scroll to result
        setTimeout(() => {
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }, 100);
    }

    function copyToClipboard() {
        if (!resultTextarea.value) return;
        
        // Copy using Clipboard API
        navigator.clipboard.writeText(resultTextarea.value).then(() => {
            // Visual feedback
            const copyText = document.getElementById('copy-text');
            const originalText = copyText.innerText;
            
            copyText.innerText = "Copied!";
            copyBtn.classList.remove('bg-slate-700', 'hover:bg-slate-600');
            copyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
            
            setTimeout(() => {
                copyText.innerText = originalText;
                copyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                copyBtn.classList.add('bg-slate-700', 'hover:bg-slate-600');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            
            // Fallback for older browsers
            resultTextarea.select();
            resultTextarea.setSelectionRange(0, 99999);
            try {
                document.execCommand("copy");
                const copyText = document.getElementById('copy-text');
                const originalText = copyText.innerText;
                
                copyText.innerText = "Copied!";
                copyBtn.classList.remove('bg-slate-700', 'hover:bg-slate-600');
                copyBtn.classList.add('bg-green-600', 'hover:bg-green-700');
                
                setTimeout(() => {
                    copyText.innerText = originalText;
                    copyBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
                    copyBtn.classList.add('bg-slate-700', 'hover:bg-slate-600');
                }, 2000);
            } catch (ex) {
                alert("Failed to copy description to clipboard.");
            }
        });
    }
});
