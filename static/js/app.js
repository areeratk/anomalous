// Get a reference to the table

// from data.js
d3.json("./api/tweets").then(function(tableData) {
  
    var tbody = d3.select("#tweet_table").select("tbody");

    columns = ["Date","Text","Favorites"]

    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(tableData)
        .enter()
        .append("tr");

    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function (row) {
            return columns.map(function (column) {
                return { column: column, value: row[column] };
            });
        })
        .enter()
        .append("td").text(function(d) {return d.value});

    $('#tweet_table').DataTable();
    $('.dataTables_length').addClass('bs-select');
    document.getElementById('tweet_table').style = 'display: block'
});
