$(document).ready(function () {


    var recordTypeA = [];
    var msisdnA = [];
    var ccTimeA = [];
    var otherPartyA = [];
    var dirTypeA = [];
    var requestTypeA = [];
    var recordOpenA = [];
    
    var finalA1 = [];

   

    document.getElementById('submit').onclick = function () {

        // parse csv

        var file = $('#inputF').prop('files');

        //console.log(file);

        Papa.parse( file[0], {
            complete: function (results) {
               // console.log(results.data);
                arrayToTable(results.data);
                
            }
        });
    }


    function arrayToTable(tableData) {

        //console.log("button clicked = " + tableData)

        var table = $('<table id="myTable"></table>');

        $(tableData).each(function (i, rowData)

        {
            var row = $('<tr></tr>');

            $(rowData).each(function (j, cellData)
            {
               // if (cellData != "")
                //{
                    row.append($('<td>' + cellData + '</td>'));
                //}
                
            });

            table.append(row);
        });

        $("#display").append(table);

        readTable();

        
    
    }


    

    function readTable() {

        //gets table
        var oTable = document.getElementById('myTable');

        //gets rows of table
        var rowLength = oTable.rows.length;

        var colRecordType = 0;
        var colMSISDN = 0;
        var colCCTime = 0;
        var colOtherParty = 0;
        var colDirType = 0;
        var colRequestType = 0;
        var colRecordOpen = 0;
        //var colDateTime = 0;




        //loops through rows
        for (i = 0; i < rowLength; i++) {


            //gets cells of current row
            var oCells = oTable.rows.item(i).cells;

            //gets amount of cells of current row
            var cellLength = oCells.length;

            

            //loops through each cell in current row
            for (var j = 0; j < cellLength; j++) {
                //get your cell info here 

              

                if (oCells[j].innerHTML == "Record Type") {
                    colRecordType = j;
                }

                if (oCells[j].innerHTML == "MSISDN") {
                    colMSISDN = j;
                }

                if (oCells[j].innerHTML == "Record opening time") {
                    colRecordOpen = j;
                }

                if (oCells[j].innerHTML == "CC Time") {
                    colCCTime = j;
                }

                if (oCells[j].innerHTML == "Other party address") {
                    colOtherParty = j;
                }
                if (oCells[j].innerHTML == "Direction type") {
                    colDirType = j;
                }

                if (oCells[j].innerHTML == "Request Type") {
                    colRequestType = j;
                }


                if (colRecordType != colMSISDN && colMSISDN != colRecordOpen && colRecordOpen != colCCTime && colCCTime != colOtherParty && colOtherParty != colDirType && colDirType != colRequestType) { //nonconflicting

                    if (j == colRecordType && oCells[j].innerHTML != "Record Type" && oCells[j].innerHTML != "") {
                        recordTypeA.push(oCells[j].innerHTML);
                        finalA1[j] = recordTypeA;
                    }

                    else if (j == colMSISDN && oCells[j].innerHTML != "MSISDN" && oCells[j].innerHTML != "") {                
                        msisdnA.push(oCells[j].innerHTML);
                        finalA1[j] = msisdnA;
                    }

                    else if (j == colRecordOpen && oCells[j].innerHTML != "Record opening time" && oCells[j].innerHTML != "") {

                        var dateTime = 0;
                       // dateTime = ((parseFloat(oCells[j].innerHTML) + 28800) / 86400) + 25569; 

                        var timeMil = new Date((oCells[j].innerHTML)*1000);

                        recordOpenA.push(timeMil);

                        finalA1[j] = recordOpenA;
                    }

                    else if (j == colCCTime && oCells[j].innerHTML != "CC Time") {
                        ccTimeA.push(oCells[j].innerHTML);
                        finalA1[j] = ccTimeA;
                    }

                    else if (j == colOtherParty && oCells[j].innerHTML != "Other party address" && oCells[j].innerHTML != "") {
                        otherPartyA.push(oCells[j].innerHTML);
                        finalA1[j] = otherPartyA;
                    }

                    else if (j == colDirType && oCells[j].innerHTML != "Direction type" && oCells[j].innerHTML != "") {
                        dirTypeA.push(oCells[j].innerHTML);
                        finalA1[j] = dirTypeA;
                    }

                    else if (j == colRequestType && oCells[j].innerHTML != "Request Type" && oCells[j].innerHTML != "") {
                        requestTypeA.push(oCells[j].innerHTML);
                        finalA1[j] = requestTypeA;
                    }
                }




            }
        }

        arrayToTable2(finalA1);
        
    } 



    function arrayToTable2(tableData) {

      //  console.log( tableData);

        var table2 = $('<table id="myTable2" class="sortable"> </table>');

        $(tableData).each(function (i, rowData) {
            var row = $('<tr></tr>');

            $(rowData).each(function (j, cellData) {
               
                row.append($('<td>' + cellData + '</td>')); 
                
            });

            table2.append(row);
        });

        document.getElementById("myTable").style.display = "none";

        $("#display").append(table2);

        //invert table
        //<thead> <tr>  <th>Record Type</th> <th>MSISDN</th> <th>Date-Time</th><th>CCTime</th><th>Other Party Address</th><th>Direction Type</th><th>Request Type</th>  </tr></thead> 

        $("#myTable2").each(function () {
            var $this = $(this);
            var newrows = [];
            $this.find("tr").each(function () {
                var i = 0;
                $(this).find("td").each(function () {
                    i++;
                    if (newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                    newrows[i].append($(this));
                });
            });
            $this.find("tr").remove();
            $.each(newrows, function () {
                $this.append(this);
            });
            $this.prepend("<tr>  <th class='headerC' id='0'>Record Type</th> <th class= 'headerC'id = '1' > MSISDN</th> <th class='headerC' id='2'>Date-Time</th> <th class='headerC' id='3'>CCTime</th> <th class='headerC' id='4'>Other Party Address</th> <th class='headerC' id='5'>Direction Type</th> <th class='headerC' id='6'>Request Type</th> </tr > ");

            $(".headerC").on('click', function (event) {
                event.stopPropagation();
                event.stopImmediatePropagation();

                
                var n = this.id;
                 console.log(n);
                sortTable(n);
               

            });


        });

        return false;

       
    }

   

    function sortTable(n) {
        var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
        table = document.getElementById("myTable2");
        switching = true;
        // Set the sorting direction to ascending:
        dir = "asc";
        /* Make a loop that will continue until
        no switching has been done: */
        while (switching) {
            // Start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /* Loop through all table rows (except the
            first, which contains table headers): */
            for (i = 1; i < (rows.length - 1); i++) {
                // Start by saying there should be no switching:
                shouldSwitch = false;
                /* Get the two elements you want to compare,
                one from current row and one from the next: */
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                /* Check if the two rows should switch place,
                based on the direction, asc or desc: */
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir == "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        // If so, mark as a switch and break the loop:
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                /* If a switch has been marked, make the switch
                and mark that a switch has been done: */
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                // Each time a switch is done, increase this count by 1:
                switchcount++;
            } else {
                /* If no switching has been done AND the direction is "asc",
                set the direction to "desc" and run the while loop again. */
                if (switchcount == 0 && dir == "asc") {
                    dir = "desc";
                    switching = true;
                }
            }
        }
    }

});