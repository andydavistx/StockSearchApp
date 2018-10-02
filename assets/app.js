const stocks = ['FB', 'AAPL', 'TSLA', 'GOOG'];

const displayStockInfo = function () {
 
  const stock = $(this).attr('data-name');
  const queryURL = `https://api.iextrading.com/1.0/stock/${stock}/batch?types=quote,news,logo&range=1m&last=1`;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(response);

    const stockDiv = $('<div>').addClass('stock');

    const companyName = response.quote.companyName;

    const nameHolder = $('<p>').text(`Company Name: ${companyName}`);

    stockDiv.append(nameHolder);

    const stockSymbol = response.quote.symbol;

    const symbolHolder = $('<p>').text(`Stock Symbol: ${stockSymbol}`);

    stockDiv.append(symbolHolder);

    const stockPrice = response.quote.latestPrice;

    const priceHolder = $('<p>').text(`Stock Price: $${stockPrice}`);

    stockDiv.append(priceHolder);

    const companyNews = response.news[0].summary;

    const summaryHolder = $('<p>').text(`News Headline: ${companyNews}`);

    stockDiv.append(summaryHolder);

    // const companyLogo = response.quote.logo;

    const companyLogo = response.logo.url;

    const logoHolder = $(`<img src="${companyLogo}"/>`);

    // const logoHolder = $(`<p>`).text(`Stock Logo: ${companyLogo}`);

    stockDiv.append(logoHolder);

    // stockDiv.append(`<img src=${companyLogo}/>`);
    
    $('#stocks-view').prepend(stockDiv);
  });

}

const render = function () {

  $('#buttons-view').empty();

  for (let i = 0; i < stocks.length; i++) {

    const newButton = $('<button>');
    
    newButton.addClass('stock-btn');
    
    newButton.attr('data-name', stocks[i]);
    
    newButton.text(stocks[i]);
    
    $('#buttons-view').append(newButton);
  }
}

const addButton = function(event) {

  event.preventDefault();

  const stock = $('#stock-input').val().trim();
  
  stocks.push(stock);

  $('#stock-input').val('');

  render();
}

$('#add-stock').on('click', addButton);

$('#buttons-view').on('click', '.stock-btn', displayStockInfo);

render();