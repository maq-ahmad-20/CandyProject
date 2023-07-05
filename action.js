const url = 'https://crudcrud.com/api/b271857cca6440b0a4a5b23960185e4c';

function validateForm() {
    var name = document.getElementById('name').value;
    var desc = document.getElementById('desc').value;
    var price = document.getElementById('price').value;
    var qty = document.getElementById('qty').value;

    if (name == "") {
        alert("Candy Name is required");
        return false;
    }
    if (desc == "") {
        alert("Description is reeuired");
        return false;
    }
    if (price <= 0) {
        alert("please enter correct price");
        return false;
    }
    if (qty <= 0) {
        alert("Please Enter Correct Qty");
    }


    return true;

}




function addUserToScreen(data) {


    var dataAdded = `
     <td>${data.name}</td><td>${data.desc}</td><td>${data.price}</td>
     <td>${data.qty}</td>
     <td><button onclick ="buyOneCandy('${data._id}')" class="btn btn-primary" id = "${data._id}">Buy 1</button> 
     <button onclick ="buyTwoCandy('${data._id}')" class="btn btn-primary" id="${data._id}"> Buy 2</button> 
     <button onclick ="buyThreeCandy('${data._id}')" class="btn btn-primary" id="${data._id}" >Buy 3</button></td>
      `;

    var row = document.createElement('tr');
    row.innerHTML = dataAdded;
    document.querySelector('#crudtable tbody').appendChild(row);


}
function loadDataFromCrud() {
    var TotalData = "";
    axios.get(`${url}/AddCandy`)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                var data = res.data[i];
                addUserToScreen(data);
            }

        })
}
document.onload = loadDataFromCrud();

function createObject(arr) {
    return {
        "name": arr[0],
        "desc": arr[1],
        "price": arr[2],
        "qty": arr[3]
    }
}

function AddCandyToAxios() {

    if (validateForm() == true) {
        var name = document.getElementById('name').value;
        var desc = document.getElementById('desc').value;
        var price = document.getElementById('price').value;
        var qty = document.getElementById('qty').value;

        var dataArr = [name, desc, price, qty];
        var dataObj = createObject(dataArr);

        axios.post(`${url}/AddCandy`, dataObj)
            .then((res) => {
                dataObj['_id'] = res.data._id;
                addUserToScreen(dataObj);

            })

    }
    document.getElementById('name').value = "";
    document.getElementById('desc').value = "";
    document.getElementById('price').value = "";
    document.getElementById('qty').value = "";
}

function buyOneCandy(crudId) {




    axios.get(`${url}/AddCandy/${crudId}`)
        .then((res) => {
            var currentQty = res.data.qty - 1;
            var one = crudId;
            var name = res.data.name;
            var desc = res.data.desc
            var price = res.data.price;
            if (currentQty == 0) {

                axios.delete(`${url}/AddCandy/${crudId}`)
                    .then((res) => {
                        document.getElementById(one).parentElement.parentElement.remove();
                        alert("Hey! the Stock is over for the  candy Please refill the candy")
                    })
            } else {


                var dataArr = [name, desc, price, currentQty];
                var dataObj = createObject(dataArr);


                axios.put(`${url}/AddCandy/${crudId}`, dataObj)
                    .then((res) => {


                        // console.log(document.getElementById("one").parentElement.parentElement);
                        // console.log(document.getElementById("one").parentElement.parentElement.cells.length);
                        // console.log(document.getElementById("one").parentElement.parentElement.cells[3]);
                        document.getElementById(one).parentElement.parentElement.cells[3].innerHTML = currentQty;

                    })

            }
        })

}

function buyTwoCandy(crudId) {




    axios.get(`${url}/AddCandy/${crudId}`)
        .then((res) => {
            var currentQty = res.data.qty - 2;
            var two = crudId;
            var name = res.data.name;
            var desc = res.data.desc
            var price = res.data.price;
            if (currentQty == 0) {

                axios.delete(`${url}/AddCandy/${crudId}`)
                    .then((res) => {
                        document.getElementById(two).parentElement.parentElement.remove();
                        alert("Hey! the Stock is over for the  candy Please refill the candy")


                    })
            } else if (currentQty == -1) {
                alert('Hey RequiredQuantity not available can  you please select less qty')
            }
            else {

                var dataArr = [name, desc, price, currentQty];
                var dataObj = createObject(dataArr);


                axios.put(`${url}/AddCandy/${crudId}`, dataObj)
                    .then((res) => {

                        document.getElementById(two).parentElement.parentElement.cells[3].innerHTML = currentQty;

                    })

            }
        })


}

function buyThreeCandy(crudId) {

    axios.get(`${url}/AddCandy/${crudId}`)
        .then((res) => {
            var currentQty = res.data.qty - 3;
            var three = crudId;
            var name = res.data.name;
            var desc = res.data.desc
            var price = res.data.price;
            if (currentQty == 0) {

                axios.delete(`${url}/AddCandy/${crudId}`)
                    .then((res) => {
                        document.getElementById(three).parentElement.parentElement.remove();
                        alert("Hey! the Stock is over for the  candy Please refill the candy")
                    })
            } else if (currentQty == -1 || currentQty == -2) {
                alert('Hey RequiredQuantity not available  can you please select less qty')
            } else {

                var dataArr = [name, desc, price, currentQty];
                var dataObj = createObject(dataArr);


                axios.put(`${url}/AddCandy/${crudId}`, dataObj)
                    .then((res) => {
                        document.getElementById(three).parentElement.parentElement.cells[3].innerHTML = currentQty;

                    })

            }
        })
}



