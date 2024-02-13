// INIT LOAD CONTENT

async function loadContent(attr) {
    const data = await getData(attr);

    const contentContainer = $('#content');

    const content = /*html*/ `
        <div class="table-header">
            <div>> 1M</div>
            <div>> 1W < 1M</div>
            <div>> 1T < 1W</div>
        </div>


        <div class="table-content">
            <div id="urgent"></div>
            <div id="medium"></div>
            <div id="low"></div>
        </div>
    `;

    includeTemplate(contentContainer, content);
    renderOrders(data);
};



// RENDER FUNCTIONS 

function renderOrders(data) {
    renderTasks(data)
}

function renderTasks(tasks) {
    ['urgent', 'medium', 'low'].forEach((category) => {
        const container = $(`#${category}`);
        container.innerHTML = tasks[category].reduce((template, task) => `${template}${urgentTemplate(task)}`, '');
    });
}



// TEMPLATES

function urgentTemplate({customer, ordernumber, orderdate, deliverydate}) {
    return /*html*/ `
        <div class="single-order-container column">
            <div class="row">
                <div class="txt-600">${ordernumber}</div>
                <div>${customer.name}</div>
            </div>

            <div class="address">
                <div>${customer.address}</div>
            </div>

            <div class="row">
                <div>${orderdate}</div>
                <div>${deliverydate}</div>
            </div>
        </div>
    `;
}