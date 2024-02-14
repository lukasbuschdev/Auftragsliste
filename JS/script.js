// LOADING PAGE

async function init() {
    loadHeader();
    loadContent();
    loadFooter();
}



// GET DATA FROM DATABASE

async function getData(attr = 'pha') {
    const dataset = await (await fetch(`../database-${attr}.json`)).json();
    const data = dataset.orders;

    const categorizedOrders = categorizeOrdersByDate(data);
    const orders = sortOrdersByDate(categorizedOrders);
    return orders;
}



// DATA DEVISION AND SORTING

function categorizeOrdersByDate(orders) {
    const currentDate = new Date();
    let urgent = [];
    let medium = [];
    let low = [];

    orders.forEach(order => {
        const deliveryDate = parseDate(order.deliverydate);
        const diffTime = deliveryDate.getTime() - currentDate.getTime();
        const diffDays = Math.abs(diffTime / (1000 * 3600 * 24));

        if(diffDays > 30) return urgent.push(order);
        if(diffDays > 7 && diffDays <= 30) return medium.push(order);
        if(diffDays > 1 && diffDays <= 7) return low.push(order);       
    });

    return { urgent, medium, low };
}

function parseDate(dateStr) {
    const [day, month, year] = dateStr.split(".");
    return new Date(year, month - 1, day);
}

function sortOrdersByDate(categorizedOrders) {
    const parseDateForSorting = (dateStr) => {
        const [day, month, year] = dateStr.split(".");
        return parseInt(year + month + day, 10);
    };

    for(const category in categorizedOrders) {
        categorizedOrders[category].sort((a, b) => {
            const dateA = parseDateForSorting(a.deliverydate);
            const dateB = parseDateForSorting(b.deliverydate);
            return dateA - dateB;
        });
    }

    return categorizedOrders;
}