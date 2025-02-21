<template>
    
    <div class="first">
        <div class="form">
         <div id="signup">
            <h1>Sign Up</h1>
        </div>
        <br>
        <br>
        <form @submit.prevent="signUp" method="post" class="white">
            <br>
            <label for="username">
                Username*
            </label>
            <input type="text" id="username" v-model="name" placeholder="3-16 characters" autocomplete="on" minlength="3"  required tabindex="1">
            <label for="email" >
                Email Address*
            </label>
            <input type="email" id="email" v-model="email" placeholder="name@domain.com" required autocomplete="on" tabindex="2">
            <label for="password">
                Password*
            </label>
             <input type="password"  v-model="password"  id="password" placeholder="minimum of 6 characters" required  minlength="6" tabindex="3">
             <button type="submit"  class="submit" tabindex="4">Submit</button>
        </form> 
        <p class="required">Fields marked by asterisks (*) are required.</p>
        <p class="member">
        Already have an account?<router-link to="/login">Login</router-link>
       </p>
       </div>
       </div>

</template>

<script>
import axios from 'axios';
export default {
    name:'SignUp',
    data(){
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        async signUp(){
           
            
            if(this.name.length < 3 ){
                alert('Username must be at least 3 characters long.');
                return;
            }
            if(this.name.length > 16 ){
                alert('Username must have less than 16 charachters.');
                return;
            }
            const regex = /[a-zA-Z]/;
            if(!regex.test(this.name)) {
                alert('Username must contain at least one letter.');
                return ;
            }
             if(this.password.length < 6) {
                alert('Password must be at least 6 charachters long.');
                return;
            }

            try{
                const usersResponse = await axios.get("http://localhost:3000/users");
                const users = usersResponse.data;

                const emailExist = users.some(user => user.email === this.email);
                const usernameExist = users.some(user => user.name === this.name);
                if(emailExist){
                    alert('Email address is already in use.');
                    return;
                }
                if(usernameExist){
                    alert('Username is already taken.');
                    return;
                }
           let result = await axios.post("http://localhost:3000/users",{
                email:this.email,
                password:this.password,
                name:this.name
            });

            if(result.status == 201){
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'HomePage'})
            }      
            } catch (error) {
                console.error("There was an error signing up: ", error);
            }
           
        }
    },
    mounted(){
        let user=localStorage.getItem('user-info');
        if(user){
            this.$router.push({name:'HomePage'})
        }
    }
}
</script>

<style src="../../Seminarska/style.css">

</style>