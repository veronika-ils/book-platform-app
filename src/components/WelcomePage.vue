<template>
    <div class="welcomepage">
        <h1>Welcome to our book platform!</h1> 
            <p>We’re delighted to have you here. Explore our vast collection,
                 find new favorites, 
                 and join a community of fellow book enthusiasts.
                 </p>
        <p id="moment">Just a moment while we take you to our sign-up
             page where you can become a part of our book loving community.</p>
    </div>
</template>
<script>
export default {
    name:'WelcomePage' ,
    mounted() {
        this.redirectTimeout = setTimeout(() => {
            this.$router.push({name:'SignUp'});
        }, 7000);
    },
    beforeDestory() {
        if(this.redirectTimeout) {
            clearTimeout(this.redirectTimeout);
        }
    }
}
</script>
<style src="../../Seminarska/style.css"></style>