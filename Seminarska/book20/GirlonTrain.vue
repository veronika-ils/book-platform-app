<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book20.jpg" alt="The Girl on the Train" class="image">
                <div class="text">
                    <h1>The Girl on the Train</h1>
                    <p class="author">by Paula Hawkins
                    </p>
                    <br>
                    <p class="description">
                        The Girl on the Train by Paula Hawkins is a gripping psychological thriller centered around Rachel Watson, 
                        an alcoholic divorcee who takes the same train every day. From her seat, she observes the lives of a seemingly 
                        perfect couple she has nicknamed Jess and Jason, whom she idealizes as having the perfect life. However, when Rachel
                         witnesses something shocking during her commute—an event that seems to disrupt this perfect facade—her involvement 
                         unwittingly pulls her into a complex web of deceit, mystery, and danger. As Rachel becomes entangled in the investigation
                          of a missing woman who was connected to the couple, 
                        her own fractured reality and unreliable narrative blur the lines between truth and illusion.
                         <br>
                         <br>
                         The novel delves deeply into themes of obsession, insecurity, and the impact of trauma. Rachel’s unreliable narration,
                          combined with her struggles with alcoholism, creates a sense of tension and uncertainty throughout the story. As the 
                          plot unfolds, the reader is drawn into a labyrinth of shifting perspectives and dark secrets, with each character’s
                           motives and actions progressively revealed.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <TwentyList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import TwentyList from './TwentyList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'GirlonTrain',
        components: {
    ReviewPage,
    TwentyList 
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
               const cookieKey = `shelf20_${userId}`;
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
            const bookId="book20";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book20";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf20_${userId}`);
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

                if(key.startsWith('book20_')) {
            
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