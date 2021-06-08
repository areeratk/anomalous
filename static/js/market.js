function updatechart() {
    var dateControl = document.querySelector("#chooseDate")
    var mydate = new Date(dateControl.value);
    

    mydate = new Date(mydate.setDate(mydate.getDate() - 7))
    mydate = mydate.toISOString().split('T')[0]
    d3.csv("../static/data/wsb_lmkt.csv").then((data) => {

       

      
     
        var fildata = data.filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))

        var trace = {
            type: "scatter",
            mode: "lines",
            name:"change in price",
            x: fildata.map(dataday => dataday.date),
            y: fildata.map(dataday => dataday.change),
            line: {color: "#008000"}
        }
        var trace2 = {
            type: "scatter",
            mode: "lines",
            name:"closing price",
            x: fildata.map(dataday => dataday.date),
            y: fildata.map(dataday => dataday.close),
            line: {color: "#0000FF"}
        }
        Plotly.newPlot("vizContainer_large", [trace])//,trace2])

    })
    d3.json(`/api/wsb/${dateControl.value}`).then(data =>{

        var datadiv = d3.select("#data")
        datadiv.html("");
      for (const[key, value] of Object.entries(data)) {  
          datadiv.append('div').attr('class','col-md-2').html(`${key}:${value[Object.keys(value)[0]] }`)
      }
    })
    d3.json(`/ml/wsb/${dateControl.value}`).then(data =>{   

    var mydiv =  d3.select("#predict")
    var mypreddiv = d3.select('#datapred')
    mydiv.html("");
    mypreddiv.html("");
    if (data.predict){
        var icon_src = "../static/img/greenup.png"
        mydiv.append("img").attr("src", icon_src);     
        mypreddiv.html(`Positive chance = ${data.probpos}`)
    } else {
        var icon_src = "../static/img/reddown.png"
        mydiv.append("img").attr("src", icon_src);
        mypreddiv.html(`Negative chance = ${data.probneg}`)
    }


    })
    
    var promise1 =  d3.csv("../static/data/wsb_lmkt.csv")
    var promise2 =  d3.csv("../static/data/stock_ijr.csv")
    var promise3 =  d3.csv("../static/data/stock_mdy.csv")
    
    var promises=[promise1,promise2,promise3]
    Promise.all(promises).then(data => {
        console.log(data)
  
        var begindate ="2016-01-01"
        var enddate ="2021-04-01"
   

        var fillrge = data[0].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filmid = data[1].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filsmll = data[2].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        // var fillrge = data[0].filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
        // var filmid = data[1].filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
        // var filsmll = data[2].filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
     

        var trace = {
            type: "scatter",
            mode: "lines",
            name:"lrg change in price",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.change),
            yaxis:'y3',
            line: {color: "#E040FB"}
        }



        var trace2 = {
            type: "scatter",
            mode: "lines",
            name:"mid change in price",
            x: filmid.map(dataday => dataday.date),
            y: filmid.map(dataday => dataday.change),
            yaxis:'y3',
            line: {color: "#FF4081"}
        }


        var trace3 = {
            type: "scatter",
            mode: "lines",
            name:"smll change in price",
            x: filsmll.map(dataday => dataday.date),
            y: filsmll.map(dataday => dataday.change),
            yaxis:'y3',
            line: {color: "#FF8A80"}
        }

        var trace4 = {
            type: "scatter",
            mode: "lines",
            name:"econ keyword count",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.Count),
            yaxis:'y1',
            line: {color: "#FBC02D"}
        }

        var trace5 = {
            type: "scatter",
            mode: "lines",
            name:"positive sentiment",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.Pos_Count),
            yaxis:'y2',
            line: {color: "#FFC300"}
        }

        var trace6 = {
            type: "scatter",
            mode: "lines",
            name:"negative sentiment",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.Neg_Count),
            yaxis:'y2',
            line: {color: "#212121"}
        }

        var trace7 = {
            type: "scatter",
            mode: "lines",
            name:"sentiment",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.Sent_Count),
            yaxis:'y2',
            line: {color: "#DAF7A6"}
        }

        var trace8 = {
            type: "scatter",
            mode: "lines",
            name:"favorites",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.favorites),
            yaxis:'y2',
            line: {color: "#6D4D41"}
        }

        var layout = {
            title:"Stock market Data",
            yaxis:{
                    side:'left',title:"Message Count"},
            yaxis2:{overlaying:'y',side:'right', titla:"Action Count"},
            yaxis3:{overlaying:'y',side:'left',position:0.15, title:"Change Rate"}

        }

        Plotly.newPlot("vizContainer_comb", [trace4,trace5,trace6,trace7,trace8,trace,trace2,trace3], layout)//,trace2])


    })



}
