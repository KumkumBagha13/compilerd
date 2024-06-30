document.addEventListener('DOMContentLoaded', () => {
    const languageSelect = document.getElementById('language-select');
    const codeInput = document.getElementById('code-input');
    const submitBtn = document.getElementById('submit-btn');
    const output = document.getElementById('output');

    submitBtn.addEventListener('click', async () => {
        const language = languageSelect.value;
        const script = codeInput.value;

        if (!script.trim()) {
            output.textContent = 'Please enter some code.';
            return;
        }

        output.textContent = 'Running...';

        try {
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language, script }),
            });

            const data = await response.json();

            if (data.error) {
                output.textContent = `Error: ${data.output || data.error}`;
            } else {
                output.textContent = data.output || 'No output';
            }
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
        }
    });
});