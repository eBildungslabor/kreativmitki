document.addEventListener("DOMContentLoaded", function () {
    // Formularverarbeitung auf den Eingabeseiten
    const form = document.getElementById('challengeForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const challenge = document.getElementById('challenge').value;
            localStorage.setItem('challenge', challenge);

            const target = form.getAttribute('data-target');
            if (target) {
                window.location.href = target;
            }
        });
    }

    // Ergebnisverarbeitung auf den Result-Seiten
    const resultOutput = document.getElementById('resultText');
    const copyButton = document.getElementById('copyButton');

    if (resultOutput) {
        const challenge = localStorage.getItem('challenge') || '[keine Herausforderung eingegeben]';
        const page = window.location.pathname;
        let prompt = '';

        if (page.includes('result-herausforderung.html')) {
            // Prompt für sokratischen Dialog
            prompt = `Beginne einen sokratischen Dialog zum folgenden Thema: ${challenge}.
Stelle mir eine erste kluge, vertiefende Frage.
Warte dann auf meine Antwort.
Erst danach stellst du die nächste Frage – offen, nachdenklich, anregend.
Gib keine Antworten, sondern unterstütze mich dabei, durch deine Fragen eigene Einsichten zu entwickeln.
Wiederhole diesen Prozess, bis ich den Dialog beende.`;
        } else if (page.includes('result-spiel.html')) {
            // Prompt für Spiel-PingPong
            prompt = `Wir spielen ein kreatives Ideen-PingPong.
Die Herausforderung lautet: ${challenge}.
Du beginnst, indem du mich bittest, eine erste Idee in Stichpunkten zu nennen.
Erst danach nennst du selbst eine Idee. Deine Idee muss unterschiedlich zu meiner Idee sein und einen neuen Aspekt aufgreifen.
Dann forderst du mich direkt zur nächsten Idee auf – und so weiter.
Die Ideen sollen möglichst kurz, überraschend und unterschiedlich sein.
Wiederhole den Wechsel so lange, bis ich aufhöre zu spielen.`;
        } else if (page.includes('result-methoden.html')) {
            // Prompt für SCAMPER-Methode
            prompt = `Nutze die Kopfstand-Methode, um mir zu helfen kreative Ideen zur folgenden Herausforderung zu entwickeln:
"${challenge}"
Anstatt dass du mir sinnvolle Ideen vorschlägst, versuchst du dir möglichst dumme Ideen zu überlegen (= Kopfstand). Es sollen Ideen sein, mit denen meine Herausforderung garantiert nicht bewältigt werden kann.
Du nennst mir jeweils immer eine Kopfstand-Idee und fragst dann, ob mir davon ausgehend bereits eine richtige Idee einfällt oder ob du die Idee noch dümmer machen sollst (= deine genannte Kopfstand-Idee weiter verschlimmern) oder noch eine andere Kopfstand-Idee (= einen anderen Aspekt aufgreifen, was gar keine Hilfe wäre) nennen sollst.
Du generierst so lange immer eine nach der anderen dümmstmögliche Kopfstand-Ideen, bis ich eine für mich sinnvolle Idee zur Bewältigung meiner Herausforderung gefunden habe. Starte jetzt mit der ersten Kopfstand-Idee zu meiner genannten Herausforderung.`;

        }

        resultOutput.textContent = prompt;
    }

    // Kopieren ermöglichen
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            const textToCopy = document.getElementById('resultText').innerText;
            navigator.clipboard.writeText(textToCopy).then(() => {
                alert('Prompt wurde kopiert!');
            }).catch(err => {
                console.error('Kopieren fehlgeschlagen: ', err);
            });
        });
    }
});
