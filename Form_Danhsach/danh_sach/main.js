
var checkboxes = document.querySelectorAll("#select");

for (i = 0; i < checkboxes.length; i++) {
    checkboxes[i].onchange = function () {
        checkboxOperator(this);
        console.log("ahihi");
    }

}

// Thay đổi trên checkbox select-all
document.getElementById("select-all").onchange = function () {
    if (this.checked) {
        checkboxes.forEach(element => {
            element.checked = true;
            element.parentNode.parentNode.classList.add("background-checked");
            element.parentNode.parentNode.classList.remove("hover");
        })
        document.getElementById("delete-btn").classList.remove("hidden");
    } else {
        checkboxes.forEach(element => {
            element.checked = false;
            element.parentNode.parentNode.classList.remove("background-checked");
            element.parentNode.parentNode.classList.add("hover");
        })
        document.getElementById("delete-btn").classList.add("hidden");
    }
}

// Click vào button "Xóa"
document.getElementById("delete-btn").onclick = function () {
    another_checkboxes = document.querySelectorAll("#select");
    another_checkboxes.forEach(element => {
        if (element.checked) {
            element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
        }
    })
}

// Bấm vào hàng là hiệu ứng như bấm vào checkbox
var table = document.getElementById("table");
for (i = 1; i < table.rows.length; i++) {
    table.rows[i].onclick = function (e) {
        if (e.target.matches('input[type=checkbox]')) return
        this.cells[0].children[0].checked = !this.cells[0].children[0].checked;
        checkboxOperator(this.cells[0].children[0]);
        console.log("rows nef");
    }
}

function checkboxOperator(checkbox) {
    if (checkbox.checked) {
        checkbox.parentNode.parentNode.classList.add("background-checked");
        checkbox.parentNode.parentNode.classList.remove("hover");

        // tất cả các checkbox đều được checked thì checkbox select-all được checked
        j = 0;
        for (j = 0; j < checkboxes.length; j++) {
            if (!checkboxes[j].checked) {
                break;
            }
        }
        if (j == checkboxes.length) {
            document.getElementById("select-all").checked = true;
            document.getElementById("delete-btn").classList.remove("hidden");
        } else {
            document.getElementById("select-all").checked = false;
        }
        document.getElementById("delete-btn").classList.remove("hidden");
    } else {
        checkbox.parentNode.parentNode.classList.remove("background-checked");
        checkbox.parentNode.parentNode.classList.add("hover");
        // nếu có 1 checkbox không được checked thì checkbox-all cũng không được checked
        j = 0;
        for (j = 0; j < checkboxes.length; j++) {
            if (!checkboxes[j].checked) {
                break;
            }
        }
        if (j == checkboxes.length) {
            document.getElementById("select-all").checked = true;
        } else {
            document.getElementById("select-all").checked = false;
        }

        k = 0
        for (k = 0; k < checkboxes.length; k++) {
            if (checkboxes[k].checked) {
                break;
            }
        }
        if (k == checkboxes.length) {
            document.getElementById("delete-btn").classList.add("hidden");
        }
    }
}


