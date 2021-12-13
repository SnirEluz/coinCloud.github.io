
let coinsArray = []
let checked = []

$.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&page=1&per_page=12", status => {
  createDiv(status)
  $(".btnSearchCoin").on("click", function (e) {
    const newStatus = status.filter(({ symbol }) => symbol === $(".InpSearchCoin").val().toLowerCase())
    if (!newStatus.length) {
      $(".coins").html(`<h1 class="noResults">No results for ${$(".InpSearchCoin").val()}</h1>`)
    } else if (checked.some(i => i.symbol.includes($(".InpSearchCoin").val().toUpperCase()))) {
      $(".coins").html("")
      let yesno = "checked"
      createDiv(newStatus, yesno)
    } else {
      $(".coins").html(`<h1 class="noResults">${$(".InpSearchCoin").val()} Are not in Live Reports, pleas mark this coin before search</h1>`)
    }
    $(".checkbox").click(function (e) {
      console.log("wotk")
      if (!checked.some(i => i.id.includes($(this).attr('id'))) && checked.length < 2) {
        checked.push({ id: $(this).attr('id'), symbol: $(this).parent(".switch").siblings(".coinSymbol").text(), checked: $('.checkbox').is(':checked') })
        console.log("another One")
        $(".watchListCoins").html($(".watchListCoins").html() + `
              <div id="${$(this).attr('id')}" class="watchListCoin">
                <label class="watchListCoinSwich">
                    <input id="${$(this).attr('id')}" class="watchListCoinCheckbox" type="checkbox"  checked=${$('.checkbox').is(':checked')}>
                    <span id="${$(this).attr('id')}" class="slider round"></span>
                </label>
                <h1 id="watchListCoinName${$(this).attr('id')}" class="watchListCoinName">${$(this).parent(".switch").siblings(".coinName").text()}</h1>
                <h2 id="watchListCoinBtc${$(this).attr('id')}" class="watchListCoinBtc">${$(this).parent(".switch").siblings(".coinSymbol").text().toUpperCase()}</h1>
              </div>
            `);
      } else if (checked.some(i => i.id.includes($(this).attr('id')))) {
        checked = checked.filter(function (a) { return a.id != `${$(e.target).attr('id')}` })
        $(".watchListCoins").children(`#div${$(this).attr('id')}`).remove();
        console.log("remove One")
      }
    })
  })

  $(".checkbox").click(function (e) {
    // !checked.some(i => i.id.includes($(this).attr('id')))
    if (!checked.some(i => i.id.includes($(this).attr('id'))) && checked.length < 2) {
      console.log("1")
      checked.push({
        id: $(this).attr('id'),
        name: $(this).parent(".switch").siblings(".coinName").text(),
        symbol: $(this).parent(".switch").siblings(".coinSymbol").text(),
        checked: $('.checkbox').is(':checked')
      })
    } else if (checked.some(i => i.id.includes($(this).attr('id')))) {
      console.log("2")
      checked = checked.filter(function (a) { return a.id != `${$(e.target).attr('id')}` })
    } else if (checked.length >= 2) {
      console.log("3")
      $(".watchList, .lightBox").css("display", "block")
      checked.push({
        id: $(this).attr('id'),
        name: $(this).parent(".switch").siblings(".coinName").text(),
        symbol: $(this).parent(".switch").siblings(".coinSymbol").text(),
        checked: $('.checkbox').is(':checked')
      })
    }
    console.log(checked)
    displayDialog(checked);
  })
  function displayDialog() {
    $(".watchListCoin").remove()
    for (let i = 0; i < checked.length - 1; i++) {
      $(".watchListCoins").html($(".watchListCoins").html() + `
          <div id="${checked[i].name}" class="watchListCoin">
            <label class="watchListCoinSwich">
                <input id="${checked[i].id}" class="watchListCoinCheckbox" type="checkbox"  checked=${$('.checkbox').is(':checked')}>
                <span id="${checked[i].name}" class="slider round"></span>
            </label>
            <h1 id="watchListCoinName${checked[i].name}" class="watchListCoinName">${checked[i].name}</h1>
            <h2 id="watchListCoinBtc${checked[i].name}" class="watchListCoinBtc">${checked[i].symbol.toUpperCase()}</h1>
          </div>
        `);
    }
    $(".watchListCoinCheckbox").click(function (e) {
      $(`.${$(e.target).attr('id')}`).prop('checked', false);
      $(".watchList, .lightBox").css("display", "none")
      checked = checked.filter(function (a) { return a.id != `${$(e.target).attr('id')}` })
      console.log(checked)
      console.log("4")
    });
  }
  $(".headerWatchListExit").click((e) => {
    console.log("work")
    $(".watchList").css("display", "none")
    $(".lightBox").css("display", "none")
    $(`.${checked[checked.length - 1].id}`).prop('checked', false);
    checked.splice(-1)
  })
  // --------------------------Menu------------------------- //
  $(".btnCoins").click(() => {
    $(".coins, .InpSearchCoin, .btnSearchCoin").show()
    $(".liveReports, .about").hide()
    $(".InpSearchCoin").val("")
    $(".coin, .noResults").remove()
    let yesno = "checked"
    createDiv(status)

  })
  $(".btnLiveReports").click(() => {
    $(".liveReports").show()
    $(".coins, .about, .InpSearchCoin, .btnSearchCoin").hide()
  })
  $(".btnAbout").click(() => {
    $(".about").show()
    $(".coins, .liveReports, .InpSearchCoin, .btnSearchCoin").hide()
  })
});
// -----------------------CreateDiv----------------------- //
function createDiv(status, checked) {
  const statusD = status.filter(coin => coin.symbol.toLowerCase().includes($(".InpSearchCoin").val().toLowerCase()))
  for (let i = 0; i < statusD.length; i++) {
    $(".coins").html($(".coins").html() + `
        <div class="coin">
          <label class="switch">
              <input id=${statusD[i].id}  class="checkbox ${statusD[i].id}" type="checkbox" ${checked}>
              <span id=${statusD[i].id} class="slider round"></span>
          </label>
          <h1 class="coinSymbol">${statusD[i].symbol.toUpperCase()}</h1>
          <h1 class="coinName">${statusD[i].name}</h1>
          <button id=${statusD[i].id} class="moreInfo">More Info</button>

          <div class="collapser">
            <img class="imgCoin" src""></img>
            <p class="price">Price</p>
            <h1 class="priceUsd">0 USD</h1>
            <h1 class="priceEur">0 EUR</h1>
            <h1 class="priceIls">0 ILS</h1>
            <div class="loading">Loading...</div>
          </div>
        </div>
      `)
  }
  $(".moreInfo").click(function () {
    $(this).siblings(".collapser").slideToggle("slow")
    if ((!coinsArray.some(i => i.id.includes($(this).attr('id'))))) {
      $(this).siblings(".collapser").children(".loading").css("display", "flex")
      $.get(`https://api.coingecko.com/api/v3/coins/${$(this).attr('id')}`, async data => {
        await $(this).siblings(".collapser").children(".imgCoin").attr("src", `${data.image.large}`);
        await $(this).siblings(".collapser").children(".priceUsd").text(`${data.market_data.current_price.usd.toLocaleString("en-US")} USD`)
        await $(this).siblings(".collapser").children(".priceEur").text(`${data.market_data.current_price.eur.toLocaleString("en-US")} EUR`)
        await $(this).siblings(".collapser").children(".priceIls").text(`${data.market_data.current_price.ils.toLocaleString("en-US")} ILS`)
        $(this).siblings(".collapser").children(".loading").css("display", "none")
        coinsArray.push({
          id: $(this).attr('id'),
          imgCoin: data.image.large,
          priceUsd: data.market_data.current_price.usd,
          priceEur: data.market_data.current_price.eur,
          priceIls: data.market_data.current_price.ils
        })
        localStorage.setItem("coinsLS", JSON.stringify(coinsArray))
        console.log(data, "Call to Server")
      });
    } else if (coinsArray.some(i => i.id.includes($(this).attr('id')))) {
      let indexOf = coinsArray.findIndex((index) => { return index.id == $(this).attr('id') })
      $(this).siblings(".collapser").children(".imgCoin").attr("src", `${coinsArray[indexOf].imgCoin}`);
      $(this).siblings(".collapser").children(".priceUsd").text(`${coinsArray[indexOf].priceUsd.toLocaleString("en-US")} USD`)
      $(this).siblings(".collapser").children(".priceEur").text(`${coinsArray[indexOf].priceEur.toLocaleString("en-US")} EUR`)
      $(this).siblings(".collapser").children(".priceIls").text(`${coinsArray[indexOf].priceIls.toLocaleString("en-US")} ILS`)
    }
  })
}

