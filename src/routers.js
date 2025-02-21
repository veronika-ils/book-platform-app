import HomePage from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import LoginPage from "./components/Login.vue";
import myFave from "../Seminarska/myFave.vue"
import myShelf from "../Seminarska/myShelf.vue";
import NineteenEightyFour  from "../Seminarska/book1/1984.vue";
import ToKillMockingBird from "../Seminarska/book2/ToKillMockingBird.vue";
import DonQuixote from "../Seminarska/book3/DonQuixote.vue";
import MobyDick from "../Seminarska/book4/MobyDick.vue";
import GreatGatsby from "../Seminarska/book5/GreatGatsby.vue";
import LordTheRings from "../Seminarska/book6/LordTheRings.vue";
import PridePrejudice from "../Seminarska/book7/PridePrejudice.vue";
import AnnaKarenina from "../Seminarska/book8/AnnaKarenina.vue";
import OneHundredYears from "../Seminarska/book9/OneHundredYears.vue";
import JaneEyre from "../Seminarska/book10/JaneEyre.vue";
import HuckleberryFinn from "../Seminarska/book11/HuckleberryFinn.vue";
import WutheringHeights from "../Seminarska/book12/WutheringHeights.vue";
import HamletPage from "../Seminarska/book13/HamletPage.vue";
import BelovedPage from "../Seminarska/book14/BelovedPage.vue";
import MyProfile from "../Seminarska/MyProfile.vue";
import WelcomePage from "./components/WelcomePage.vue";
import HungerGames from "../Seminarska/book15/HungerGames.vue";
import KiteRunner from "../Seminarska/book16/KiteRunner.vue";
import HousmaidsSecret from "../Seminarska/book17/HousemaidsSecret.vue"
import TheTempest from "../Seminarska/book18/TheTempest.vue"
import EndsWithUs from "../Seminarska/book19/EndsWithUs.vue"
import GirlonTrain from "../Seminarska/book20/GirlonTrain.vue"
import SecretHistory from "../Seminarska/book21/SecretHistory.vue"
import GoneGirl from "../Seminarska/book22/GoneGirl.vue"
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        name: "HomePage",
        component: HomePage,
        path: "/"
    },
    {
        name: "SignUp",
        component: SignUp,
        path: "/sign-up"
    },
    {
        name:"LoginPage",
        component:LoginPage,
        path:"/login"
    },{
        name:"myFave",
        component:myFave,
        path:"/myFavourites"
    },{
        name:"myShelf",
        component:myShelf,
        path:"/myShelf"
    },{
        name:"NineteenEightyFour",
        component:NineteenEightyFour,
        path:"/1984"
    },{
        name:"ToKillMockingBird",
        component:ToKillMockingBird,
        path:"/ToKillAMockingBird"
    },{
        name:"DonQuixote",
        component:DonQuixote,
        path:"/DonQuixote"
    },{
        name:"MobyDick",
        component:MobyDick,
        path:"/MobyDick"
    },{
        name:"GreatGatsby",
        component:GreatGatsby,
        path:"/TheGreatGatsby"
    },{
        name:"LordTheRings",
        component:LordTheRings,
        path:"/TheLordOfTheRings"
    },{
        name:"PridePrejudice",
        component:PridePrejudice,
        path:"/PrideAndPrejudice"
    },{
        name:"AnnaKarenina",
        component:AnnaKarenina,
        path:"/AnnaKarenina"
    },{
        name:"OneHundredYears",
        component:OneHundredYears,
        path:"/OneHundredYearsofSolitude"
    },{
        name:"JaneEyre",
        component:JaneEyre,
        path:"/JaneEyre"
    },{
        name:"HuckleberryFinn",
        component:HuckleberryFinn,
        path:"/TheAdventuresofHuckleberryFinn"
    },{
        name:"WutheringHeights",
        component:WutheringHeights,
        path:"/WutheringHeights"
    },{
        name:"HamletPage",
        component:HamletPage,
        path:"/Hamlet"
    },{
        name:"BelovedPage",
        component:BelovedPage,
        path:"/Beloved"
    },{
        name:"MyProfile",
        component:MyProfile,
        path:"/MyProfile"
    },{
        name:"WelcomePage",
        component:WelcomePage,
        path:"/Welcome"
    },{
        name:"HungerGames",
        component:HungerGames,
        path:"/TheHungerGames"
    },{
        name:"KiteRinner",
        component:KiteRunner,
        path:"/TheKiteRunner"
    },{
        name:"HousemaidsSecret",
        component:HousmaidsSecret,
        path:"/TheHousemaidsSecret"
    },{
        name:"TheTempest",
        component:TheTempest,
        path:"/TheTempest"
    },{
        name:"EndsWithUs",
        component:EndsWithUs,
        path:"/ItEndsWithUs"
    },{
        name:"GirlonTrain",
        component:GirlonTrain,
        path:"/TheGirlonTheTrain"
    },{
        name:"SecretHistory",
        component:SecretHistory,
        path:"/TheSecretHistory"
    },{
        name:"GoneGirl",
        component:GoneGirl,
        path:"/GoneGirl"
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router