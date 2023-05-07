<template>
    <div style = "display: flex; flex-direction: row;">
        
        <!-- ----------------------------- -->
        <div style = "display: flex; margin-top: 25vh; margin-right: 50vh; flex-direction: column; justify-content: center; align-items: center;">
            <div class="logo-container2">
                <img class="logo2" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
            </div>
        </div>
        <!-- ----------------------------- -->

        <div style = "display: flex; flex-direction: column; justify-content: space-around; 
            background-color: #d9d9d9; 
            width: 50vh; height: 100vh;; margin-left: -0.5vw; margin-top: -0.5vw;
            gap: 0.75rem; position: fixed; right: 0;" >
                <div class="logo-container1">
                    <img class="logo1" src="../assets/LakbayLogo.png" alt="Lakbay Logo">
                </div>
                <div>
                    <h3 style = "text-align: center; font-size: 1.25vw;">Manager Interface</h3>

                </div>
                
                <div style = "display: flex; flex-direction: column; align-items: center;">
                    <div class = login-styles-container>
                        <h1 class = "login-styles">Email</h1>
                        <input class = "login-input"  v-model = "LoginInfo.useremail" type = "email" placeholder = "Enter Email"/>
                        <h1 class = "login-styles">Password</h1>
                        <input class = "login-input"  v-model = "LoginInfo.userpassword" type = "password" placeholder = "Enter Password"/>
                    </div>
                    <h1 class = "warning">{{ Warning }}</h1>
                    <button class = "InterfaceButtonLogin" @click = "login">Login</button>
                    
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'

export default {
    data(){
        return{
            LoginInfo: {
                useremail: "",
                userpassword: ""
            },
            Warning: " ",
            userToken: " ",
            authToken: '',

            isAdmin: null,
            userrole: null,

        }
    },
    mounted(){
        
        console.log('clearing cookie')
        Cookies.remove('auth_token'); 
        this.authToken = ''
       

    },
    methods: {
        login(){
            
            if(this.LoginInfo.useremail && this.LoginInfo.userpassword){
                this.Warning = "",
                //ip address of the http requests may need to be changed if tested from other device
                axios.post(`http://localhost:7000/loginpage/u/login`, this.LoginInfo)
                .then((response) => {
                    this.Warning = "Login Successful";
                    const userToken = response.data.token;
                    console.log(response.data.token)

                    const decoded = jwt_decode(userToken);
                    console.log(decoded.data.user_id) // the user id of the user who logins
                    this.userrole = decoded.data.user_role
                    console.log(this.userrole)
                    console.log(response.status)
                    if(response.status==200){
                        
                        if (this.userrole === "MANAGER"){
                            Cookies.set('auth_token', userToken);
                            console.log("routing")
                            this.$router.push({name: 'home'})
                        } else {
                            this.Warning = "Invalid Manager Credentials"
                        }  
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.log(error.response.data.message); // this will log "Invalid email or password."
                        this.Warning = "Invalid Manager Credentials";
                    } else {
                        console.log(error.message);
                    }
                });
                
            }
            else{
                this.Warning = "Invalid ManagerCredentials",
                console.log("no input")
            }
        },
        
    }

}


</script>

<style >
   
    .logo-container1 {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .logo1 {
        width: 70%;
        margin-top: 5vh;
    }
    .logo-container2 {
        max-width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

    }
    .logo2 {
        width: 70%;
        margin-top: 5vh;
    }


    .login-styles-container{
        margin-top: 60px;
        margin-left: 12%;
        margin-right: 12%;
        /* border: 1px dashed gray; */
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .login-styles{

        /* border: 1px dashed gray; */
        text-align: left;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 15px;
        line-height: 0.5;
        color: #000000;
    }
    .login-input{
        border: none;
        border-radius: 0.75vw;
        width: 30vh;
        height: 40px;
        padding-left: 20px;
        display: block;
        margin-bottom: 20px;
        color: #ffffff;
        background-color: #3C3C3C;
    }
    .InterfaceButtonLogin {
        border: none;
        width: 6vw;
        height: 5vh;
        border-radius: 1vh;
        margin-top: 5vh;
        background-color: #c4c4c4;
        padding: 2.5px;
        cursor: pointer;

        text-align: center;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 1vh;
        line-height: 1;
        font-size: 1vw;
    }
    .InterfaceButtonLogin:active{
        background-color: #3c3c3c;
    }
    .warning{
            text-align: center;
            font-family: 'Inter';
            font-style: normal;
            font-weight: 400;
            font-size: 15px;
            line-height: 1.5;
            color:red
        }

</style>

