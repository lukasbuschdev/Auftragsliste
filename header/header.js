function loadHeader() {
    const headerContainer = $('#header-container');

    const headerContent = /*html*/ `
        <header class="flex-center pha">
            <div class="location-container">
                <button class="pha" onclick="selectDatabase('pha')">PHA</button>
                <button class="mla" onclick="selectDatabase('mla')">MLA</button>
            </div>
        </header>
    `;

    includeTemplate(headerContainer, headerContent);
};

function selectDatabase(attr) {
    renderOrders(attr);
}