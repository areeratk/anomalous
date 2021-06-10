function loadcomplete(){
    var promise1 =  d3.csv("../static/data/stock_spy.csv")
    var promise2 =  d3.csv("../static/data/stock_ijr.csv")
    var promise3 =  d3.csv("../static/data/stock_mdy.csv")
    var promise4 =  d3.csv("../static/data/trump_lmkt_x.csv")
    var promise5 =  d3.csv("../static/data/trump_mmkt_x.csv")
    var promise6 =  d3.csv("../static/data/trump_smkt_x.csv")
    
    var promises=[promise1,promise2,promise3,promise4,promise5,promise6]
    Promise.all(promises).then(data => {
        console.log(data)
  
        var begindate ="2016-01-01"
        var enddate ="2021-04-01"
   

        var fillrge = data[0].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filmid = data[1].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filsmll = data[2].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filpow = data[3].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filpowmid = data[4].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        var filpowsmall = data[5].filter(dataday => (dataday.date >= begindate && dataday.date <= enddate))
        // var fillrge = data[0].filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
        // var filmid = data[1].filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
        // var filsmll = data[2].filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
     

        var trace = {
            type: "scatter",
            mode: "lines",
            name:"lg_cap %change in price",
            x: fillrge.map(dataday => dataday.date),
            y: fillrge.map(dataday => dataday.change),
            yaxis:'y3',
            line: {color: "#E040FB"}
        }



        var trace2 = {
            type: "scatter",
            mode: "lines",
            name:"md_cap %change in price",
            x: filmid.map(dataday => dataday.date),
            y: filmid.map(dataday => dataday.change),
            yaxis:'y3',
            line: {color: "#FF4081"}
        }


        var trace3 = {
            type: "scatter",
            mode: "lines",
            name:"sm_cap %change in price",
            x: filsmll.map(dataday => dataday.date),
            y: filsmll.map(dataday => dataday.change),
            yaxis:'y3',
            line: {color: "#FF8A80"}
        }

        var trace4 = {
            type: "scatter",
            mode: "lines",
            name:"econ keyword count",
            x: filpow.map(dataday => dataday.date),
            y: filpow.map(dataday => dataday.Count),
            yaxis:'y1',
            line: {color: "#FBC02D"}
        }

        var trace5 = {
            type: "scatter",
            mode: "lines",
            name:"positive sentiment",
            x: filpow.map(dataday => dataday.date),
            y: filpow.map(dataday => dataday.Pos_Count),
            yaxis:'y2',
            line: {color: "#FFC300"}
        }

        var trace6 = {
            type: "scatter",
            mode: "lines",
            name:"negative sentiment",
            x: filpow.map(dataday => dataday.date),
            y: filpow.map(dataday => dataday.Neg_Count),
            yaxis:'y2',
            line: {color: "#212121"}
        }

        
        var trace7 = {
            type: "scatter",
            mode: "lines",
            name:"favorites",
            x: filpow.map(dataday => dataday.date),
            y: filpow.map(dataday => dataday.favorites),
            yaxis:'y2',
            line: {color: "#212121"}
        }

        var trace8 = {
            type: "scatter",
            mode: "lines",
            name:"balance sentiment",
            x: filpow.map(dataday => dataday.date),
            y: filpow.map(dataday => dataday.Sent_Count),
            yaxis:'y2',
            line: {color: "#212121"}
        }


        // var trace7 = {
        //     type: "scatter",
        //     mode: "lines",
        //     name:"sentiment",
        //     x: fillrge.map(dataday => dataday.date),
        //     y: fillrge.map(dataday => dataday.Sent_Count),
        //     yaxis:'y2',
        //     line: {color: "#DAF7A6"}
        // }

        // var trace8 = {
        //     type: "scatter",
        //     mode: "lines",
        //     name:"favorites",
        //     x: fillrge.map(dataday => dataday.date),
        //     y: fillrge.map(dataday => dataday.favorites),
        //     yaxis:'y2',
        //     line: {color: "#6D4D41"}
        // }

        var layout1 = {
            title:"Economic Keyword Count",
        
        }

        
        var layout2 = {
            title:"Positive Sentiment",
        
        }

        
        var layout3 = {
            title:"Negative Sentiment",
        
        }

        var layout8 = {
            title:"Positive-Negative Sentiment",
        
        }

        var layout7 = {
            title:"Favorites",
        
        }

        
        var layout4 = {
            title:"% Change in Large Cap Stock Price",
        
        }

        
        var layout5 = {
            title:"% Change in Mid Cap Stock Price",
        
        }

        
        var layout6 = {
            title:"% Change in Small Cap Stock Price",
        
        }

       

        Plotly.newPlot("vizContainer_comb1", [trace4], layout1)//,trace2])
        // Plotly.newPlot("vizContainer_comb2", [trace5], layout2)//,trace2])

        // Plotly.newPlot("vizContainer_comb3", [trace6], layout3)//,trace2])

        Plotly.newPlot("vizContainer_comb4", [trace], layout4)//,trace2])

        Plotly.newPlot("vizContainer_comb5", [trace2], layout5)//,trace2])

        Plotly.newPlot("vizContainer_comb6", [trace3], layout6)//,trace2])

        Plotly.newPlot("vizContainer_comb7", [trace7,], layout7)//,trace2])

        Plotly.newPlot("vizContainer_comb8", [trace8,], layout8)//,trace2])

        let selector = d3.select('#chooselrge')
        let dates = filpow.map(filpow => filpow.date)
        dates.forEach(element => {
            selector.append("option").text(element).property("value",element)
        });

        let selectormid = d3.select('#choose_mid')
        let datesmid = filpowmid.map(filpow => filpow.date)
        datesmid.forEach(element => {
            selectormid.append("option").text(element).property("value",element)
        });


        let selectorsmall = d3.select('#choose_small')
        let datessmall = filpowsmall.map(filpow => filpow.date)
        datessmall.forEach(element => {
            selectorsmall.append("option").text(element).property("value",element)
        });



    })

}


