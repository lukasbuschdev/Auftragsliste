// LOADING PAGE

async function init() {
    loadHeader();
    loadContent();
    loadFooter();
}



// GET DATA FROM DATABASE

async function getData() {
    const dataset = await (await fetch(`../database.json`)).json();
    const data = dataset.orders;

    const newData = sortOrdersByLocation(data);

    const categorizedOrders = categorizeOrdersByDate(newData);

    const orders = sortOrdersByDate(categorizedOrders);
    return orders;
}

function sortOrdersByLocation(data) {
    const ordersPHA = data.filter(order => order.location === 'pha');
    const ordersMLA = data.filter(order => order.location === 'mla');

    return {
        ordersPHA,
        ordersMLA
    }
}

// async function getData(attr = 'pha') {
//     const dataset = await (await fetch(`../database-${attr}.json`)).json();
//     const data = dataset.orders;

//     const categorizedOrders = categorizeOrdersByDate(data);
//     log(categorizedOrders)
//     const orders = sortOrdersByDate(categorizedOrders);
//     return orders;
// }



// DATA DEVISION AND SORTING

function categorizeOrdersByDate({ordersPHA, ordersMLA}) {
    const ordersByDatePHA = categorizedOrdersPHA(ordersPHA);
    const ordersByDateMLA = categorizedOrdersMLA(ordersMLA);

    return {
        ordersByDatePHA,
        ordersByDateMLA
    }
}

function categorizedOrdersPHA(ordersPHA) {
    const currentDate = new Date();

    let urgentPHA = [];
    let mediumPHA = [];
    let lowPHA = [];

    ordersPHA.forEach(order => {
        const deliveryDate = parseDate(order.deliverydate);
        const diffTime = deliveryDate.getTime() - currentDate.getTime();
        const diffDays = Math.abs(diffTime / (1000 * 3600 * 24));

        if(diffDays > 30) return urgentPHA.push(order);
        if(diffDays > 7 && diffDays <= 30) return mediumPHA.push(order);
        if(diffDays > 1 && diffDays <= 7) return lowPHA.push(order);       
    });

    return { 
        urgentPHA, mediumPHA, lowPHA
    };
}

function categorizedOrdersMLA(ordersMLA) {
    const currentDate = new Date();

    let urgentMLA = [];
    let mediumMLA = [];
    let lowMLA = [];

    ordersMLA.forEach(order => {
        const deliveryDate = parseDate(order.deliverydate);
        const diffTime = deliveryDate.getTime() - currentDate.getTime();
        const diffDays = Math.abs(diffTime / (1000 * 3600 * 24));

        if(diffDays > 30) return urgentMLA.push(order);
        if(diffDays > 7 && diffDays <= 30) return mediumMLA.push(order);
        if(diffDays > 1 && diffDays <= 7) return lowMLA.push(order);       
    });

    return { 
        urgentMLA, mediumMLA, lowMLA 
    };
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split(".");
    return new Date(year, month - 1, day);
}

function sortOrdersByDate({ordersByDatePHA, ordersByDateMLA}) {
    // log(ordersByDatePHA)
    // log(ordersByDateMLA)

    const parseDateForSorting = (dateStr) => {
        const [day, month, year] = dateStr.split(".");
        return parseInt(year + month + day, 10);
    };

    for(const category in ordersByDatePHA) {
        ordersByDatePHA[category].sort((a, b) => {
            const dateA = parseDateForSorting(a.deliverydate);
            const dateB = parseDateForSorting(b.deliverydate);
            return dateA - dateB;
        });
    }

    for(const category in ordersByDateMLA) {
        ordersByDateMLA[category].sort((a, b) => {
            const dateA = parseDateForSorting(a.deliverydate);
            const dateB = parseDateForSorting(b.deliverydate);
            return dateA - dateB;
        });
    }

    return {
        ordersByDatePHA, ordersByDateMLA
    };
}