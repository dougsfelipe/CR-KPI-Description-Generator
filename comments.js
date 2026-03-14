document.addEventListener('DOMContentLoaded', () => {
    const crForm = document.getElementById('cr-form');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const resultTextarea = document.getElementById('result');

    crForm.addEventListener('submit', function (e) {
        e.preventDefault();
        generateDescription();
    });

    copyBtn.addEventListener('click', copyToClipboard);

    function generateDescription() {
        // Form inputs
        const isTable = document.getElementById('typeTable').checked;
        const buildNumber = document.getElementById('buildNumber').value.trim();
        const buildFingerprint = document.getElementById('buildFingerprint').value.trim();
        const results = document.getElementById('results').value.trim();
        const avg = document.getElementById('avg').value.trim();

        // Link inputs
        const bug2go = document.getElementById('bug2go').value.trim();
        const systrace = document.getElementById('systrace').value.trim();
        const logsScript = document.getElementById('logsScript').value.trim();
        const video = document.getElementById('video').value.trim();

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
                alert("Failed to copy comment to clipboard.");
            }
        });
    }
});
