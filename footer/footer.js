function loadFooter() {
    const footerContainer = $('#footer-container');

    const footerContent = /*html*/ `
        <footer class="row">

        </footer> 
    `;

    includeTemplate(footerContainer, footerContent);
}