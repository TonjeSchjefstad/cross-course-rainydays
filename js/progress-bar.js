function updateProgressBar (step) {
    const progressSteps = document.querySelectorAll(".progress-step");
    const progress = document.getElementById("progress");

    if (!progress) {
        console.error("Progress bar element not found");
        return;
    }

    if (progressSteps.length === 0) {
        console.error("No progress steps found");
        return;
    }

    if (step < 1 || step > progressSteps.length) {
        console.error("Invalid step number");
        return;
    }

    progressSteps.forEach((stepElement, index) => {
        if (index < step) {
            stepElement.classList.add("progress-step-active");
        } else {
            stepElement.classList.remove("progress-step-active");
        }
    });

    const stepPercentage = ((step - 1) / (progressSteps.length - 1)) * 100;
    progress.style.width = `${stepPercentage}%`;
}

if (document.title.toLowerCase().includes("cart")) {
    updateProgressBar(1);
}

if (document.title.toLowerCase().includes("checkout")) {
    updateProgressBar(2);
}

if (document.title.toLowerCase().includes("confirmation")) {
    updateProgressBar(3);
}
