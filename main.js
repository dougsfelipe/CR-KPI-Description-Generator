function myFunction() {
    // Get the value of the input field with id="numb"
    let x = document.getElementById("fp").value;
    let fpText = `*Build fingerprint:*${x}`

    let y = document.getElementById("hw").value;
    let hwText = `*Hw Version:*${y}`

    let tp = document.getElementById("testPlan").value;
    let tc = document.getElementById("testCase").value;

    let is = document.getElementById("initialSetup").value;
    let tsd = document.getElementById("testSteps").value;
    let er = document.getElementById("expectResults").value;

    let titleID = document.getElementById("kpiID").value;
    let avg = document.getElementById("AVG").value;
    let results = document.getElementById("results").value;
    let goal = document.getElementById("goal").value;

    let linkLogs  = document.getElementById("logs").value;
    let linkDrive = document.getElementById("videos").value;

    let fpBaseline = document.getElementById("fpBaseline").value;
    let hwBaseline = document.getElementById("hwBaseline").value;
    let avgBaseline = document.getElementById("avgBaseline").value;
    let resultsBaseline = document.getElementById("resultsBaseline").value;
    let logsBaseline  = document.getElementById("logsBaseline").value;
    let videosBaseline = document.getElementById("videosBaseline").value;

    const btnCopy = document.getElementById("copy");


    let w = document.getElementById("app").value;
    let appText = ""
    if(w!=""){
        console.log(w)
        appText = `*App Version:*${w}`
    }
 
    // If x is Not a Number or less than one or greater than 10
    
    let textCR = ` === *Reproducing the issue* === 
    ${fpText} 
    ${hwText} 
    ${appText}
    

    *Test Case:* ${tc}
    
    *Test Plan:* ${tp}
    

    ----
    

    *Initial Setup:*
    
    ${is}

    
    *Test step description:*
    
    ${tsd}

    
    *Expected Results:*
    ${er}
    

    
    ----
    

    *Results*
    

    {panel:title=${titleID}}
    Average (ms): ${avg}
    Readings (ms): ${results}
    Goal + tolerance(ms): ${goal}
    Status: {color:#FF0000}*Fail*{color}
    {panel}
    *Videos:* [drive|${linkDrive}]
    *Logs:* [Bug2Go|${linkLogs}]

    ----

    *Baseline Results on R*

    *Fingerprint:* ${fpBaseline}
    *Hw Version:* ${hwBaseline}
    *Results* ${resultsBaseline}
    *AVG:* ${avgBaseline}
    *Logs:* ${logsBaseline}
    *Video:* ${videosBaseline}
    

    Reviewed by KPI Team
    `;

    document.getElementById("result").innerHTML = textCR

    let textoCopiado = textCR
    textoCopiado.select();
        textoCopiado.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("O texto é: " + textoCopiado.value);

  }

    
  
