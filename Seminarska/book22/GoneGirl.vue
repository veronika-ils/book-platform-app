<template>
    <div class="nav">
                <router-link to="/myShelf"><div class="button">My Shelf</div></router-link>
                <router-link to="/myFavourites"><div class="button">Favourites</div></router-link>
                <router-link to="/"><div class="button">Explore</div></router-link>
                <div @click="logout" class="sign button">Logout</div>
            </div>
    
            <div class="write">
                <img src="../books/book22.jpg" alt="Gone Girl" class="image">
                <div class="text">
                    <h1>Gone Girl</h1>
                    <p class="author">by Gillian Flynn
                    </p>
                    <br>
                    <p class="description">
                        "Gone Girl," written by Gillian Flynn, is a gripping psychological thriller that explores the complexities 
                        of a troubled marriage through a masterful narrative of deceit and manipulation. The novel centers on Nick 
                        and Amy Dunne, a married couple whose relationship unravels dramatically when Amy goes missing on their fifth
                         wedding anniversary. As the investigation unfolds, Nick becomes the prime suspect, and the story delves into
                          the media frenzy and public scrutiny that ensue. The novel cleverly uses unreliable narrators
                         and alternating perspectives to build suspense and reveal the dark undercurrents of the characters' lives.
                         <br>
                         <br>
                         At its core, "Gone Girl" is a commentary on the façade of perfection and the secrets people keep
                          hidden beneath the surface. Flynn's skillful storytelling unravels the layers of the characters' 
                          personalities and motives, creating a narrative that is both engrossing and unsettling. The novel's 
                          twists and turns challenge readers' 
                         perceptions and keep them guessing until the final page, making it a standout in the genre of psychological thrillers.
                        </p>
                        <br>
                     <p class="other" v-show="readingCount > 1">{{ readingCount }} people are currently reading</p>
                     <p class="other" v-show="readingCount === 1">{{ readingCount }} person is currently reading</p>
                </div>
              <div class=" shelf" @click="addShelf">
                {{ text }}
               </div>  
            </div>
            <TwentyTwoList v-if="filteredReviews.length" :reviews="filteredReviews"/>
           <ReviewPage @review-submitted="addReview"/>
    </template>
    <script>
    import TwentyTwoList from './TwentyTwoList.vue';
    import ReviewPage from '../Review.vue';
    import Cookies from 'js-cookie';
    export default {
        name:'GoneGirl',
        components: {
    ReviewPage,
    TwentyTwoList 
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
               const cookieKey = `shelf22_${userId}`;
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
            const bookId="book22";
            const key =`reviews_${bookId}`;
            Cookies.set(key,JSON.stringify(this.reviews));
        },
        loadReviews(){
            const bookId = "book22";
            const key = `reviews_${bookId}`;
            const userId = this.getUserId();
            const stored = Cookies.get(key);
            const shelf = Cookies.get(`shelf22_${userId}`);
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

                if(key.startsWith('book22_')) {
            
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