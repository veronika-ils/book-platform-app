<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book15.jpg" alt="The Hunger Games" class="image">
                <div class="text">
                    <h1>The Hunger Games</h1>
                    <p class="author">by Suzanne Collins
                    </p>
                    <br>
                    <p class="description">
                        
                        "The Hunger Games" by Suzanne Collins is a dystopian novel set in a future world known as Panem, which is 
                        divided into 12 districts and the opulent Capitol. Each year, as a form of both punishment and entertainment,
                        the Capitol selects one boy and one girl from each district to participate in the Hunger Games—a televised fight
                         to the death in a controlled arena. The story follows Katniss Everdeen, a resourceful and resilient 16-year-old girl
                          from District 12, who volunteers to take her sister Prim's place in the Games. Katniss must navigate the brutal and 
                          manipulative nature of the competition, 
                        while grappling with alliances, survival, and the moral complexities of a society that uses violence as a spectacle.
                         <br>
                         <br>
                         As the Games progress, Katniss's struggle becomes not just about surviving but also about preserving
                          her humanity and challenging the oppressive regime that orchestrates the Games. Her actions and decisions,
                           driven by both personal survival and a growing sense of rebellion, spark a larger resistance against the Capitol's
                            tyranny. The novel explores themes of power, sacrifice,
                          and the impact of media on society, setting the stage for a larger narrative of resistance and revolution in its sequels.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <FifteenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import FifteenList from './FifteenList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';

    export default {
        name:'HungerGames',
        components: {
    ReviewPage,
    FifteenList 
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
               const cookieKey = `shelf15_${userId}`;
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
            const bookId="book15";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book15";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf15_${userId}`);
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

                if(key.startsWith('book15_')) {
            
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