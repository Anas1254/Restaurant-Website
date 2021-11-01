//this data represent at dom in(index.html) through firestore
const guiedList = document.querySelector(".guides");
const loggedIn=document.querySelectorAll(".logged-in");
const loggedOut=document.querySelectorAll(".logged-out");
const accountDetils=document.querySelector(".account-details");
const adminItems=document.querySelectorAll(".admin");

 const setupUi = (user)=>{
     if(user)
     {
         if(user.admin)
         {
             adminItems.forEach(item=>item.style.display='block')
         }
         //account info
        db.collection('users').doc(user.uid).get().then(doc=>{
    
        const html= 
        `<div> logged in as ${user.email}</div> 
        <div> ${doc.data().bio}</div>
        <div class="pink-text"> ${user.admin ? 'admin':''}</div> `
        ;
        accountDetils.innerHTML = html; 
     })
      
     //toggle ui elements
     loggedIn.forEach(item=>item.style.display='block');
     loggedOut.forEach(item=>item.style.display='none');
     }
    else
    {
       
       //hide account info 
     accountDetils.innerHTML = '';
     //toggle ui elements 
     adminItems.forEach(item=>item.style.display='none');
     loggedIn.forEach(item=>item.style.display='none');
     loggedOut.forEach(item=>item.style.display='block');
    }
}

const setUpGuieds = (data) => {
    if(data.length){
        let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        const li = ` 
        <li>
        <div class="collapsible-header grey lighten-4">${guide.title}</div>
        <div class="collapsible-body white">${guide.content}</div>
       </li>`
            ;
        html += li;
    });
    guiedList.innerHTML = html;

    }
    else
    {
        guiedList.innerHTML='<h5 class="center-align">login to view new Dishes Or Order</h5>'
    }
     
}
// setup materialize components
document.addEventListener('DOMContentLoaded', function () {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

});