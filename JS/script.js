// LOADING PAGE

async function init() {
    loadHeader();
    loadContent();
    loadFooter();
}

async function getData() {
    const dataset = await ((await fetch('../database.json')).json());
    const data = dataset.orders;

    const categorizedOrders = categorizeOrdersByDate(data);
    log(categorizedOrders);
    const orders = sortOrdersByDate(categorizedOrders);
    return orders;
}

function categorizeOrdersByDate(orders) {
    const currentDate = new Date();
    let moreThanAMonth = [];
    let oneWeekToOneMonth = [];
    let oneDayToOneWeek = [];

    orders.forEach(order => {
        const deliveryDate = parseDate(order.deliverydate);
        const diffTime = deliveryDate.getTime() - currentDate.getTime();
        const diffDays = Math.abs(diffTime / (1000 * 3600 * 24));

        if(diffDays > 30) return moreThanAMonth.push(order);
        if(diffDays > 7 && diffDays <= 30) return oneWeekToOneMonth.push(order);
        if(diffDays > 1 && diffDays <= 7) return oneDayToOneWeek.push(order);       
    });

    return { moreThanAMonth, oneWeekToOneMonth, oneDayToOneWeek };
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
