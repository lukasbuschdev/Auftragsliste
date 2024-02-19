// LOADING PAGE

async function init() {
    // loadHeader();
    loadContent();
}



// GET DATA FROM DATABASE

async function getData() {
    const dataset = await fetch(`../database.json`).then(res => res.json());
    const data = dataset.orders;
  
    const sortedData = sortOrdersByLocation(data);
    const categorizedData = categorizeOrdersByDate(sortedData);

    return sortOrdersByDate(categorizedData);
}



// DATA DEVISION AND SORTING

function sortOrdersByLocation(data) {
  return ['pha', 'mla'].reduce((acc, location) => {
    acc[`orders${location.toUpperCase()}`] = data.filter(order => order.location === location);
    return acc;
  }, {});
}

function categorizeOrdersByDate(data) {
  return Object.keys(data).reduce((acc, key) => {
    acc[key] = categorizeOrders(data[key]);
    return acc;
  }, {});
}

function categorizeOrders(orders) {
  const currentDate = new Date();
  const categories = { urgent: [], medium: [], low: [] };

  orders.forEach(order => {
    const deliveryDate = parseDate(order.deliverydate);
    const diffTime = Math.abs(deliveryDate.getTime() - currentDate.getTime());
    const diffDays = diffTime / (1000 * 3600 * 24);

    let category = diffDays > 30 ? 'urgent' : diffDays > 7 ? 'medium' : 'low';
    categories[category].push(order);
  });

  return categories;
}

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split(".");
  return new Date(year, month - 1, day);
}

function sortOrdersByDate(data) {
  Object.values(data).forEach(category => {
    Object.values(category).forEach(orders => {
      orders.sort((a, b) => parseDate(a.deliverydate) - parseDate(b.deliverydate));
    });
  });
  return data;
}  