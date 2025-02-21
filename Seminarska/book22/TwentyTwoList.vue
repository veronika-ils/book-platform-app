<template>
    <div class="list">
          <h3>Reviews:</h3>
          <ul>
            <li v-for="review,index in reviews" :key="index">
            {{ review.name }} gave this {{review.rating}}
             <br>
             "{{ review.review}}"
            </li>
          </ul>
        </div>
</template>
<script>
export default {
    name:'TwentyTwoList',
    props: {
    reviews: {
        type: Array,
        required: true
    }
}
}
</script>
<style src="../style.css"></style>