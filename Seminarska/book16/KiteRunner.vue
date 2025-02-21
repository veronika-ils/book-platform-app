<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book16.jpg" alt="The Kite Runner" class="image">
                <div class="text">
                    <h1>The Kite Runner</h1>
                    <p class="author">by Khaled Hosseini
                    </p>
                    <br>
                    <p class="description">
                        "The Kite Runner" by Khaled Hosseini is a poignant novel that explores themes of friendship, guilt,
                         and redemption against the backdrop of a changing Afghanistan. The story follows Amir, a young boy from a
                          wealthy family in Kabul, and his close friend and servant, Hassan. Their bond is tested by betrayal and a pivotal
                          incident involving a kite-flying contest, which leaves Amir burdened with guilt and regret. As Amir and his father 
                          flee the Soviet invasion and settle in the United States,
                         Amir's unresolved feelings about his past and his strained relationship with his father shape his journey toward redemption.
                         <br>
                         <br>
                         Years later, Amir returns to a war-torn Afghanistan to confront his past and seek atonement for his earlier mistakes.
                          Through his journey, he faces the complex legacies of personal and political upheaval, and strives to reconcile with 
                          his past actions. The novel is a rich exploration of the impact of personal choices on one's sense of self and relationships,
                          as well as a reflection on the broader social and political transformations that affect the characters' lives.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <SixteenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import SixteenList from './SixteenList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'KiteRunner',
        components: {
    ReviewPage,
    SixteenList 
     },
     data(){
        return{
            reviews: [],
            text:'Add to Shelf',
            readingCount: 0
        }
    },
    computed: {
        filteredReviews() {
            const latestReviews = {};
            this.reviews.forEach(review => {
                latestReviews[review.name] = review;
            })
            return Object.values(latestReviews);
        }
    },
    methods:{
            logout(){
               localStorage.clear();
               this.$router.push({name:'LoginPage'})
            },
            addShelf(){
                const userId = this.getUserId();
               const cookieKey = `shelf16_${userId}`;
                Cookies.set(cookieKey,true,{expires:7});
                this.text = 'Added!';
            },
            getUserId(){
                const userInfo = localStorage.getItem('user-info');
                if(userInfo){
                    try {
                        const parsedUserInfo = JSON.parse(userInfo);
                        if(parsedUserInfo && parsedUserInfo.id) {
                            return parsedUserInfo.id;
                        }else {
                            console.log('ID is missing'); 
                        } 
                    } catch (e) {
                        console.error('Error parsing', e);
                    }
             }else {
                    console.log('NO user found');
                }
                    return null;
                
            },
        addReview(review){
            this.reviews.push(review);
            this.saveReviews();
        },
        saveReviews(){
            const bookId="book16";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book16";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf16_${userId}`);
            if(shelf === 'true'){
                this.text='Added!';
            }else{
                this.text='Add to Shelf';
            }
            if(stored){
                this.reviews = JSON.parse(stored);
            }
        },
        countReading() {
            const allCookies = Cookies.get();
        
            let count = 0;

            for(const [key,value] of Object.entries(allCookies)) {

                if(key.startsWith('book16_')) {
            
                        if(value === 'Reading'){
                            count++;
                        }
                     
                }
            }
            this.readingCount = count;
        }
        },
        created(){
        this.loadReviews();
        this.countReading();
    }  
    }
    </script>
    <style src="../style.css"></style>