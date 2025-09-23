document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('evaluationForm');
    const resultsDiv = document.getElementById('results');
    
    // Respuestas correctas para cada pregunta
    const correctAnswers = {
        q1: 'A', // La función y = x + 3 es lineal
        q2: 'B', // La parábola es la gráfica de una función cuadrática como y = x² - 1
        q3: 'B'  // La gráfica en forma de "S" es característica de una función cúbica
    };

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

        let score = 0;
        const totalQuestions = Object.keys(correctAnswers).length;
        const feedbacks = document.querySelectorAll('.feedback');
        
        // Limpiar retroalimentación anterior
        feedbacks.forEach(el => {
            el.innerHTML = '';
            el.className = 'feedback';
        });

        // Ocultar resultados anteriores
        resultsDiv.innerHTML = '';
        resultsDiv.style.display = 'none';

        // Recorrer las preguntas y validar las respuestas
        for (const questionId in correctAnswers) {
            const userAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
            const feedbackEl = document.getElementById(`feedback${questionId.slice(1)}`);

            if (userAnswer) {
                if (userAnswer.value === correctAnswers[questionId]) {
                    score++;
                    feedbackEl.textContent = '¡Correcto! ✅';
                    feedbackEl.classList.add('correct');
                } else {
                    feedbackEl.textContent = 'Incorrecto. ❌';
                    feedbackEl.classList.add('incorrect');
                }
            } else {
                feedbackEl.textContent = 'No has respondido esta pregunta. ⚠️';
                feedbackEl.classList.add('warning');
            }
        }
        
        // Mostrar los resultados finales
        resultsDiv.style.display = 'block';
        resultsDiv.innerHTML = `
            <h3>Resultados:</h3>
            <p>Obtuviste ${score} de ${totalQuestions} preguntas correctas.</p>
        `;
    });
});

// Función para reiniciar el formulario y la retroalimentación
function resetForm() {
    const form = document.getElementById('evaluationForm');
    const resultsDiv = document.getElementById('results');
    const feedbacks = document.querySelectorAll('.feedback');

    form.reset(); // Reinicia el formulario a su estado original
    feedbacks.forEach(el => {
        el.innerHTML = '';
        el.className = 'feedback';
    });
    resultsDiv.innerHTML = '';
    resultsDiv.style.display = 'none';
}