const functions = require('firebase-functions');

const admin=require('firebase-admin');
admin.initializeApp();

exports.addAdminRole=functions.https.onCall((data,context)=>{
    //get user and add customs claim(admin)
    if(context.auth.token.admin!==true)
    {
        return{error:"only admin can add other admin,sucker"}
    }
    return admin.auth().getUserByEmail(data.email).then(user=>{
        return admin.auth().setCustomUserClaims(user.uid,{
            admin:true,

        });
    }).then(()=>{
        return{
            message:`succes ! ${data.email}has been made an admin`
        }
    }).catch(err=>{
        return err;
    });
});