function updatechartselect(myseldate) {
  
    var mydate = new Date(myseldate);

    mydate = new Date(mydate.setDate(mydate.getDate() - 7))
    mydate = mydate.toISOString().split('T')[0]
    d3.csv("../static/data/trump_lmkt_x.csv").then((data) => {

       

      
     
        var fildata = data.filter(dataday => (dataday.date <= myseldate))
        console.log(fildata)
        var trace = {
            type: "scatter",
            mode: "lines",
            name:"change in price",
            x: fildata.map(dataday => dataday.date),
            y: fildata.map(dataday => dataday.change1day),
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
    d3.json(`/api/wsb/${myseldate}`).then(data =>{

        var datadiv = d3.select("#data")
        datadiv.html("");
      for (const[key, value] of Object.entries(data)) {  
          datadiv.append('div').attr('class','col-md-2').html(`${key}:${value[Object.keys(value)[0]] }`)
      }
    })
    d3.json(`/ml/trump/${myseldate}`).then(data =>{   

    var mydiv =  d3.select("#datapredlrg")
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
    



}

function updatechartselect_mid(myseldate) {
  
    var mydate = new Date(myseldate);

    mydate = new Date(mydate.setDate(mydate.getDate() - 7))
    mydate = mydate.toISOString().split('T')[0]
    d3.csv("../static/data/trump_mmkt.csv").then((data) => {

       

      
     
        var fildata = data.filter(dataday => (dataday.date <= myseldate))
        console.log(fildata)
        var trace = {
            type: "scatter",
            mode: "lines",
            name:"change in price",
            x: fildata.map(dataday => dataday.date),
            y: fildata.map(dataday => dataday.change1day),
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
        Plotly.newPlot("vizContainer_mid", [trace])//,trace2])

    })
    // d3.json(`/api/wsb_mid/${myseldate}`).then(data =>{

    //     var datadiv = d3.select("#data")
    //     datadiv.html("");
    //   for (const[key, value] of Object.entries(data)) {  
    //       datadiv.append('div').attr('class','col-md-2').html(`${key}:${value[Object.keys(value)[0]] }`)
    //   }
    // })
    d3.json(`/ml/trump_mid/${myseldate}`).then(data =>{   

    var mydiv =  d3.select("#datapred_midimg")
    var mypreddiv = d3.select('#datapred_mid')
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
    



}

function updatechartselect_small(myseldate) {
  
    var mydate = new Date(myseldate);

    mydate = new Date(mydate.setDate(mydate.getDate() - 7))
    mydate = mydate.toISOString().split('T')[0]
    d3.csv("../static/data/trump_smkt.csv").then((data) => {

       

      
     
        var fildata = data.filter(dataday => (dataday.date <= myseldate))
        console.log(fildata)
        var trace = {
            type: "scatter",
            mode: "lines",
            name:"change in price",
            x: fildata.map(dataday => dataday.date),
            y: fildata.map(dataday => dataday.change1day),
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
        Plotly.newPlot("vizContainer_small", [trace])//,trace2])

    })
    // d3.json(`/api/wsb_mid/${myseldate}`).then(data =>{

    //     var datadiv = d3.select("#data")
    //     datadiv.html("");
    //   for (const[key, value] of Object.entries(data)) {  
    //       datadiv.append('div').attr('class','col-md-2').html(`${key}:${value[Object.keys(value)[0]] }`)
    //   }
    // })
    d3.json(`/ml/trump_small/${myseldate}`).then(data =>{   

    var mydiv =  d3.select("#datapred_smallimg")
    var mypreddiv = d3.select('#datapred_small')
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
    



}



loadcomplete()


