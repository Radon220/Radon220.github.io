$(document).ready(function () {

    var emailArray = [];
    var firstNameArray = []; //temp storage
    var lastNameArray = []; //temp storage
    var namesArray = []; //use this

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


   /* document.getElementById('testBtn').onclick = function () {

        readTable();

    }*/


    function arrayToTable(tableData) {

        //console.log("button clicked = " + tableData)

        var table = $('<table id="myTable"></table>');

        $(tableData).each(function (i, rowData)

        {
            var row = $('<tr></tr>');

            $(rowData).each(function (j, cellData)
            {
                if (cellData != "")
                {
                    row.append($('<td>' + cellData + '</td>'));
                }
                
            });

            table.append(row);
        });

        $("#display").append(table);

        readTable();

        //debug display
        //$("#display").html(
        //    '<br/>' + "Subject: " + $("#subject").val() + '<br/>' + "Text to send: " + $("#content").val()
        //);

        
    
    }




    function readTable() {

        //gets table
        var oTable = document.getElementById('myTable');

        //gets rows of table
        var rowLength = oTable.rows.length;

        var colTypeE = 0;
        var colTypeFN = 0;
        var colTypeLN = 0;

        //loops through rows    
        for (i = 0; i < rowLength; i++) {


            //gets cells of current row
            var oCells = oTable.rows.item(i).cells;

            //gets amount of cells of current row
            var cellLength = oCells.length;

            

            //loops through each cell in current row
            for (var j = 0; j < cellLength; j++) {
                /* get your cell info here */

              

                if (oCells[j].innerHTML == "Email") {
                    colTypeE = j;
                   // console.log("E " + j);
                }

                if (oCells[j].innerHTML == "FirstName") {
                    colTypeFN = j;
                   // console.log("FN " + j);
                   
                }

                if (oCells[j].innerHTML == "LastName") {
                    colTypeLN = j;
                   // console.log("LN " + j);
                }

                if (colTypeE != colTypeFN && colTypeE != colTypeLN && colTypeLN != colTypeFN) {

                    if (j == colTypeE && oCells[j].innerHTML != "Email" && oCells[j].innerHTML != "") {
                        //console.log("email: " + oCells[j].innerHTML);
                        emailArray.push(oCells[j].innerHTML);

                    }

                    else if (j == colTypeFN && oCells[j].innerHTML != "FirstName" && oCells[j].innerHTML != "") {
                       // console.log("firstname: " + oCells[j].innerHTML);
                        firstNameArray.push(oCells[j].innerHTML);

                    }

                    else if (j == colTypeLN && oCells[j].innerHTML != "LastName" && oCells[j].innerHTML != "") {
                       // console.log("Lastname: " + oCells[j].innerHTML);
                        lastNameArray.push(oCells[j].innerHTML);

                    }
                }

            }
        }

        //merge names
        for (var k = 0; k < firstNameArray.length; k++) {
            namesArray.push(firstNameArray[k] + " " + lastNameArray[k]);
            //console.log(namesArray[k]);
            //console.log(emailArray[k]);
            console.log("name: " + namesArray[k] + " || email: " + emailArray[k]);
            
        }
    }
});