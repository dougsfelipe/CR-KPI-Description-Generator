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
        // Collect radio box values
        const more4 = document.getElementById("more4").checked;
        const less4 = document.getElementById("less4").checked; 
        
        let deviceSetupText = "";
        if (more4) {
            deviceSetupText = `Install the top 30 apps, import 3000 contacts (add 50 favorite contacts), 5000 text messages, 500 call records, 50 videos and 4500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`;
        } else if (less4) {
            deviceSetupText = `Install the top 15 apps, import 1000 contacts (add 50 favorite contacts), 3000 text messages, 300 call records, 25 videos and 1500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`;
        } else {
            deviceSetupText = `N/A`;
        }

        // General Information
        const product = document.getElementById("product").value || "N/A";
        const testedapp = document.getElementById("testedapp").value || "N/A";
        const app = document.getElementById("app").value || "N/A";
        const Svideos = document.getElementById("Svideos").value || "N/A";
        const measureType = document.getElementById("measureType").value;
        
        // OS Names
        const previousOS = document.getElementById("previousOS").value || `${product} S`;
        const targetOS = document.getElementById("targetOS").value || `${product} T`;

        // Test information
        const precondition = document.getElementById("precondition").value || "N/A";
        const testSteps = document.getElementById("testSteps").value || "N/A";
        const testResults = document.getElementById("testResults").value || "N/A";

        // Result information on Previous OS
        const Sresults = document.getElementById("Sresults").value || "0";
        const SAVG = parseFloat(document.getElementById("SAVG").value) || 0;
        const Sbug2go = document.getElementById("Sbug2go").value || "N/A";
        const Ssystrace = document.getElementById("Ssystrace").value || "N/A";
        const Sid = document.getElementById("Sid").value || "N/A";
        const Shw = document.getElementById("Shw").value || "N/A";
        const Sfp = document.getElementById("Sfp").value || "N/A";

        // Result information on Target OS
        const Tresults = document.getElementById("Tresults").value || "0";
        const TAVG = parseFloat(document.getElementById("TAVG").value) || 0;
        const Tbug2go = document.getElementById("Tbug2go").value || "N/A";
        const Tsystrace = document.getElementById("Tsystrace").value || "N/A";
        const Tid = document.getElementById("Tid").value || "N/A";
        const Thw = document.getElementById("Thw").value || "N/A";
        const Tfp = document.getElementById("Tfp").value || "N/A";

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
