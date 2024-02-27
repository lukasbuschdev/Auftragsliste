// INIT LOAD CONTENT

function loadContent() {
    const contentContainer = $('#content');

    const content = /*html*/ `
        ${tableHeaderTemplate()}
        ${tableContentTemplate()}
    `;

    includeTemplate(contentContainer, content);
    selectDatabase();
};



// TABLE TEMPLATES (HEADER / TABLE BODY)

function tableHeaderTemplate() {
    return /*html*/ `
        <div class="table-header">
            <div id="urgent-heading" class="urgent-light">
                <div>
                    <span>> 1M</span>
                    <div id="counter-urgent"></div>
                </div>
                <div class="legend"></div>
            </div>

            <div id="medium-heading" class="medium-light">
                <div>
                    <span>> 1W < 1M</span>
                    <div id="counter-medium"></div>
                </div>
                <div class="legend"></div>
            </div>
            
            <div id="low-heading" class="low-light">
                <div>
                    <span>> 1T < 1W</span>
                    <div id="counter-low"></div>
                </div>
                <div class="legend"></div>
            </div>
        </div>
    `;
}

function tableContentTemplate() {
    return /*html*/ `
        <div class="table-content">
            <div id="urgent"></div>
            <div id="medium"></div>
            <div id="low"></div>
        </div>
    `;
}



// DATABASE SELECTION AND AUTOMATIC CHANGE

function selectDatabase() {
    let currentAttr = 'mla';

    renderOrders(currentAttr);

    setInterval(() => {
        currentAttr = currentAttr === 'pha' ? 'mla' : 'pha';
        renderOrders(currentAttr);
    }, 50000);
}



// RENDER FUNCTIONS 

async function renderOrders(attr) {
    const data = await getData(attr);
    renderTasks(data, attr);
}

function renderTasks(data, attr) {
    const dataSet = attr === 'mla' ? data.ordersMLA : data.ordersPHA;

    ['urgent', 'medium', 'low'].forEach(category => {
        const tasks = dataSet[category];
        const container = document.getElementById(category);

        if(!container) {
            error(`Container not found for category: ${category}`);
            return;
        }

        container.innerHTML = '';

        tasks.forEach(task => {
            container.innerHTML += taskTemplate(task);
        });
    });
}



// TEMPLATE OF ORDERS

function taskTemplate({customer, ordernumber, orderdate, deliverydate}) {
    const address = customer.address.split(',');
    const formattedAddress = address[1].trim();

    return /*html*/ `
        <div class="single-order-container column txt-600">
            <div class="row">
                <div class="txt-giant">${ordernumber}</div>
                <div class="row dates-container">
                    <div class="txt-normal">${orderdate}</div>
                    <div class="txt-normal">${deliverydate}</div>
                </div>
            </div>

            <div class="row txt-normal name-address-container">
                <div>${customer.name}</div>
                <div>${formattedAddress}</div>
            </div>
        </div>
    `;
}