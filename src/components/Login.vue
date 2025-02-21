<template>
    <div class="first">
   <div class="form">
         <div id="signup">
            <h1>Login</h1>
        </div>
        <br>
        <br>
        <form class="white">
            <br>
            <label for="email" >
                Email Address*
            </label>
            <input type="email" id="email" v-model="email" placeholder="name@domain.com" required autocomplete="on" tabindex="2">
            <label for="password">
                Password*
            </label>
             <input type="password"  v-model="password" id="password" placeholder="minimum of 6 characters"  minlength="6" required tabindex="3">
              <button @click="login" type="submit" class="submit" tabindex="4">Login</button>
        </form> 
        <p class="required">Fields marked by asterisks (*) are required.</p>
        <p class="member">Not a member?<router-link to="/sign-up">Sign Up</router-link></p>
       </div>
       </div>
</template>
<script>
import axios from 'axios';
export default {
    name:'LoginPage',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        async login() { 
        
            let result = await axios.get(
              `http://localhost:3000/users?email=${encodeURIComponent(this.email)}`  
            )

            if(result.status == 200 && result.data.length > 0){
                const user = result.data[0];
                if(user.password === this.password){
                 localStorage.setItem("user-info",JSON.stringify(result.data[0]));
                this.$router.push({name:'HomePage'});   
                }else{
                    alert("Sorry,invalid email or password.Please try again.");
                }
                
            }else{
                alert("Sorry,invalid email or password. Please try again.");
            }
           
        }
    },
    mounted(){
        let user=localStorage.getItem('user-info');
        if(user){
            this.$router.push({name:'HomePage'});
        }
    }
}
</script>

<style src="../../Seminarska/style.css">

</style>