// --------------------------LS------------------------- //
if (localStorage.getItem("coinsLS")) {
  coinsstatusD = JSON.parse(localStorage.getItem("coinsLS"))
}
//---------clear
(function clearStorage() {
  setInterval(() => { localStorage.clear(), coinsArray = [] }, 120000);
}());//

// --------------------------Chart------------------------- //
function hellow() {
  $.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD", coins => {
    let d = 3
    var chart = new CanvasJS.Chart("chartContainer", {
      title: {
        text: "Crypto"
      },
      axisY: [
        {
          title: "Bitcoin",
          lineColor: "#ff0000",
          tickColor: "#ff0000",
          labelFontColor: "#ff0000",
          titleFontColor: "#ff0000",
          includeZero: true,
          suffix: "k"
        },
        {
          title: "Etherum",
          lineColor: "#369EAD",
          tickColor: "#369EAD",
          labelFontColor: "#369EAD",
          titleFontColor: "#369EAD",
          includeZero: true,
          suffix: "k"
        }
      ],
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: toggleDataSeries
      },
      data: [
        // ETH
        {
          type: "line",
          name: "Bitcoin",
          color: "#ff0000",
          axisYIndex: 0,
          showInLegend: true,
          dataPoints: [
            { x: new Date(2017, 00, 1), y: 14.4 },
            { x: new Date(2017, 00, 2), y: 10.4 },
          ]
        },
        // BTC
        // {
        //   type: "line",
        //   name: "Etherum",
        //   color: "#369EAD",
        //   showInLegend: true,
        //   axisYIndex: 1,
        //   dataPoints: [
        //     { x: new Date(2017, 00, 7), y: 10.4 },
        //     { x: new Date(2017, 00, 9), y: 85.4 },
        //   ]
        // },
      ],
    });
    chart.render();
    function toggleDataSeries(e) {
      if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
    setInterval(() => {
      // console.log(coins.BTC.USD)
      chart.data[0].dataPoints.push({ x: new Date(2017, 00, d++), y: coins.BTC.USD })
      console.log(chart.data[0].dataPoints)

    }, 2000);

  })
}
let chartt = {
  data: [
    {
      dataPoints: [
        { x: new Date(2017, 00, 7), price: 10 }
      ]
    }
  ]
}
