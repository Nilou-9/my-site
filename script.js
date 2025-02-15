document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".btn-img");

    buttons.forEach(button => {
        button.addEventListener("mouseover", () => {
            button.style.transform = "scale(1.1)";
        });

        button.addEventListener("mouseout", () => {
            button.style.transform = "scale(1)";
        });

        button.addEventListener("click", (e) => {
            e.preventDefault();
            const link = button.parentElement.getAttribute("href");
            window.open(link, "_blank");
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const openFeedbackBtn = document.getElementById("openFeedback");
    const feedbackContainer = document.getElementById("feedbackContainer");
    const submitFeedbackBtn = document.getElementById("submitFeedback");
    const feedbackInput = document.getElementById("feedbackInput");
    const checkKeyBtn = document.getElementById("checkKey");
    const viewKeyInput = document.getElementById("viewKey");
    const feedbackListDiv = document.getElementById("feedbackList");
    const feedbackItems = document.getElementById("feedbackItems");
    const correctKey = "EmployeeOnly"; 

    openFeedbackBtn.addEventListener("click", function() {
        feedbackContainer.classList.toggle("hidden");
    });

    submitFeedbackBtn.addEventListener("click", function() {
        let feedback = feedbackInput.value.trim();
        if (feedback !== "") {
            let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
            feedbacks.push(feedback);
            localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
            feedbackInput.value = "";
            alert("تم إرسال الاقتراح!نشكرك على مشاركة رأيك!");
        } else {
            alert("يرجى إدخال الاقتراح قبل الإرسال!");
        }
    });

    checkKeyBtn.addEventListener("click", function() {
        let enteredKey = viewKeyInput.value;
        if (enteredKey === correctKey) {
            feedbackListDiv.classList.remove("hidden");

            let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
            feedbackItems.innerHTML = "";
            feedbacks.forEach(fb => {
                let li = document.createElement("li");
                li.textContent = fb;
                feedbackItems.appendChild(li);
            });
        } else {
            alert("مفتاح العرض غير صحيح!");
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const openFeedbackBtn = document.getElementById("openFeedback");
    const feedbackContainer = document.getElementById("feedbackContainer");

    if (openFeedbackBtn && feedbackContainer) {
        openFeedbackBtn.addEventListener("click", function(event) {
            event.stopPropagation();
            feedbackContainer.style.display = "block"; 
        });

        document.addEventListener("click", function(event) {
            if (!feedbackContainer.contains(event.target) && event.target !== openFeedbackBtn) {
                feedbackContainer.style.display = "none"; 
            }
        });

        feedbackContainer.addEventListener("click", function(event) {
            event.stopPropagation();
        });
    }
});
