//add admin cloud functions
const adminForm=document.querySelector(".admin-actions");

adminForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const adminEmail=document.querySelector('#admin-email').value;
    const addAdminRole=functions.httpsCallable('addAdminRole');
    
    addAdminRole({email:adminEmail}).then(result=>{
    console.log(result);
    adminForm.reset();
    });
});


//retrive data from firestore


//listen for auth status cahnges
auth.onAuthStateChanged(user => {
    if (user) {
        user.getIdTokenResult().then(idTokenResult=>{
            user.admin=idTokenResult.claims.admin;
            setupUi(user);
        })
        db.collection('guieds').onSnapshot(snapshot => {
            setUpGuieds(snapshot.docs);
            
        },err=>{
            console.log(err.message)
        });
    }
    else {
        setupUi();
        setUpGuieds([]);
    }
});

//create guied section
const createform=document.getElementById("create-form");

createform.addEventListener('submit',(e)=>{
    e.preventDefault();

    db.collection('guieds').add({
    title:createform['title'].value,
    content:createform['content'].value,
}).then(()=> {
       const modal = document.querySelector("#modal-create");
        M.Modal.getInstance(modal).close();
        createform.reset();
    }).catch(error=>{
        console.log("missing or insuficient permission");
    })
})

//singup
const singupform = document.getElementById("signup-form");

singupform.addEventListener('submit', (e) => {
    e.preventDefault();

    //get user info

    const email = singupform['signup-email'].value;
    const password = singupform['signup-password'].value;

    auth.createUserWithEmailAndPassword(email, password).then(cred => {
        return db.collection('users').doc(cred.user.uid).set({
            bio:singupform['signup-bio'].value
        });
        
    }).then(()=>{
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        singupform.reset();
       singupform.querySelector(".error").innerHTML='';
    }).catch(err=>{
        singupform.querySelector(".error").innerHTML=err.message;
    });
});


//signout
const logout = document.getElementById("logout");

logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
});


//login 
const loginForm = document.getElementById("login-form");

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        console.log(cred.user);
        const modal = document.getElementById("modal-login");
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector(".error").innerHTML='';
    }).catch(err=>{
        loginForm.querySelector(".error").innerHTML=err.message;
    });;
});