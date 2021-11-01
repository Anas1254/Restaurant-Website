const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// create element & render cafe
function renderCafe(doc){
    let li = document.createElement('li');
    let CustomerName = document.createElement('span');
    let FeedBack = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    CustomerName.textContent = doc.data().CustomerName;
    FeedBack.textContent = doc.data().FeedBack;
    cross.textContent = 'x';

    li.appendChild(CustomerName);
    li.appendChild(FeedBack);
    li.appendChild(cross);

    cafeList.appendChild(li);

    // deleting data
    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('FeedBack').doc(id).delete();
    });
}

// saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('FeedBack').add({
      CustomerName: form.CustomerName.value,
        FeedBack: form.FeedBack.value
    });
    form.CustomerName.value = '';
    form.FeedBack.value = '';
});

// real-time listener
db.collection('FeedBack').orderBy('FeedBack').onSnapshot(snapshot => {
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

