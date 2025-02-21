<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book17.jpg" alt="The Housemaid's Secret" class="image">
                <div class="text">
                    <h1>The Housemaid's Secret</h1>
                    <p class="author">by Freida McFadden
                    </p>
                    <br>
                    <p class="description">
                        The Housemaid's Secret by Fiona Cummins is a gripping psychological thriller that delves into themes
                         of deception and manipulation. The story follows a housemaid named Aisha, who works for the wealthy and 
                         enigmatic Gower family. As she becomes increasingly entangled in their lives, she uncovers dark and disturbing 
                         secrets hidden within the family's seemingly perfect façade. The novel expertly weaves suspense and intrigue,
                         revealing how Aisha's own past and the Gowers' hidden truths intersect.
                         <br>
                         <br>
                         The book stands out for its intricate character development and its exploration of power dynamics within a household.
                          Cummins crafts a narrative that keeps readers on edge, with unexpected twists and complex motivations driving the plot
                           forward. As Aisha navigates the treacherous waters of her employer's secrets and her own troubled history,
                          the story challenges perceptions of trust and betrayal, making for a compelling and thought-provoking read.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <SeventeenList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import SeventeenList from './SeventeenList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'HousemaidsSecret',
        components: {
    ReviewPage,
    SeventeenList 
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
               const cookieKey = `shelf17_${userId}`;
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
            const bookId="book17";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book17";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf17_${userId}`);
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

                if(key.startsWith('book17_')) {
            
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