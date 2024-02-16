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
    renderOrders('mla');
};



// RENDER FUNCTIONS 

async function renderOrders(attr) {
    const data = await getData(attr);

    setDatabaseStyle(attr);
    getTasks(data, attr);
}

function getTasks(data, attr) {
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


function setDatabaseStyle(attr) {
    const headerContainer = $('header');

    headerContainer.classList.remove('mla', 'pha');
    headerContainer.classList.add(attr);
}



// TEMPLATE

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