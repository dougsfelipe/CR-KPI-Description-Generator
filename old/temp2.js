
document.addEventListener('DOMContentLoaded', () => {
// --- KPI LOGIC ---
(function() {

    const crForm = document.getElementById('kpi_cr-form');
    const copyBtn = document.getElementById('kpi_copy-btn');
    const resultSection = document.getElementById('kpi_result-section');
    const resultTextarea = document.getElementById('kpi_result');

    const measureTypeSelect = document.getElementById('kpi_measureType');
    const systraceLabel = document.querySelector('label[for="kpi_Systrace"]');
    const systraceBaselineLabel = document.querySelector('label[for="kpi_systraceBaseline"]');

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
        let x = document.getElementById("kpi_fp").value || "N/A";
        let fpText = `*Build fingerprint:* ${x}`;

        let y = document.getElementById("kpi_hw").value || "N/A";
        let hwText = `*Hw Version:* ${y}`;

        let tp = document.getElementById("kpi_testPlan").value || "N/A";
        let tc = document.getElementById("kpi_testCase").value || "N/A";

        let is = document.getElementById("kpi_initialSetup").value || "N/A";
        let tsd = document.getElementById("kpi_testSteps").value || "N/A";
        let er = document.getElementById("kpi_expectResults").value || "N/A";

        let titleID = document.getElementById("kpi_kpiID").value || "KPI Component";
        let avg = document.getElementById("kpi_AVG").value || "0";
        let results = document.getElementById("kpi_results").value || "0";
        let goal = document.getElementById("kpi_goal").value || "0";

        let linkLogs = document.getElementById("kpi_logs").value.trim();
        let linkSystrace = document.getElementById("kpi_Systrace").value.trim();
        let linkDrive = document.getElementById("kpi_videos").value.trim();

        let fpBaseline = document.getElementById("kpi_fpBaseline").value || "N/A";
        let hwBaseline = document.getElementById("kpi_hwBaseline").value || "N/A";
        let avgBaseline = document.getElementById("kpi_avgBaseline").value || "0";
        let resultsBaseline = document.getElementById("kpi_resultsBaseline").value || "0";
        let logsBaseline = document.getElementById("kpi_logsBaseline").value.trim();
        let systraceBaseline = document.getElementById("kpi_systraceBaseline").value.trim();
        let videosBaseline = document.getElementById("kpi_videosBaseline").value.trim();

        let w = document.getElementById("kpi_app").value;
        let appText = "";
        if(w !== "") {
            appText = `*App Version:* ${w}`;
        }
        
        const measureType = document.getElementById("kpi_measureType").value;
        const previousOS = document.getElementById("kpi_previousOS").value || "Previous OS";
        const targetOS = document.getElementById("kpi_targetOS").value || "Target OS";
        
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
            const copyText = document.getElementById('kpi_copy-text');
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
                const copyText = document.getElementById('kpi_copy-text');
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

})();

// --- UX LOGIC ---
(function() {

    const crForm = document.getElementById('ux_cr-form');
    const copyBtn = document.getElementById('ux_copy-btn');
    const resultSection = document.getElementById('ux_result-section');
    const resultTextarea = document.getElementById('ux_result');

    crForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateDescription();
    });

    copyBtn.addEventListener('click', copyToClipboard);

    function generateDescription() {
        // Collect radio box values
        const more4 = document.getElementById("ux_more4").checked;
        const less4 = document.getElementById("ux_less4").checked; 
        
        let deviceSetupText = "";
        if (more4) {
            deviceSetupText = `Install the top 30 apps, import 3000 contacts (add 50 favorite contacts), 5000 text messages, 500 call records, 50 videos and 4500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`;
        } else if (less4) {
            deviceSetupText = `Install the top 15 apps, import 1000 contacts (add 50 favorite contacts), 3000 text messages, 300 call records, 25 videos and 1500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`;
        } else {
            deviceSetupText = `N/A`;
        }

        // General Information
        const product = document.getElementById("ux_product").value || "N/A";
        const testedapp = document.getElementById("ux_testedapp").value || "N/A";
        const app = document.getElementById("ux_app").value || "N/A";
        const Svideos = document.getElementById("ux_Svideos").value || "N/A";
        const measureType = document.getElementById("ux_measureType").value;
        
        // OS Names
        const previousOS = document.getElementById("ux_previousOS").value || `${product} S`;
        const targetOS = document.getElementById("ux_targetOS").value || `${product} T`;

        // Test information
        const precondition = document.getElementById("ux_precondition").value || "N/A";
        const testSteps = document.getElementById("ux_testSteps").value || "N/A";
        const testResults = document.getElementById("ux_testResults").value || "N/A";

        // Result information on Previous OS
        const Sresults = document.getElementById("ux_Sresults").value || "0";
        const SAVG = parseFloat(document.getElementById("ux_SAVG").value) || 0;
        const Sbug2go = document.getElementById("ux_Sbug2go").value || "N/A";
        const Ssystrace = document.getElementById("ux_Ssystrace").value || "N/A";
        const Sid = document.getElementById("ux_Sid").value || "N/A";
        const Shw = document.getElementById("ux_Shw").value || "N/A";
        const Sfp = document.getElementById("ux_Sfp").value || "N/A";

        // Result information on Target OS
        const Tresults = document.getElementById("ux_Tresults").value || "0";
        const TAVG = parseFloat(document.getElementById("ux_TAVG").value) || 0;
        const Tbug2go = document.getElementById("ux_Tbug2go").value || "N/A";
        const Tsystrace = document.getElementById("ux_Tsystrace").value || "N/A";
        const Tid = document.getElementById("ux_Tid").value || "N/A";
        const Thw = document.getElementById("ux_Thw").value || "N/A";
        const Tfp = document.getElementById("ux_Tfp").value || "N/A";

        // Calculate differences
        let percentage = 0;
        if (SAVG !== 0) {
            percentage = Math.round(((TAVG / SAVG) * 100) - 100);
        }
        const diffValue = TAVG - SAVG;
        const diffText = diffValue > 0 ? `+${parseFloat(diffValue.toFixed(2))}` : `${parseFloat(diffValue.toFixed(2))}`;

        // Formatting the CR text
        const textCR = `{panel:title=Reproducing the issue|titleBGColor=#e6e6ea }
*Device Setup:* ${deviceSetupText}

*App Version:* ${app}


*Test steps - Precondition* 

${precondition}

*Test Step Description* 

${testSteps}

*Test Results* 

${testResults}

{panel}


||OS version||Results (${measureType})||Average (${measureType})||
|${previousOS}|${Sresults}|${SAVG}|
|${targetOS}|${Tresults}|${TAVG}|

Tested ${testedapp}. Average (${measureType}): ${TAVG}. Difference is ${percentage}% (${diffText} ${measureType}) compared to ${previousOS}.

*Videos*: [Drive|${Svideos}]



{panel:title=Target OS (${targetOS})|titleBGColor=#f4b6c2}
*Build fingerprint:* ${Tfp}
*HW version:* ${Thw}
*Track ID:* ${Tid}
*Logs:* [Bug2gGo|${Tbug2go}] and [Systrace|${Tsystrace}]
{panel}

{panel:title=Previous OS (${previousOS})|titleBGColor=#83d0c9}
*Build fingerprint:* ${Sfp}
*HW version:* ${Shw}
*Track ID:* ${Sid}
*Logs:* [Bug2gGo|${Sbug2go}] and [Systrace|${Ssystrace}]
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
            const copyText = document.getElementById('ux_copy-text');
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
                const copyText = document.getElementById('ux_copy-text');
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

})();

// --- OBS LOGIC ---
(function() {

    const crForm = document.getElementById('obs_cr-form');
    const copyBtn = document.getElementById('obs_copy-btn');
    const resultSection = document.getElementById('obs_result-section');
    const resultTextarea = document.getElementById('obs_result');

    crForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateDescription();
    });

    copyBtn.addEventListener('click', copyToClipboard);

    function generateDescription() {
        // Device Information
        let fp = document.getElementById("obs_fp").value || "N/A";
        let app = document.getElementById("obs_app").value;
        let hw = document.getElementById("obs_hw").value || "N/A";

        // Test information
        let actualResults = document.getElementById("obs_actualResults").value || "N/A";
        let testSteps = document.getElementById("obs_testSteps").value || "N/A";
        let expectResults = document.getElementById("obs_expectResults").value || "N/A";

        // Result information
        let logs = document.getElementById("obs_logs").value || "N/A";
        let video = document.getElementById("obs_video").value;
        let information = document.getElementById("obs_information").value || "N/A";
        
        let appText = "";
        let videoText = "";
        
        if(app !== "") {
            appText = `*App Version:* ${app}`;
        }
    
        if(video !== "") {
            videoText = `*Video:* ${video}`;
        }
        
        // Formatting the CR text
        let textCR = `{panel:title=Reproducing the issue|titleBGColor=#e6e6ea }
    
*Build fingerprint:* ${fp}
*HW version:* ${hw}
${appText}


{panel}

----

*Steps to reproduce* 

${testSteps}

*Test Step Description* 

${testSteps}

*Actual result* 

${actualResults}

*Expected Result* 

${expectResults}


*Reproducibility rate:* (5/5) - 100%

*Logs:* ${logs}
${videoText}

----

*Additional information:*
* ${information}


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
            const copyText = document.getElementById('obs_copy-text');
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
                const copyText = document.getElementById('obs_copy-text');
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

})();

// --- COM LOGIC ---
(function() {

    const crForm = document.getElementById('com_cr-form');
    const copyBtn = document.getElementById('com_copy-btn');
    const resultSection = document.getElementById('com_result-section');
    const resultTextarea = document.getElementById('com_result');

    crForm.addEventListener('submit', function (e) {
        e.preventDefault();
        generateDescription();
    });

    copyBtn.addEventListener('click', copyToClipboard);

    function generateDescription() {
        // Form inputs
        const isTable = document.getElementById('com_typeTable').checked;
        const buildNumber = document.getElementById('com_buildNumber').value.trim();
        const buildFingerprint = document.getElementById('com_buildFingerprint').value.trim();
        const results = document.getElementById('com_results').value.trim();
        const avg = document.getElementById('com_avg').value.trim();

        // Link inputs
        const bug2go = document.getElementById('com_bug2go').value.trim();
        const systrace = document.getElementById('com_systrace').value.trim();
        const logsScript = document.getElementById('com_logsScript').value.trim();
        const video = document.getElementById('com_video').value.trim();

        // Process Links
        let logsLinks = [];
        if (bug2go) logsLinks.push(`[Bug2Go|${bug2go}]`);
        if (systrace) logsLinks.push(`[Systrace|${systrace}]`);
        if (logsScript) logsLinks.push(`[Logs from Script|${logsScript}]`);

        let logsString = logsLinks.length > 0 ? logsLinks.join(', ') : "N/A";
        let videoStr = video ? `[Video|${video}]` : "N/A";

        let finalOutput = "";

        if (isTable) {
            // Table formatting
            finalOutput = `||Build Number||Results||AVG||Video||Logs||
|${buildNumber}|${results}|${avg}|${videoStr}|${logsString}|

{color:red}*To avoid multiple comments, if the issue is still reproducible, please add the results to this table.*{/color}`;
        } else {
            // Single formatting
            let singleLogsStr = logsLinks.length > 0 ? `\n*Logs:* ${logsString}` : "";
            let singleVideoStr = video ? `\n*Video:* ${videoStr}` : "";

            finalOutput = `Hi all, this issue is *still reproducible* in ${buildNumber} build, here are the results.

*Build Fingerprint:* ${buildFingerprint}
*Results:* ${results}
*AVG:* ${avg}${singleLogsStr}${singleVideoStr}`;
        }

        // Output to text area
        resultTextarea.value = finalOutput;
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
            const copyText = document.getElementById('com_copy-text');
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
                const copyText = document.getElementById('com_copy-text');
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
                alert("Failed to copy comment to clipboard.");
            }
        });
    }

})();


    // Tab switching logic
    const tabs = document.querySelectorAll('.tab-btn');
    const views = document.querySelectorAll('.spa-view');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            // Remove active classes
            tabs.forEach(t => {
                t.classList.remove('text-white', 'bg-blue-600', 'shadow', 'border-blue-500', 'hover:bg-blue-700');
                t.classList.add('text-slate-400', 'border-slate-700', 'hover:bg-slate-800', 'hover:text-white');
            });
            
            // Add active classes to clicked
            tab.classList.remove('text-slate-400', 'border-slate-700', 'hover:bg-slate-800', 'hover:text-white');
            tab.classList.add('text-white', 'bg-blue-600', 'shadow', 'border-blue-500', 'hover:bg-blue-700');
            
            // Hide all views
            views.forEach(v => v.style.display = 'none');
            
            // Show target view
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).style.display = 'block';
        });
    });
});

