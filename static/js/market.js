function updatechart() {
    var dateControl = document.querySelector("#chooseDate")
    var mydate = new Date(dateControl.value);
    d3.csv("../static/data/wsb_lmkt.csv").then((data) => {

        console.log(data);

      
      
        mydate = new Date(mydate.setDate(mydate.getDate() - 7))
        mydate = mydate.toISOString().split('T')[0]
        var fildata = data.filter(dataday => (dataday.date >= mydate && dataday.date <= dateControl.value))
        console.log(fildata)
        var trace = {
            type: "scatter",
            mode: "lines",
            name:"opening price",
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
        console.log(data)
        var datadiv = d3.select("#data")
        datadiv.html("");
      for (const[key, value] of Object.entries(data)) {  
          datadiv.append('div').attr('class','col-md-2').html(`${key}:${value[Object.keys(value)[0]] }`)
      }
    })
    d3.json(`/ml/wsb/${dateControl.value}`).then(data =>{   
        console.log(data)
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
    
}
