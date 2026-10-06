/**
 * Plant Disease Detection Using Mobile Images and Video
 * CS 663: Computer Vision - Project 1
 * Mahitha Rangineni - California State University, East Bay
 * Shared Interactive Utilities
 */

document.addEventListener("DOMContentLoaded", function () {
    // Condition-safe Audio Checker:
    // Hides broken media players if the audio recording has not yet been uploaded,
    // gracefully displaying the recording status placeholder.
    const audioContainers = document.querySelectorAll(".audio-player-container");
    audioContainers.forEach(container => {
        const audio = container.querySelector("audio.page-audio");
        const placeholder = container.querySelector(".audio-placeholder");
        if (!audio) return;

        const source = audio.querySelector("source");
        if (!source || !source.src) return;

        // Verify if audio file exists on the server
        fetch(source.src, { method: "HEAD" })
            .then(response => {
                if (response.ok) {
                    audio.style.display = "block";
                    if (placeholder) placeholder.style.display = "none";
                } else {
                    audio.style.display = "none";
                    if (placeholder) placeholder.style.display = "flex";
                }
            })
            .catch(() => {
                // If local file:// or network error, keep safe fallback
                audio.style.display = "none";
                if (placeholder) placeholder.style.display = "flex";
            });
    });
});

/**
 * Quiz validation with detailed score feedback
 */
function checkQuiz() {
    let score = 0;
    const totalQuestions = 5;

    const answers = {
        q1: { answer: "b", explanation: "Classification predicts only one global label for the entire image without spatial localization." },
        q2: { answer: "a", explanation: "Object detection predicts bounding box coordinates, class labels, and confidence probabilities for each detection." },
        q3: { answer: "a", explanation: "Segmentation classifies individual pixels, enabling irregular lesion boundaries and diseased area quantification." },
        q4: { answer: "a", explanation: "Video captures multiple temporal viewpoints, overcoming angle, lighting, and occlusion limitations." },
        q5: { answer: "b", explanation: "On-device edge inference operates locally without requiring an active internet connection or server roundtrips." }
    };

    for (let q in answers) {
        const selected = document.querySelector('input[name="' + q + '"]:checked');
        const card = document.getElementById('card-' + q);
        
        if (card) {
            // Remove previous styling
            card.style.borderColor = "";
            card.style.backgroundColor = "";
        }

        if (selected && selected.value === answers[q].answer) {
            score++;
            if (card) {
                card.style.borderColor = "#52b788";
                card.style.backgroundColor = "#f0fdf4";
            }
        } else if (card) {
            card.style.borderColor = "#f87171";
            card.style.backgroundColor = "#fef2f2";
        }
    }

    const resultEl = document.getElementById("quizResult");
    if (resultEl) {
        resultEl.classList.add("show");
        const percentage = Math.round((score / totalQuestions) * 100);
        
        if (score >= 4) {
            resultEl.className = "show quiz-success";
            resultEl.innerHTML = `<strong>Excellent! Score: ${score} / ${totalQuestions} (${percentage}%)</strong><p>You have demonstrated a strong understanding of computer vision principles for plant disease monitoring.</p>`;
        } else {
            resultEl.className = "show quiz-retry";
            resultEl.innerHTML = `<strong>Score: ${score} / ${totalQuestions} (${percentage}%)</strong><p>Review the highlighted questions above and consult the tutorial sections to improve your understanding.</p>`;
        }
        
        resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
}

/**
 * Reset quiz answers and visual feedback
 */
function resetQuiz() {
    const form = document.getElementById("quizForm");
    if (form) form.reset();

    for (let i = 1; i <= 5; i++) {
        const card = document.getElementById("card-q" + i);
        if (card) {
            card.style.borderColor = "";
            card.style.backgroundColor = "";
        }
    }

    const resultEl = document.getElementById("quizResult");
    if (resultEl) {
        resultEl.className = "";
        resultEl.innerHTML = "";
    }
}
