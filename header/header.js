function loadHeader() {
    const headerContainer = $('#header-container');

    const headerContent = /*html*/ `
        <header class="flex-center">
            <div class="location-container">
                <button onclick="selectDatabase('pha')">PHA</button>
                <button onclick="selectDatabase('mla')">MLA</button>
            </div>
        </header>
    `;

    includeTemplate(headerContainer, headerContent);
};

function selectDatabase(pha, mla) {
    // const 
}