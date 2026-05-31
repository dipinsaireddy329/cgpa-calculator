function generateInputs(){

    let count =
    document.getElementById(
        "semesterCount"
    ).value;

    let container =
    document.getElementById(
        "semesterInputs"
    );

    container.innerHTML = "";

    for(let i=1;i<=count;i++){

        container.innerHTML += `
        <input
            type="number"
            id="sem${i}"
            class="semester-input"
            placeholder="Enter SGPA for Semester ${i}"
            step="0.01"
            min="0"
            max="10"
        >
        `;
    }
}

function calculateCGPA(){

    let count =
    parseInt(
    document.getElementById(
    "semesterCount"
    ).value);

    if(!count){
        alert(
        "Select number of semesters"
        );
        return;
    }

    let total = 0;

    for(let i=1;i<=count;i++){

        let sgpa =
        parseFloat(
        document.getElementById(
        `sem${i}`
        ).value);

        if(isNaN(sgpa)){
            alert(
            `Enter SGPA for Semester ${i}`
            );
            return;
        }

        total += sgpa;
    }

    let cgpa = total/count;

    document.getElementById(
    "cgpaResult"
    ).innerText =
    "CGPA: " +
    cgpa.toFixed(2);

    let percent =
    (cgpa/10)*100;

    document.getElementById(
    "progressBar"
    ).style.width =
    percent + "%";

    let grade = "";

    if(cgpa >= 9){
        grade =
        "🏆 Excellent";
    }
    else if(cgpa >= 8){
        grade =
        "🥇 Very Good";
    }
    else if(cgpa >= 7){
        grade =
        "🥈 Good";
    }
    else{
        grade =
        "📚 Needs Improvement";
    }

    document.getElementById(
    "gradeResult"
    ).innerText =
    grade;

    localStorage.setItem(
    "cgpa",
    cgpa.toFixed(2)
    );
}

function calculateRequiredSGPA(){

    let target =
    parseFloat(
    document.getElementById(
    "targetCGPA"
    ).value
    );

    let count =
    parseInt(
    document.getElementById(
    "semesterCount"
    ).value
    );

    if(!target || !count){

        alert(
        "Calculate CGPA first"
        );

        return;
    }

    let currentTotal = 0;

    for(let i=1;i<=count;i++){

        let sgpa =
        parseFloat(
        document.getElementById(
        `sem${i}`
        ).value
        );

        if(!isNaN(sgpa)){
            currentTotal += sgpa;
        }
    }

    let totalSemesters = 8;

    let remaining =
    totalSemesters - count;

    if(remaining <= 0){

        document.getElementById(
        "targetResult"
        ).innerText =
        "All semesters completed.";

        return;
    }

    let required =

    ((target * totalSemesters)
    - currentTotal)

    / remaining;

    document.getElementById(
    "targetResult"
    ).innerText =

    `Required Average SGPA in remaining ${remaining} semesters: ${required.toFixed(2)}`;
}