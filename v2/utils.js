// utils.js

// Function to get URL parameters
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Function to get plain text from question object (removing markdown/HTML)
function getQuestionPlainText(questionText) {
    // Remove code blocks first
    let plainText = questionText.replace(/```(cpp|c|java|javascript|html|css|python)?\n([\s\S]*?)\n```/g, ' ');
    // Remove list markers like '* '
    plainText = plainText.replace(/^\s*\*\s+/gm, '');
    // Replace potential HTML tags (like <br>) that might remain after formatting
    plainText = plainText.replace(/<[^>]*>/g, ' ');
    // Replace multiple newlines/spaces with single space
    plainText = plainText.replace(/\s+/g, ' ').trim();
    return plainText;
}

// Function to format question text for display (handles newlines, lists, code blocks)
function formatQuestionTextForDisplay(text) {
    // Escape basic HTML first to prevent injection, except for our intended tags
    let escapedText = text.replace(/&/g, '&')
                           .replace(/</g, '<')
                           .replace(/>/g, '>')
                           .replace(/"/g, '"')
                           .replace(/'/g, "'")

    const codeBlockRegex = /```(cpp|c|java|javascript|html|css|python)?\n([\s\S]*?)\n```/g;
    let formattedText = escapedText.replace(codeBlockRegex, (match, lang, code) => {
        // Un-escape content within code blocks
        const unescapedCode = code.replace(/&/g, '&')
                                  .replace(/</g, '<')
                                  .replace(/>/g, '>')
                                  .replace(/"/g, '"')
                                  .replace(/'/g, "'");
        const languageClass = lang ? ` class="language-${lang}"` : '';
        // Add pre/code tags - Note: Highlight.js or similar library would target these
        return `<pre><code${languageClass}>${unescapedCode.trim()}</code></pre>`;
    });

    // Handle lists (assuming '* ' prefix after potential newlines)
    const lines = formattedText.split('\n');
    let listHtml = '';
    let inList = false;
    const processedLines = [];

    lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('<* ')) { // Check for escaped '* '
             const itemText = trimmedLine.substring(5).trim(); // Get text after '* '
             if (!inList) {
                 listHtml += '<ul>';
                 inList = true;
             }
             listHtml += `<li>${itemText.replace(/<br\s*\/?>/gi, '')}</li>`; // Add list item, remove internal breaks
        } else {
            if (inList) {
                listHtml += '</ul>';
                processedLines.push(listHtml); // Add completed list
                listHtml = '';
                inList = false;
            }
            processedLines.push(line); // Add non-list line
        }
    });
     if (inList) { // Close list if it was the last element
         listHtml += '</ul>';
         processedLines.push(listHtml);
     }

    // Join lines back, converting manual newlines outside lists/code to <br>
    formattedText = processedLines.map(line => {
        if (line.startsWith('<ul') || line.startsWith('<pre')) {
            return line; // Keep lists and code blocks as they are
        }
        return line.replace(/\n/g, '<br>'); // Convert newlines in regular text
    }).join('<br>'); // Join paragraphs/blocks with <br>

    // Basic cleanup: Remove leading/trailing breaks and multiple consecutive breaks
    formattedText = formattedText.replace(/^<br\s*\/?>|<br\s*\/?>$/gi, '');
    formattedText = formattedText.replace(/(<br\s*\/?>\s*){2,}/gi, '<br>'); // Replace multiple breaks with one

    return formattedText;
}


// LocalStorage functions for completion status
const localStoragePrefix = 'beuApp_completed_';
function isQuestionCompleted(questionId) {
    return localStorage.getItem(localStoragePrefix + questionId) === 'true';
}

function setQuestionCompleted(questionId, isCompleted) {
    localStorage.setItem(localStoragePrefix + questionId, isCompleted);
}

// Function to show a temporary tooltip
function showTooltip($element, message) {
    const $tooltipContainer = $element.closest('.tooltip'); // Find the parent tooltip container
    const $tooltipText = $tooltipContainer.find('.tooltiptext');
    if ($tooltipText.length === 0) return;

    $tooltipText.text(message);
    $tooltipContainer.addClass('active');
    setTimeout(() => {
        $tooltipContainer.removeClass('active');
    }, 1500); // Hide tooltip after 1.5 seconds
}

// --- End of .js ---