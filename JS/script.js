// #######################################################################
// LOADING PAGE
// #######################################################################

async function init() {
    loadHeader();
    loadContent();
    loadFooter();
}

async function getData() {
    const dataset = await ((await fetch('../database.json')).json());
    const data = dataset.orders;

    log(data)
}