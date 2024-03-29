// INIT LOAD CONTENT

function loadContent() {
    const contentContainer = $('#content');

    const content = /*html*/ `
        <div class="table-header">
            <div class="drafts-light">Entwürfe</div>
            <div class="urgent-light">> 1M</div>
            <div class="medium-light">> 1W < 1M</div>
            <div class="low-light">> 1T < 1W</div>
        </div>

        <div class="table-content">
            <div id="drafts"></div>
            <div id="urgent"></div>
            <div id="medium"></div>
            <div id="low"></div>
        </div>
    `;

    includeTemplate(contentContainer, content);
    selectDatabase();
};

function selectDatabase() {
    let currentAttr = 'pha';
    // let currentAttr = 'mla';

    renderOrders(currentAttr);

    // setInterval(() => {
    //     currentAttr = currentAttr === 'pha' ? 'mla' : 'pha';
    //     renderOrders(currentAttr);
    // }, 5000);
}



// RENDER FUNCTIONS 

async function renderOrders(attr) {
    const data = await getData(attr);

    // setDatabaseStyle(attr);
    renderTasks(data, attr);
}

function renderTasks(data, attr) {
    const dataSet = attr === 'mla' ? data.ordersMLA : data.ordersPHA;

    ['urgent', 'medium', 'low'].forEach(category => {
        const tasks = dataSet[category];
        const container = document.getElementById(category);

        container.innerHTML = '';

        tasks.forEach(task => {
            container.innerHTML += taskTemplate(task);
        });
    });
}


// function setDatabaseStyle(attr) {
//     const headerContainer = $('header');

//     headerContainer.classList.remove('mla', 'pha');
//     headerContainer.classList.add(attr);
// }



// TEMPLATE

function taskTemplate({customer, ordernumber, orderdate, deliverydate}) {
    const address = customer.address.split(',');
    const formattedAddress = address[1].trim();

    return /*html*/ `
        <div class="single-order-container column txt-600">
            <div class="row">
                <div class="txt-giant">${ordernumber}</div>
                <div class="name-container txt-big">${customer.name}</div>
            </div>
            
            <div class="row txt-normal name-address-container">
                <div class="column dates-container">
                    <div class="txt-normal">${orderdate}</div>
                    <div class="txt-normal">${deliverydate}</div>
                </div>
                <div class="address-container">${formattedAddress}</div>
            </div>
        </div>
    `;
}