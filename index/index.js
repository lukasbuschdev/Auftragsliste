// INIT LOAD CONTENT

function loadContent() {
    const contentContainer = $('#content');

    const content = /*html*/ `
        <div class="table-header">
            <div class="urgent-light">> 1M</div>
            <div class="medium-light">> 1W < 1M</div>
            <div class="low-light">> 1T < 1W</div>
        </div>

        <div class="table-content">
            <div id="urgent"></div>
            <div id="medium"></div>
            <div id="low"></div>
        </div>
    `;

    includeTemplate(contentContainer, content);
    renderOrders();
};



// RENDER FUNCTIONS 

async function renderOrders(attr) {
    const data = await getData(attr);
    log(data)

    const dataPHA = data.ordersByDatePHA;
    // const dataMLA = data.ordersByDateMLA;

    renderTasksPHA(dataPHA);
    // renderTasksMLA(data);
    setDatabaseStyle(attr);
}

function renderTasksPHA(tasks) {
    ['urgentPHA', 'mediumPHA', 'lowPHA'].forEach((category) => {
        // log(category)
        const container = $(`#${category}`);
        container.innerHTML = tasks[category].reduce((template, task) => `${template}${taskTemplate(task)}`, '');
    });
}

function renderTasksMLA(tasks) {
    ['urgentMLA', 'mediumMLA', 'lowMLA'].forEach((category) => {
        // log(category)
        const container = $(`#${category}`);
        container.innerHTML = tasks[category].reduce((template, task) => `${template}${taskTemplate(task)}`, '');
    });
}

function setDatabaseStyle(attr) {
    const headerContainer = $('header');

    headerContainer.classList.remove('mla', 'pha');
    headerContainer.classList.add(attr);
}



// TEMPLATES

function taskTemplate({customer, ordernumber, orderdate, deliverydate}) {
    const formattedAddress = customer.address.replace(/,/, ',<br>');

    return /*html*/ `
        <div class="single-order-container column txt-600">
            <div class="row txt-big">
                <div>${ordernumber}</div>
                <div class="flex-center">${orderdate}</div>
                <div class="flex-center">${deliverydate}</div>
            </div>

            <div class="row txt-normal">
                <div>${formattedAddress}</div>
                <div>${customer.name}</div>
            </div>
        </div>
    `;
}