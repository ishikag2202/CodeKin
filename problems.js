a=document.getElementsByClassName("problem")
updateRowColors();
function updateRowColors() {
    arr=[];
    b=document.getElementsByClassName("problem");
    var ct=0;
    for(var i=1;i<b.length;i++){
        if(b[i].style.display=="none"){
            continue;
        }
        else{
            if(ct%2==0){
                b[i].style.backgroundColor="#1a0b2e";
            }
            else{
                b[i].style.backgroundColor="#ba51e0";
            }
            ct++;
        }
    }
}
for(var i=1;i<a.length;i++){
    b=a[i].getElementsByTagName("span");
    if(b[2].innerText=="Easy"){
        b[2].style.color="#389754";
    }
    else if(b[2].innerText=="Medium"){
        b[2].style.color="yellow";
    }
    if(b[2].innerText=="Hard"){
        b[2].style.color="red";
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Get references to all select elements and input field
    let tagFilter = document.getElementById("Tag");
    let difficultyFilter = document.getElementById("Difficulty");
    let statusFilter = document.getElementById("Status");
    let searchInput = document.getElementById("text");

    // Get all problem elements
    let problems = document.querySelectorAll(".problem:not(.p0)");
    console.log(problems);

    function filterProblems() {
        let selectedTag = tagFilter.value;
        let selectedDifficulty = difficultyFilter.value;
        let selectedStatus = statusFilter.value;
        let searchQuery = searchInput.value.toLowerCase().trim();

        problems.forEach(problem => {
            // if (problem.classList.contains("p1")) return; // Skip the table header row

            let title = problem.children[1].innerText.toLowerCase();
            let difficulty = problem.children[2].innerText;
            let category = problem.children[3].innerText;

            let tagMatch = selectedTag === "Choose" || category === selectedTag;
            let difficultyMatch = selectedDifficulty === "Choose" || difficulty === selectedDifficulty;
            let statusMatch = selectedStatus === "Choose" || selectedStatus === problem.children[0].innerText;
            let searchMatch = searchQuery === "" || title.includes(searchQuery);

            // If all conditions match, show; otherwise, hide
            if (tagMatch && difficultyMatch && statusMatch && searchMatch) {
                problem.style.display = "";
            } else {
                problem.style.display = "none";
            }
        });
        updateRowColors();
    }

    // Attach event listeners to filters
    tagFilter.addEventListener("change", filterProblems);
    difficultyFilter.addEventListener("change", filterProblems);
    statusFilter.addEventListener("change", filterProblems);
    searchInput.addEventListener("input", filterProblems);
});
