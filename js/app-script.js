// js/app-script.js - Major Rewrite Needed

document.addEventListener('DOMContentLoaded', () => {
    console.log("Initializing BEU PYQ Explorer App...");

    // --- State Variables ---
    let currentView = 'branch'; // 'branch', 'semester', 'subject', 'question'
    let selectedBranch = null; // Store the selected branch object {id, name, semesters}
    let selectedSemester = null; // Store the selected semester object {id, number, subjects}
    let selectedSubject = null; // Store the selected subject object {id, name, code, questions}
    let allQuestionsForCurrentSubject = []; // Questions for the selected subject
    let filteredQuestions = []; // Filtered questions for display
    let currentPage = 1;
    let itemsPerPage = 15; // Keep pagination size
    let currentSearchTerm = '';
    // Keep track of unique filter values for the *current* subject
    let uniqueYearsInSubject = new Set();
    let uniqueTypesInSubject = new Set();
    let uniqueChaptersInSubject = new Set(); // Or 'topics'
    let uniqueMarksInSubject = new Set();

    // --- DOM Elements ---
    const branchSelectionView = document.getElementById('branch-selection-view');
    const semesterSelectionView = document.getElementById('semester-selection-view');
    const subjectSelectionView = document.getElementById('subject-selection-view');
    const questionDisplayArea = document.getElementById('question-display-area');
    const branchListContainer = document.getElementById('branch-list');
    const semesterListContainer = document.getElementById('semester-list');
    const subjectListContainer = document.getElementById('subject-list');
    const questionsList = document.getElementById('questions-list');
    const loadingIndicator = document.getElementById('loading-indicator');
    const paginationControlsContainer = document.getElementById('pagination-controls');
    const searchInput = document.getElementById('search-input');
    const resetFiltersButton = document.getElementById('reset-filters');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleButton = document.getElementById('sidebar-toggle-button');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const filtersContainer = document.getElementById('filters-container'); // Container for filter groups
    const resultsTitle = document.getElementById('results-title');
    const resultsDescription = document.getElementById('results-description');
    const verificationFooter = document.getElementById('verification');
    // Back Buttons
    const backToBranchBtn = document.getElementById('back-to-branch');
    const backToSemesterBtn = document.getElementById('back-to-semester');
    const backToSubjectBtn = document.getElementById('back-to-subject');
    // Titles
    const semesterViewTitle = document.getElementById('semester-view-title');
    const subjectViewTitle = document.getElementById('subject-view-title');
    // Breadcrumbs (Optional, can implement later)
    const breadcrumbsContainer = document.getElementById('breadcrumbs');

    // --- Helper Functions ---
    function showView(viewId) {
        document.querySelectorAll('.view-section').forEach(sec => sec.classList.add('hidden'));
        const viewToShow = document.getElementById(viewId);
        if (viewToShow) {
            viewToShow.classList.remove('hidden');
            console.log(`Showing view: ${viewId}`);
        } else {
            console.error(`View with id ${viewId} not found.`);
        }
        // Enable/disable controls based on view
        const isQuestionView = (viewId === 'question-display-area');
        searchInput.disabled = !isQuestionView;
        resetFiltersButton.disabled = !isQuestionView;
        sidebarToggleButton.disabled = !isQuestionView;
        // Adjust main content scroll
        // document.getElementById('main-content').classList.toggle('questions-active', isQuestionView);

        // Update window title (optional)
        updateWindowTitle();
    }

    function updateWindowTitle() {
         let title = "BEU PYQ Explorer";
         if (selectedSubject) {
             title = `${selectedSubject.name} - ${selectedBranch.name} | BEU PYQ Explorer`;
         } else if (selectedSemester) {
             title = `Sem ${selectedSemester.number} - ${selectedBranch.name} | BEU PYQ Explorer`;
         } else if (selectedBranch) {
             title = `${selectedBranch.name} | BEU PYQ Explorer`;
         }
         document.title = title;
    }


    // --- Display Functions ---

    function displayBranches() {
        branchListContainer.innerHTML = ''; // Clear previous
        if (!beuData || !beuData.branches || beuData.branches.length === 0) {
             document.getElementById('branch-loading-error').textContent = 'Error: No branch data found.';
             document.getElementById('branch-loading-error').classList.remove('hidden');
             return;
        }
         document.getElementById('branch-loading-error').classList.add('hidden');

        beuData.branches.forEach(branch => {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.dataset.branchId = branch.id;
            card.innerHTML = `
                <h3>${branch.name}</h3>
                <p>${branch.semesters?.length || 0} Semesters</p>
            `;
            card.addEventListener('click', () => handleBranchSelect(branch.id));
            branchListContainer.appendChild(card);
        });
        currentView = 'branch';
        showView('branch-selection-view');
    }

    function displaySemesters(branch) {
        semesterListContainer.innerHTML = ''; // Clear previous
        if (!branch || !branch.semesters || branch.semesters.length === 0) {
            document.getElementById('semester-loading-error').textContent = `Error: No semester data found for ${branch?.name || 'selected branch'}.`;
            document.getElementById('semester-loading-error').classList.remove('hidden');
            showView('semester-selection-view'); // Show view even if empty
            return;
        }
        document.getElementById('semester-loading-error').classList.add('hidden');

        semesterViewTitle.textContent = `Select Semester for ${branch.name}`;

        // Sort semesters by number
        const sortedSemesters = [...branch.semesters].sort((a, b) => a.number - b.number);

        sortedSemesters.forEach(semester => {
            const card = document.createElement('div');
            card.className = 'selection-card';
            card.dataset.semesterId = semester.id;
            card.innerHTML = `
                <h3>Semester ${semester.number}</h3>
                 <p>${semester.subjects?.length || 0} Subjects</p>
            `;
            card.addEventListener('click', () => handleSemesterSelect(semester.id));
            semesterListContainer.appendChild(card);
        });
        currentView = 'semester';
        showView('semester-selection-view');
    }

    function displaySubjects(branch, semester) {
         subjectListContainer.innerHTML = ''; // Clear previous
         if (!semester || !semester.subjects || semester.subjects.length === 0) {
             document.getElementById('subject-loading-error').textContent = `Error: No subject data found for Semester ${semester?.number || '?'} of ${branch?.name || '?'}.`;
             document.getElementById('subject-loading-error').classList.remove('hidden');
             showView('subject-selection-view'); // Show view even if empty
             return;
         }
          document.getElementById('subject-loading-error').classList.add('hidden');

         subjectViewTitle.textContent = `Select Subject for ${branch.name} - Sem ${semester.number}`;

         semester.subjects.forEach(subject => {
            const card = document.createElement('div');
            card.className = 'selection-card !text-left !items-start'; // Align left
            card.dataset.subjectId = subject.id;
            card.innerHTML = `
                <h3 class="!mb-0">${subject.name}</h3>
                <p class="!text-xs text-slate-400 font-mono">${subject.code || 'No Code'}</p>
                 <p class="mt-1">${subject.questions?.length || 0} Questions</p>
            `;
            card.addEventListener('click', () => handleSubjectSelect(subject.id));
            subjectListContainer.appendChild(card);
        });
         currentView = 'subject';
         showView('subject-selection-view');
    }

    // --- Event Handlers ---

    function handleBranchSelect(branchId) {
        console.log(`Branch selected: ${branchId}`);
        selectedBranch = beuData.branches.find(b => b.id === branchId);
        if (selectedBranch) {
            displaySemesters(selectedBranch);
        } else {
            console.error(`Branch with id ${branchId} not found in data.`);
            // Show error message to user
            document.getElementById('branch-loading-error').textContent = 'Error: Could not load selected branch data.';
             document.getElementById('branch-loading-error').classList.remove('hidden');
        }
    }

    function handleSemesterSelect(semesterId) {
        console.log(`Semester selected: ${semesterId}`);
        selectedSemester = selectedBranch?.semesters.find(s => s.id === semesterId);
         if (selectedSemester) {
            displaySubjects(selectedBranch, selectedSemester);
        } else {
            console.error(`Semester with id ${semesterId} not found in branch ${selectedBranch?.id}.`);
             document.getElementById('semester-loading-error').textContent = 'Error: Could not load selected semester data.';
             document.getElementById('semester-loading-error').classList.remove('hidden');
        }
    }

    function handleSubjectSelect(subjectId) {
        console.log(`Subject selected: ${subjectId}`);
        selectedSubject = selectedSemester?.subjects.find(sub => sub.id === subjectId);
         if (selectedSubject) {
             // *** CRITICAL STEP: Load questions and initialize filters for this subject ***
             loadQuestionsAndFiltersForSubject(selectedSubject);
             currentView = 'question';
             showView('question-display-area');
             // Reset scroll position
             document.getElementById('main-content').scrollTop = 0;
         } else {
            console.error(`Subject with id ${subjectId} not found in semester ${selectedSemester?.id}.`);
             document.getElementById('subject-loading-error').textContent = 'Error: Could not load selected subject data.';
             document.getElementById('subject-loading-error').classList.remove('hidden');
         }
    }

     // --- Back Button Handlers ---
     backToBranchBtn.addEventListener('click', () => {
        selectedSemester = null;
        selectedSubject = null;
        displaySemesters(selectedBranch); // Re-display semesters for the current branch
     });
      backToSemesterBtn.addEventListener('click', () => {
        selectedSubject = null;
        displaySubjects(selectedBranch, selectedSemester); // Re-display subjects for the current semester
     });
      backToSubjectBtn.addEventListener('click', () => {
         // Reset filters and question display state if needed
         allQuestionsForCurrentSubject = [];
         filteredQuestions = [];
         questionsList.innerHTML = '';
         paginationControlsContainer.classList.add('hidden');
         filtersContainer.innerHTML = '<div class="text-center text-sm text-slate-400 pt-10">Select a subject to see filters.</div>'; // Reset filters display
         searchInput.value = '';
         searchInput.disabled = true;
         resetFiltersButton.disabled = true;
         sidebarToggleButton.disabled = true;

         displaySubjects(selectedBranch, selectedSemester); // Go back to subject selection
      });

     // --- Question Loading and Filtering Logic ---

     function loadQuestionsAndFiltersForSubject(subject) {
         console.log(`Loading questions for: ${subject.name}`);
         resultsTitle.textContent = `Loading ${subject.name}...`;
         resultsDescription.textContent = `Please wait while questions are prepared.`;
         loadingIndicator.classList.remove('hidden'); // Show loading indicator
         questionsList.innerHTML = ''; // Clear previous questions
         paginationControlsContainer.classList.add('hidden'); // Hide pagination

         // Simulate async loading if needed, otherwise process directly
         setTimeout(() => {
            try {
                allQuestionsForCurrentSubject = subject.questions || [];
                console.log(`Loaded ${allQuestionsForCurrentSubject.length} questions.`);

                // --- Populate Filters based on *these* questions ---
                uniqueYearsInSubject = new Set(allQuestionsForCurrentSubject.map(q => q.year).filter(y => y != null));
                uniqueTypesInSubject = new Set(allQuestionsForCurrentSubject.map(q => q.type).filter(t => t != null));
                uniqueChaptersInSubject = new Set(allQuestionsForCurrentSubject.map(q => q.chapter).filter(c => c != null)); // Or topic/module
                uniqueMarksInSubject = new Set(allQuestionsForCurrentSubject.map(q => q.marks).filter(m => m != null));

                populateFilterControls(); // NEW function to build sidebar filters

                // --- Initial Display ---
                applyFiltersAndSearch(); // Perform initial filter/search (shows all initially)
                 verificationFooter.textContent = `Subject: ${subject.name} (${subject.code}) | ${allQuestionsForCurrentSubject.length} questions found.`;


            } catch (error) {
                 console.error("Error processing subject questions:", error);
                 resultsTitle.textContent = 'Error Loading Questions';
                 resultsDescription.textContent = `Failed to load questions for ${subject.name}. Check console.`;
                 questionsList.innerHTML = `<p class="text-red-600 p-4 font-medium">Error: ${error.message}.</p>`;
                 verificationFooter.textContent = `Error loading ${subject.name}.`;
            } finally {
                 loadingIndicator.classList.add('hidden'); // Hide loader regardless of outcome
            }
         }, 50); // Short delay to allow UI update
     }

     function populateFilterControls() {
         console.log("Populating filters for current subject...");
         filtersContainer.innerHTML = ''; // Clear previous filters or placeholder

         // Helper to create a filter group
         const createFilterGroup = (title, filterId, items, valueExtractor, labelExtractor, itemClass, allCheckboxId) => {
             if (!items || items.size === 0) return; // Don't create group if no items

             const groupDiv = document.createElement('div');
             groupDiv.className = 'filter-group space-y-1.5';
             groupDiv.innerHTML = `<h3 class="text-sm font-semibold text-slate-600 mb-2 px-1">${title}</h3>`;
             const filterListDiv = document.createElement('div');
             filterListDiv.id = filterId;
             filterListDiv.className = 'space-y-1';

             // Add "All" option
             const allLabel = document.createElement('label');
             allLabel.className = 'filter-label';
             allLabel.innerHTML = `<input type="checkbox" id="${allCheckboxId}" class="filter-checkbox" value="all" checked><span>All ${title.replace('By ', '')}</span>`;
             filterListDiv.appendChild(allLabel);

             // Sort items before adding
             // (Customize sorting: numerical for years/marks, alphabetical for types/chapters)
             let sortedItems = Array.from(items);
             if (filterId === 'year-filters' || filterId === 'marks-filters') {
                 sortedItems.sort((a, b) => Number(b) - Number(a)); // Descending for years/marks
             } else {
                  sortedItems.sort((a,b) => String(a).localeCompare(String(b))); // Alphabetical
             }


             // Add specific options
             sortedItems.forEach(item => {
                 const value = valueExtractor(item);
                 const labelText = labelExtractor(item);
                 const label = document.createElement('label');
                 label.className = 'filter-label';
                 label.innerHTML = `<input type="checkbox" class="filter-checkbox ${itemClass}" value="${value}"><span>${labelText}</span>`;
                 filterListDiv.appendChild(label);
             });

             groupDiv.appendChild(filterListDiv);
             filtersContainer.appendChild(groupDiv);
         };

         // Create filter groups
         createFilterGroup('By Year', 'year-filters', uniqueYearsInSubject, item => item, item => item, 'year-filter', 'all-years');
         createFilterGroup('By Type', 'type-filters', uniqueTypesInSubject, item => item, item => item || 'N/A', 'type-filter', 'all-types');
         createFilterGroup('By Topic/Module', 'chapter-filters', uniqueChaptersInSubject, item => item, item => item || 'N/A', 'chapter-filter', 'all-chapters');
         createFilterGroup('By Marks', 'marks-filters', uniqueMarksInSubject, item => item, item => `${item} Marks`, 'marks-filter', 'all-marks');

         addFilterListeners(); // Re-attach listeners to the new checkboxes
     }

     function addFilterListeners() {
         console.log("Adding filter listeners...");
         // Generic handler for specific checkbox changes
         const handleSpecificFilterChange = (checkbox, allCheckboxId, filterCheckboxes) => {
             const allCheckbox = document.getElementById(allCheckboxId);
             if (!allCheckbox) return;
             if (checkbox.checked) {
                 allCheckbox.checked = false;
             } else if (!Array.from(filterCheckboxes).some(c => c.checked)) {
                 allCheckbox.checked = true; // Re-check "All" if nothing else is selected
             }
             applyFiltersAndSearch();
         };

         // Generic handler for "All" checkbox changes
         const handleAllFilterChange = (allCheckbox, filterCheckboxes) => {
             if (allCheckbox.checked) {
                 filterCheckboxes.forEach(cb => { cb.checked = false; });
             } else if (!Array.from(filterCheckboxes).some(c => c.checked)) {
                 // Prevent unchecking "All" if no specific options are selected
                 allCheckbox.checked = true;
                 return; // No need to re-apply filters if state didn't change
             }
             applyFiltersAndSearch();
         };

         // Attach listeners for each group
         document.querySelectorAll('#year-filters .year-filter').forEach(cb => cb.addEventListener('change', () => handleSpecificFilterChange(cb, 'all-years', document.querySelectorAll('#year-filters .year-filter'))));
         document.getElementById('all-years')?.addEventListener('change', (e) => handleAllFilterChange(e.target, document.querySelectorAll('#year-filters .year-filter')));

         document.querySelectorAll('#type-filters .type-filter').forEach(cb => cb.addEventListener('change', () => handleSpecificFilterChange(cb, 'all-types', document.querySelectorAll('#type-filters .type-filter'))));
         document.getElementById('all-types')?.addEventListener('change', (e) => handleAllFilterChange(e.target, document.querySelectorAll('#type-filters .type-filter')));

         document.querySelectorAll('#chapter-filters .chapter-filter').forEach(cb => cb.addEventListener('change', () => handleSpecificFilterChange(cb, 'all-chapters', document.querySelectorAll('#chapter-filters .chapter-filter'))));
         document.getElementById('all-chapters')?.addEventListener('change', (e) => handleAllFilterChange(e.target, document.querySelectorAll('#chapter-filters .chapter-filter')));

          document.querySelectorAll('#marks-filters .marks-filter').forEach(cb => cb.addEventListener('change', () => handleSpecificFilterChange(cb, 'all-marks', document.querySelectorAll('#marks-filters .marks-filter'))));
         document.getElementById('all-marks')?.addEventListener('change', (e) => handleAllFilterChange(e.target, document.querySelectorAll('#marks-filters .marks-filter')));
     }


     function getSelectedFilters(checkboxClass, allCheckboxId) {
         const allCheckbox = document.getElementById(allCheckboxId);
         // If 'All' checkbox doesn't exist or is checked, return ['all']
         if (!allCheckbox || allCheckbox.checked) {
             return ['all'];
         }
         const selected = [];
         document.querySelectorAll(`.${checkboxClass}:checked`).forEach(cb => {
             selected.push(cb.value);
         });
         // If specific boxes were unchecked and none remain, default back to 'all'
         return selected.length > 0 ? selected : ['all'];
     }

     function applyFiltersAndSearch() {
         console.log("Applying filters and search...");
         if (!selectedSubject) {
             console.warn("applyFiltersAndSearch called without a selected subject.");
             return;
         }

         // Read filter values specific to the current context
         const selectedYears = getSelectedFilters('year-filter', 'all-years');
         const selectedTypes = getSelectedFilters('type-filter', 'all-types');
         const selectedChapters = getSelectedFilters('chapter-filter', 'all-chapters');
         const selectedMarks = getSelectedFilters('marks-filter', 'all-marks');
         currentSearchTerm = searchInput.value.trim().toLowerCase();

         console.log("Filters - Years:", selectedYears, "Types:", selectedTypes, "Chapters:", selectedChapters, "Marks:", selectedMarks, "Search:", currentSearchTerm);

         filteredQuestions = allQuestionsForCurrentSubject.filter(q => {
             const yearMatch = selectedYears.includes('all') || selectedYears.includes(String(q.year));
             const typeMatch = selectedTypes.includes('all') || selectedTypes.includes(q.type || 'N/A'); // Handle null/undefined types
             const chapterMatch = selectedChapters.includes('all') || selectedChapters.includes(q.chapter || 'N/A'); // Handle null/undefined chapters
             const marksMatch = selectedMarks.includes('all') || selectedMarks.includes(String(q.marks));

             // Search match (only search question text for now, could expand)
             const searchMatch = currentSearchTerm === '' ||
                 q.text?.toLowerCase().includes(currentSearchTerm) ||
                 q.qNumber?.toLowerCase().includes(currentSearchTerm); // Allow searching Q number

             return yearMatch && typeMatch && chapterMatch && marksMatch && searchMatch;
         });

         // Sort filtered questions (e.g., by year descending, then question number)
         filteredQuestions.sort((a, b) => {
             if (a.year !== b.year) return (b.year || 0) - (a.year || 0);
             // Basic sort by qNumber string - might need refinement for complex numbers like Q10a vs Q2a
             return (a.qNumber || "").localeCompare(b.qNumber || "");
         });

         console.log(`Found ${filteredQuestions.length} filtered questions.`);
         currentPage = 1; // Reset to first page
         displayFilteredQuestions();
         document.getElementById('main-content').scrollTop = 0; // Scroll to top of results
     }

    // --- Display Filtered Questions (Handles Markdown) ---
    function displayFilteredQuestions() {
        questionsList.innerHTML = ''; // Clear previous list
        loadingIndicator.classList.add('hidden'); // Ensure loader is hidden

        const totalItems = filteredQuestions.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (totalPages > 0 && currentPage > totalPages) currentPage = totalPages;
        if (currentPage < 1) currentPage = 1;

        updateResultsHeader(totalItems, totalPages); // Update count display

        if (totalItems === 0) {
            displayNoResultsMessage(); // Show "no results" message
            paginationControlsContainer.classList.add('hidden');
            return;
        }

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const questionsToDisplay = filteredQuestions.slice(startIndex, endIndex);

        let currentYear = null; // For grouping by year
        questionsToDisplay.forEach((q) => {
            // Add Year Heading if changed
            if (q.year !== currentYear) {
                currentYear = q.year;
                const yearHeadingDiv = document.createElement('div');
                yearHeadingDiv.className = 'year-heading'; // Uses existing CSS styling
                yearHeadingDiv.innerHTML = `<h3>${currentYear || 'Unknown Year'}</h3>`;
                questionsList.appendChild(yearHeadingDiv);
            }

            // Create Question Card
            const questionElement = document.createElement('article');
            questionElement.className = 'question-article space-y-3'; // Reuse existing style

            // Header: Topic/Module, Type, Marks
             const headerDiv = document.createElement('div');
             headerDiv.className = 'question-header flex-wrap gap-x-4 gap-y-1'; // Allow wrapping
             // Topic Badge
             if (q.chapter) {
                 const topicClean = q.chapter.replace(/^Module\s*\d+:\s*/i, '');
                 headerDiv.innerHTML += `<span class="topic-badge !bg-sky-100 !text-sky-700 !border-sky-200" title="${q.chapter}">Topic: ${topicClean}</span>`;
             }
             // Type Badge
             if (q.type) {
                 headerDiv.innerHTML += `<span class="topic-badge !bg-emerald-100 !text-emerald-700 !border-emerald-200">Type: ${q.type}</span>`;
             }
              // Marks Badge
             if (q.marks != null) {
                  headerDiv.innerHTML += `<span class="topic-badge !bg-amber-100 !text-amber-700 !border-amber-200">Marks: ${q.marks}</span>`;
             }
            questionElement.appendChild(headerDiv);


            // Content Area (Parse Markdown)
            const contentContainer = document.createElement('div');
            contentContainer.className = 'question-content space-y-3';
            parseAndDisplayMarkdownQuestion(q, contentContainer, currentSearchTerm); // *** Use Markdown Parser ***
            questionElement.appendChild(contentContainer);

            // Ask AI Button (Adapt context if needed)
            const askAIContainer = document.createElement('div');
            askAIContainer.className = 'ask-ai-container';
            const askAIButton = createAskAIButton(q); // Helper to create the button
            if (askAIButton) {
                 askAIContainer.appendChild(askAIButton);
                 questionElement.appendChild(askAIContainer);
            }

            questionsList.appendChild(questionElement);
        });

        // Re-highlight code blocks if any were generated by Markdown
        if (window.Prism) {
            setTimeout(() => { Prism.highlightAllUnder(questionsList); }, 0);
        }

        updatePaginationControls(totalItems, totalPages); // Update pagination
    }

     function parseAndDisplayMarkdownQuestion(question, container, searchTerm) {
         const qidSpanHTML = question.qNumber ? `<span class="q-identifier">${question.qNumber}:</span> ` : '';
         let markdownText = question.text || '';

         // Basic text highlight function (adapt if needed)
         const highlightText = (text, term) => {
            if (!term || term.trim() === '' || !text) return text;
            try {
                 // Highlight outside of HTML tags generated by Markdown
                const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                // Lookbehind/ahead might be tricky with nested tags from markdown,
                // simpler approach: highlight, then rely on parser/sanitizer
                const regex = new RegExp(escapedTerm, 'gi');
                // Be careful not to break markdown syntax before parsing
                 // It might be better to highlight *after* markdown parsing
                return text.replace(regex, `<span class="search-highlight">$&</span>`);
            } catch (e) { console.error("Highlighting error:", e); return text; }
         };

          // --- MARKDOWN PARSING ---
         try {
            // 1. Parse Markdown to HTML using Marked.js
             marked.setOptions({
                 gfm: true, // Enable GitHub Flavored Markdown
                 breaks: true, // Convert single newlines to <br>
                 // Optional: Add a custom renderer if needed for specific elements
             });
            let htmlContent = marked.parse(markdownText);

             // 2. Sanitize HTML (IMPORTANT security step if markdown comes from untrusted sources)
             // Allow common formatting tags, code blocks, images, lists etc.
              htmlContent = DOMPurify.sanitize(htmlContent, {
                   USE_PROFILES: { html: true }, // Allow standard HTML elements
                   ADD_TAGS: ['pre', 'code'], // Ensure code blocks are allowed
                   ADD_ATTR: ['class'] // Allow class attributes (for Prism)
               });

            // 3. Highlight search term *after* parsing and sanitizing
            if (searchTerm) {
                // Apply highlighting carefully to the generated HTML's text content
                // This is complex. A simpler way is to highlight the raw markdown *before* parsing,
                // but risk breaking syntax. A robust solution might involve traversing the DOM nodes
                // after sanitization and highlighting text nodes.
                // Let's try highlighting the HTML string (might be fragile):
                 const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                 const regex = new RegExp(`(?<!<[^>]*?)${escapedTerm}(?![^<]*?>)`, 'gi'); // Avoid highlighting inside tags
                 htmlContent = htmlContent.replace(regex, '<span class="search-highlight">$&</span>');
            }


            // 4. Add Q number and set innerHTML
            container.innerHTML = qidSpanHTML + htmlContent;

         } catch (err) {
             console.error("Markdown parsing/sanitization error:", err);
             // Fallback: Display raw text with basic formatting
             const p = document.createElement('p');
             p.className = 'text-slate-700 text-[15px] leading-relaxed whitespace-pre-line';
             p.innerHTML = qidSpanHTML + highlightText(markdownText.replace(/</g, "<").replace(/>/g, ">"), searchTerm); // Escape HTML in raw text
             container.appendChild(p);
         }
     }

     function createAskAIButton(question) {
         if (!question || !question.text) return null;

         const askAIButton = document.createElement('button');
         askAIButton.className = 'ask-ai-button'; // Uses existing CSS
         askAIButton.title = 'Ask this question on ChatGPT Search';

         // Prepare context for AI
         let context = `Subject: ${selectedSubject?.name || 'Unknown Subject'}\n`;
         if(question.chapter) context += `Topic: ${question.chapter}\n`;
         if(question.year) context += `Year: ${question.year}\n`;
         context += `Question (${question.qNumber || 'ID: '+question.questionId}):\n\n${question.text}`; // Use raw text for query

         askAIButton.setAttribute('data-question-context', context);

         askAIButton.innerHTML = `
             <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" class="w-4 h-4"><path clip-rule="evenodd" fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.06-1.061 3.5 3.5 0 014.862.013l.001.001.045.054.031.036.047.05.028.03.055.056.023.024c.18.174.342.36.483.554l.004.006a4.002 4.002 0 01.06 6.193l-.004.005a.75.75 0 01-1.06-1.06l.004-.005a2.5 2.5 0 00-.037-3.874l-.004-.004A2.5 2.5 0 008.94 6.941zM10 15.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"></path></svg>
             <span>Ask AI</span>`;

         askAIButton.addEventListener('click', handleAskAI); // Reuse or adapt handler
         return askAIButton;
     }

     function handleAskAI(event) {
         const button = event.currentTarget;
         const questionContext = button.dataset.questionContext;

         if (!questionContext) {
             console.error("Could not retrieve question context for Ask AI button.");
             return;
         }
         const encodedQuery = encodeURIComponent(questionContext);
         const targetUrl = `https://chatgpt.com/search?q=${encodedQuery}`;
         window.open(targetUrl, '_blank', 'noopener,noreferrer');
     }

    // --- Update Results Header --- (Mostly similar, adapt text)
    function updateResultsHeader(count, totalPages) {
         const searchTerm = searchInput.value.trim();
         let title = '';
         let description = '';

         if (!selectedSubject) { // Should not happen if called correctly
              title = "No Subject Selected";
              description = "Please select a branch, semester, and subject.";
         } else if (count === 0) {
             title = `No Questions Found in ${selectedSubject.name}`;
             description = `No questions match your filters`;
             if (searchTerm) description += ` or search term "${searchTerm}"`;
             description += ". Try adjusting criteria or clearing filters.";
         } else {
             const startItem = (currentPage - 1) * itemsPerPage + 1;
             const endItem = Math.min(startItem + itemsPerPage - 1, count);
             title = `Found ${count} Question${count !== 1 ? 's' : ''} in ${selectedSubject.name}`;
             description = `Showing ${startItem}-${endItem} of ${count}`;
             if (searchTerm) description += ` matching "${searchTerm}"`;
             // Check if any specific filters are active
              const filtersActive = ['year', 'type', 'chapter', 'marks'].some(type => {
                  const allCb = document.getElementById(`all-${type}s`);
                  return allCb && !allCb.checked;
              });
             if (filtersActive) description += ` (filtered)`;
             if (totalPages > 1) description += `. Page ${currentPage} of ${totalPages}`;
         }
         resultsTitle.textContent = title;
         resultsDescription.textContent = description;
     }

    // --- Display No Results Message --- (Mostly similar)
     function displayNoResultsMessage() {
        questionsList.innerHTML = ''; // Clear list area
        const noResultsDiv = document.createElement('div');
        noResultsDiv.className = "flex flex-col justify-center items-center h-auto text-center p-8 py-16 bg-white rounded-lg border border-dashed border-indigo-200 shadow-sm mt-4";
        const searchTerm = searchInput.value.trim();
        let message = `No questions match your current filters for ${selectedSubject?.name || 'this subject'}.`;
        if (searchTerm) message = `No questions found matching "${searchTerm}" with the selected filters for ${selectedSubject?.name || 'this subject'}.`

        noResultsDiv.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-16 h-16 text-indigo-300 mb-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p class="text-slate-700 text-lg font-semibold mb-1">No Matching Questions</p>
            <p class="text-slate-500 text-sm max-w-xs mb-5">${message}</p>
            <button id="clear-search-filters" class="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150">
                Clear Filters & Search
            </button>
        `;
        questionsList.appendChild(noResultsDiv);
        const clearButton = document.getElementById('clear-search-filters');
        if (clearButton) clearButton.addEventListener('click', resetCurrentFilters); // Use specific reset
    }

    // --- Reset Filters for Current Subject ---
    function resetCurrentFilters() {
        console.log("Resetting filters for current subject...");
        // Reset checkboxes in sidebar
         document.querySelectorAll('#filters-container input[type="checkbox"]').forEach(cb => {
             cb.checked = cb.id.startsWith('all-'); // Check 'all' boxes, uncheck others
         });
         // Reset search
         searchInput.value = '';
         currentSearchTerm = '';
         // Re-apply filters to show all questions for the subject
         applyFiltersAndSearch();

        // Close sidebar on mobile after reset
        if (window.innerWidth < 768 && sidebar.classList.contains('open-sidebar')) {
            toggleSidebar();
        }
    }
     resetFiltersButton.addEventListener('click', resetCurrentFilters);


    // --- Pagination (Should work similarly, using filteredQuestions) ---
    function updatePaginationControls(totalItems, totalPages) {
        paginationControlsContainer.innerHTML = '';
        if (totalPages <= 1) {
            paginationControlsContainer.classList.add('hidden');
            return;
        }
        paginationControlsContainer.classList.remove('hidden');

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '← Prev';
        prevButton.disabled = currentPage === 1;
        prevButton.addEventListener('click', () => goToPage(currentPage - 1));
        paginationControlsContainer.appendChild(prevButton);

        const pageInfo = document.createElement('span');
        pageInfo.id = 'pagination-info';
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        paginationControlsContainer.appendChild(pageInfo);

        const nextButton = document.createElement('button');
        nextButton.innerHTML = 'Next →';
        nextButton.disabled = currentPage === totalPages;
        nextButton.addEventListener('click', () => goToPage(currentPage + 1));
        paginationControlsContainer.appendChild(nextButton);
    }

    function goToPage(page) {
        const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            displayFilteredQuestions(); // Re-display questions for the new page
            document.getElementById('main-content').scrollTop = 0; // Scroll to top
        }
    }

    // --- Search Input Listener ---
     let searchTimeout;
     searchInput.addEventListener('input', () => {
         clearTimeout(searchTimeout);
         searchTimeout = setTimeout(() => {
             applyFiltersAndSearch();
         }, 350); // Slightly longer delay maybe
     });

    // --- Sidebar Toggle Logic (Remains the same) ---
     function toggleSidebar() {
        // Only allow toggle if sidebar is enabled (i.e., question view is active)
        if(sidebarToggleButton.disabled) return;

        const isOpen = sidebar.classList.contains('open-sidebar');
        const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const firstFocusableElement = sidebar.querySelector(focusableElements);

        if (isOpen) {
            sidebar.classList.remove('open-sidebar');
            sidebarOverlay.classList.remove('active');
            sidebarToggleButton.setAttribute('aria-expanded', 'false');
            if (window.innerWidth >= 768) mainContent.classList.remove('main-content-shifted');
            sidebarToggleButton.focus();
        } else {
            sidebar.classList.add('open-sidebar');
            sidebarOverlay.classList.add('active');
            sidebarToggleButton.setAttribute('aria-expanded', 'true');
            if (window.innerWidth >= 768) mainContent.classList.add('main-content-shifted');
            setTimeout(() => {
                if (resetFiltersButton && !resetFiltersButton.disabled) resetFiltersButton.focus();
                else if (firstFocusableElement) firstFocusableElement.focus();
            }, 300);
        }
    }
    sidebarToggleButton.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && sidebar.classList.contains('open-sidebar') && !sidebarToggleButton.disabled) {
            toggleSidebar();
        }
    });
    // Window resize handler (Similar, manage main content shift based on sidebar state)
    window.addEventListener('resize', () => {
        const isOpen = sidebar.classList.contains('open-sidebar');
        if(sidebarToggleButton.disabled) { // If sidebar shouldn't be open
             mainContent.classList.remove('main-content-shifted');
             sidebarOverlay.classList.remove('active');
             sidebar.classList.remove('open-sidebar');
             return;
        }
        if (window.innerWidth >= 768) {
            sidebarOverlay.classList.remove('active'); // No overlay needed on desktop
            if (isOpen) mainContent.classList.add('main-content-shifted');
            else mainContent.classList.remove('main-content-shifted');
             // Ensure sidebar remains open/closed consistently on resize if enabled
             if (isOpen && !sidebar.style.transform) sidebar.classList.add('open-sidebar');
        } else { // Mobile
            mainContent.classList.remove('main-content-shifted'); // No shift on mobile
            if (isOpen) sidebarOverlay.classList.add('active');
            else sidebarOverlay.classList.remove('active');
        }
    });


    // --- Initialization ---
    function initialize() {
        // Set initial state
         selectedBranch = null;
         selectedSemester = null;
         selectedSubject = null;
         currentView = 'branch';
         // Display initial view
         displayBranches();
         // Disable filters/search initially
         searchInput.disabled = true;
         resetFiltersButton.disabled = true;
         sidebarToggleButton.disabled = true;
         // Set initial sidebar visual state (closed, no content shift)
         sidebar.classList.remove('open-sidebar');
         mainContent.classList.remove('main-content-shifted');
         sidebarToggleButton.setAttribute('aria-expanded', 'false');
         sidebarOverlay.classList.remove('active');

         verificationFooter.textContent = "Select Branch, Semester, and Subject to begin."; // Initial footer text
    }

    // --- Start the application ---
    initialize();

});