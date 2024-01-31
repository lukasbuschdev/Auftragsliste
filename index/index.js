function loadContent() {
    const contentContainer = $('#content');

    const content = /*html*/ `
        <div class="table-header">
            <div></div>
            <div></div>
            <div></div>
        </div>


        <div class="table-content">
            <div></div>
            <div></div>
            <div></div>
        </div>
    `;

    includeTemplate(contentContainer, content);
};