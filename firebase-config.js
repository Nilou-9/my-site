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

    // فتح صندوق الفيدباك عند الضغط على الزر
    openFeedbackBtn.addEventListener("click", function() {
        feedbackContainer.classList.toggle("hidden");
    });

    // إرسال الفيدباك إلى Firebase
    submitFeedbackBtn.addEventListener("click", function() {
        let feedback = feedbackInput.value.trim();
        if (feedback !== "") {
            const feedbackRef = firebase.database().ref('feedbacks');  // الوصول إلى مكان تخزين الفيدباك في Firebase
            feedbackRef.push(feedback)
                .then(() => {
                    feedbackInput.value = "";  // مسح الحقل بعد الإرسال
                    alert("تم إرسال الاقتراح! شكراً على مشاركتك!");
                })
                .catch((error) => {
                    console.error("خطأ في إضافة الفيدباك:", error);
                    alert("حدث خطأ أثناء إرسال الفيدباك. حاول مرة أخرى.");
                });
        } else {
            alert("يرجى إدخال الاقتراح قبل الإرسال!");
        }
    });

    // التحقق من مفتاح العرض
    checkKeyBtn.addEventListener("click", function() {
        let enteredKey = viewKeyInput.value;
        if (enteredKey === correctKey) {
            feedbackListDiv.classList.remove("hidden"); // إظهار قائمة الفيدباك

            const feedbackRef = firebase.database().ref('feedbacks');
            feedbackRef.once('value', function(snapshot) {
                const feedbacks = snapshot.val();
                feedbackItems.innerHTML = "";  // مسح الفيدباك الحالي في الصفحة
                if (feedbacks) {
                    for (let id in feedbacks) {
                        let li = document.createElement("li");
                        li.textContent = feedbacks[id];
                        feedbackItems.appendChild(li);
                    }
                } else {
                    feedbackItems.innerHTML = "<li>لا توجد تعليقات حالياً.</li>";  // إذا لم توجد فيدباك
                }
            });
        } else {
            alert("مفتاح العرض غير صحيح!");
        }
    });
});
