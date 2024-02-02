// INIT LOAD CONTENT

async function loadContent() {
    const data = await getData();

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
    renderUrgent(data);
    renderMedium(data);
    renderLow(data);
}

function renderUrgent({moreThanAMonth}) {
    // log(moreThanAMonth)
    const urgentContainer = $('#urgent');
    urgentContainer.innerHTML = '';

    moreThanAMonth.forEach(element => {
        urgentContainer.innerHTML += urgentTemplate(element);
    });
}

function renderMedium({oneWeekToOneMonth}) {
    // log(oneWeekToOneMonth)
    const mediumContainer = $('#medium');
    mediumContainer.innerHTML = '';

    oneWeekToOneMonth.forEach(element => {
        mediumContainer.innerHTML += urgentTemplate(element);
    });
}

function renderLow({oneDayToOneWeek}) {
    // log(oneDayToOneWeek)
    const lowContainer = $('#low');
    lowContainer.innerHTML = '';

    oneDayToOneWeek.forEach(element => {
        lowContainer.innerHTML += urgentTemplate(element);
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

function mediumTemplate({customer, ordernumber, orderdate, deliverydate}) {
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

function lowTemplate({customer, ordernumber, orderdate, deliverydate}) {
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