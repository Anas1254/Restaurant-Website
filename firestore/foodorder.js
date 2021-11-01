const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let CustomerName = document.createElement('span');
    let DishName = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    CustomerName.textContent = doc.data().CustomerName;
    DishName.textContent = doc.data().DishName;
    cross.textContent = 'x';

    li.appendChild(CustomerName);
    li.appendChild(DishName);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('FoodOrderd').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('FoodOrderd').add({
      CustomerName: form.CustomerName.value,
      DishName: form.DishName.value
    });
    form.CustomerName.value = '';
    form.DishName.value = '';
});

// real-time listener
db.collection('FoodOrderd').orderBy('DishName').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderCafe(change.doc);
        } else if (change.type == 'removed'){
            let li = cafeList.querySelector('[data-id=' + change.doc.id + ']');
            cafeList.removeChild(li);
        }
    });
});

