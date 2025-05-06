function myFunction() {

    
    // Devide Information
    let fp = document.getElementById("fp").value;
    let app = document.getElementById("app").value;
    let hw = document.getElementById("hw").value;

    // Test information

    let actualResults = document.getElementById("actualResults").value;
    let testSteps = document.getElementById("testSteps").value;
    let expectResults = document.getElementById("expectResults").value;

    // Result information

    let logs = document.getElementById("logs").value;
    let video = document.getElementById("video").value;
    let information = document.getElementById("information").value;
    
    let appText = ""
    let videoText = ""
    if(app!=""){
        console.log(app)
        appText =  `*App Version:* ${app}`
    }
 
    if(video!=""){
        console.log(video)
        videoText =  `*Video:* ${video}`
    }
 

    // If x is Not a Number or less than one or greater than 10
    
    
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
    

    *Reproducibility rate:* (5/5) - 100%

    *Logs:*   ${logs}
    ${videoText}

    ----
    
    *Additional information:*
    * ${information}

    
    Reviewed by *KPI Team*
    `;

    document.getElementById("result").innerHTML = textCR

    let textoCopiado = textCR
    textoCopiado.select();
        textoCopiado.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("O texto é: " + textoCopiado.value);

  }

    
  
