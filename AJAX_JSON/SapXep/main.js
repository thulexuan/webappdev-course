// Bai hoan chinh don gian 

function loadData(button) {
    button.disabled = true;
    document.getElementById("sort_info").classList.remove("hidden");
    const xmlhttpRequest = new XMLHttpRequest();
    xmlhttpRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            data_object = JSON.parse(this.responseText);

            for (i = 0; i < data_object.length; i++) {
                var row = document.createElement("tr");
                var col1 = document.createElement("td");
                var col2 = document.createElement("td");
                var col3 = document.createElement("td");

                col1.innerHTML = i + 1;
                col2.innerHTML = data_object[i].id;
                col3.innerHTML = data_object[i].name;

                row.appendChild(col1);
                row.appendChild(col2);
                row.appendChild(col3);

                document.getElementById("table").appendChild(row);

            }
            sort_cols = document.getElementsByClassName("sort_col");
            for (i = 0; i < sort_cols.length; i++) {
                sort_cols[i].innerHTML += '<span class="arrow"></span>';
            }
        }
    };
    xmlhttpRequest.open("GET", "data.txt");
    xmlhttpRequest.send();
}

columns = document.getElementById("table").rows[0].cells;
current_column = -1;
sortDirection = "asc";
for (i = 1; i < columns.length; i++) {

    columns[i].onclick = function () {
        for (j = 1; j < columns.length; j++) {
            columns[j].childNodes[1].classList.remove("asc");
            columns[j].childNodes[1].classList.remove("desc");
            if (this == columns[j]) {
                i = j;
            }
        }

        if (i == current_column) {
            this.childNodes[1].classList.remove(sortDirection);
            sortDirection = (sortDirection == "asc" ? "desc" : "asc");
            this.childNodes[1].classList.add(sortDirection);
            sort(current_column);

        } else {
            sortDirection = "asc";
            this.childNodes[1].classList.add(sortDirection);
            current_column = i;
            sort(current_column);
        }

    }
}

function sort(column) {
    for (i = 1; i < document.getElementById("table").rows.length - 1; i++) {
        for (j = i + 1; j < document.getElementById("table").rows.length; j++) {
            if ((sortDirection == "asc" && document.getElementById("table").rows[i].cells[column].innerHTML.toString().toLowerCase() >
                document.getElementById("table").rows[j].cells[column].innerHTML.toString().toLowerCase())
                || (sortDirection == "desc" && document.getElementById("table").rows[i].cells[column].innerHTML.toString().toLowerCase() <
                    document.getElementById("table").rows[j].cells[column].innerHTML.toString().toLowerCase())) {
                for (t = 1; t < document.getElementById("table").rows[i].cells.length; t++) {
                    tmp = document.getElementById("table").rows[i].cells[t].innerHTML;
                    document.getElementById("table").rows[i].cells[t].innerHTML = document.getElementById("table").rows[j].cells[t].innerHTML;
                    document.getElementById("table").rows[j].cells[t].innerHTML = tmp;
                }

            }

        }
    }
}
