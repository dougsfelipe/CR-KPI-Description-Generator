function myFunction() {
    // Get the value of the input field with id="numb"
    let more4 = document.getElementById("more4").checked;
    let less4 = document.getElementById("less4").checked; 

    console.log(more4);
    let text = ""
    if(more4) {
         text= `Install the top 30 apps, import 3000 contacts (add 50 favorite contacts), 5000 text messages, 500 call records, 50 videos and 4500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`
    } else if(less4){
         text= `Install the top 15 apps, import 1000 contacts (add 50 favorite contacts), 3000 text messages, 300 call records, 25 videos and 1500 pictures. [Device Setup here|https://docs.google.com/spreadsheets/d/1ou7gybNGn7lZ1Osk--mzMbPaU__qAv9hFs1JHpvbY1I/edit?pli=1#gid=1282504372].`
    }


    
    // Reproducing the issue
    let testedapp = document.getElementById("testedapp").value;
    let app = document.getElementById("app").value;
    let product = document.getElementById("product").value;

    // Test information

    let precondition = document.getElementById("precondition").value;
    let testSteps = document.getElementById("testSteps").value;
    let testResults = document.getElementById("testResults").value;

    // Result information on Android S

    let Sresults = document.getElementById("Sresults").value;
    let SAVG = document.getElementById("SAVG").value;
    let Sbug2go = document.getElementById("Sbug2go").value;
    let Ssystrace = document.getElementById("Ssystrace").value;
    let Svideos = document.getElementById("Svideos").value;
    let Sid = document.getElementById("Sid").value;
    let Shw = document.getElementById("Shw").value;
    let Sfp = document.getElementById("Sfp").value;

    // Result information on Android T

    let Tresults = document.getElementById("Tresults").value;
    let TAVG = document.getElementById("TAVG").value;
    let Tbug2go = document.getElementById("Tbug2go").value;
    let Tsystrace = document.getElementById("Tsystrace").value;
    let Tid = document.getElementById("Tid").value;
    let Thw = document.getElementById("Thw").value;
    let Tfp = document.getElementById("Tfp").value;

    let percetage = Math.round(((TAVG/SAVG)*100)-100);
    let ms = TAVG - SAVG;

    
    if(app!=""){
        console.log(app)
        appText = app
    }
 
    // If x is Not a Number or less than one or greater than 10
    
    
    let textCR = `{panel:title=Reproducing the issue|titleBGColor=#e6e6ea }
    *Device Setup:* ${text}

    *App Version:* ${appText}
    

    *Test steps - Precondition* 

    ${precondition}

    *Test Step Description* 

    ${testSteps}

    *Test Results* 

    ${testResults}
    
    {panel}

    
    ||OS version||Time results (ms)||Average results (ms)||
    |${product} S|${Sresults}|${SAVG}|
    |${product} T|${Tresults}|${TAVG}|

    Cold launch ${testedapp} is slower ${percetage}%(${ms}) than ${product} S

    *Videos*: [Drive|${Svideos}]

    

    {panel:title=Android T|titleBGColor=#f4b6c2}
    *Build fingerprint:* ${Tfp}
    *HW version:* ${Thw}
    *Track ID:* ${Tid}
    *Logs:* [Bug2gGo|${Tbug2go}] and [Systrace|${Tsystrace}]
    {panel}
    
    {panel:title=Android S|titleBGColor=#83d0c9}
    *Build fingerprint:* ${Sfp}
    *HW version:* ${Shw}
    *Track ID:* ${Sid}
    *Logs:* [Bug2gGo|${Sbug2go}] and [Systrace|${Ssystrace}]
    {panel}

    
    Reviewed by *KPI Team*
    `;

    document.getElementById("result").innerHTML = textCR

    let textoCopiado = textCR
    textoCopiado.select();
        textoCopiado.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("O texto é: " + textoCopiado.value);

  }

    
  
