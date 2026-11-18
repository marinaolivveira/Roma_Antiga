const quizForm = document.querySelector("#quiz-form");

const resultArea = document.querySelector("#result");


const answerKey = {

    q1: "b",
    q2: "c",
    q3: "a",
    q4: "a",
    q5: "c"

};


quizForm.addEventListener("submit", function (event) {

    event.preventDefault();


    let score = 0;

    const totalQuestions = Object.keys(answerKey).length;

    const unanswered = [];


    for (const questionName in answerKey) {

        const selectedOption = quizForm.querySelector(
            `input[name="${questionName}"]:checked`
        );

        if (!selectedOption) {

            unanswered.push(questionName);

        }

        else if (
            selectedOption.value === answerKey[questionName]
        ) {

            score++;

        }

    }

    if (unanswered.length > 0) {

        resultArea.hidden = false;

        resultArea.textContent =
            `Ainda falta responder ${unanswered.length} questões.`;

        resultArea.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

        return;

    }


    const percentage = Math.round(
        (score / totalQuestions) * 100
    );


    let message = "Tente Novamente!";

    if (percentage === 100) {

        message = "Excelente! Você sabe bastante sobre a República na Roma Antiga.";

    }

    else if (percentage >= 60) {

        message = "Ótimo! Você está quase lá.";

    }


    resultArea.hidden = false;

    resultArea.innerHTML = `
        <strong>
            Resultado: ${score} de ${totalQuestions}
            (${percentage}%).
        </strong>

        <p>${message}</p>
    `;


    resultArea.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


quizForm.addEventListener("reset", function () {

    resultArea.hidden = true;

    resultArea.textContent = "";

});