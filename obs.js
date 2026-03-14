document.addEventListener('DOMContentLoaded', () => {
    const crForm = document.getElementById('cr-form');
    const copyBtn = document.getElementById('copy-btn');
    const resultSection = document.getElementById('result-section');
    const resultTextarea = document.getElementById('result');

    crForm.addEventListener('submit', function(e) {
        e.preventDefault();
        generateDescription();
    });

    copyBtn.addEventListener('click', copyToClipboard);

    function generateDescription() {
        // Device Information
        let fp = document.getElementById("fp").value || "N/A";
        let app = document.getElementById("app").value;
        let hw = document.getElementById("hw").value || "N/A";

        // Test information
        let actualResults = document.getElementById("actualResults").value || "N/A";
        let testSteps = document.getElementById("testSteps").value || "N/A";
        let expectResults = document.getElementById("expectResults").value || "N/A";

        // Result information
        let logs = document.getElementById("logs").value || "N/A";
        let video = document.getElementById("video").value;
        let information = document.getElementById("information").value || "N/A";
        
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
