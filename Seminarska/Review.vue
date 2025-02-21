<template>
    <form class="review" @submit.prevent="onSubmit">
    <h3>Leave a review</h3>
    

    <label for="review">Review:</label>
    <textarea id="review" v-model="review" tabindex="2"></textarea>

    <label for="rating">Rating:</label>
    <select id="rating" v-model.number="rating" tabindex="3">
        <option>⋆⋆⋆⋆⋆</option>
        <option>⋆⋆⋆⋆</option> 
        <option>⋆⋆⋆</option>
        <option>⋆⋆</option>
        <option>⋆</option>
    </select>
    <input type="submit" value="Submit" class="sub" tabindex="4">
</form>
</template>
<script>
export default {
    name:'ReviewPage',
    data(){
return {
    name: '',
    review: '',
    rating: null
}
},
methods:{
    onSubmit() {
        if (this.review === '' || this.rating === null ) {
            alert('Review is incomplete. Please fill out every field.')
            return;
          }
        const Info = JSON.parse(localStorage.getItem('user-info'));

        let productReview = {
            name: Info.name,
            review: this.review,
            rating: this.rating
        }
        this.$emit('review-submitted',productReview)
        this.name = ''
        this.review = ''
        this.rating = null
    }
}
}
</script>
<style src="./style.css"></style>