"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tmdbController_1 = require("../controllers/tmdbController");
const router = express_1.default.Router();
// Route controller
// get Trending
router.get("/trending/:type", tmdbController_1.getTrending);
// single Trending Movie
router.get("/trending/movie/:id", tmdbController_1.singleMovieTrending);
// single Trending Show
router.get("/trending/show/:id", tmdbController_1.singleShowTrending);
// get Movie List
router.get("/list/movie/:type", tmdbController_1.getMovieList);
// get Show List
router.get("/list/show/:type", tmdbController_1.getShowList);
// get Trending Movie Page
router.get("/trending/movie/page/:page", tmdbController_1.getMovieTrendingPage);
// get Now Playing Movie Page
router.get("/movie/nowplaying/:page", tmdbController_1.getMovieNowPlayingPage);
// get Popular Movie Page
router.get("/movie/popular/:page", tmdbController_1.getMoviePopularPage);
// get Top-Rated Movie Page
router.get("/movie/toprated/:page", tmdbController_1.getMovieTopRatedPage);
// get Upcoming Movie Page
router.get("/movie/upcoming/:page", tmdbController_1.getMovieUpcomingPage);
// get Movie Details Page
router.get("/details/movie/:id", tmdbController_1.getMovieDetailsPage);
// get Movie Genre Page
router.get("/movie/genre/:genre/:page", tmdbController_1.getMovieGenrePage);
// get movie reviews
router.get("/movie/:id/reviews/:page", tmdbController_1.getMovieReviews);
// get Trending Show Page
router.get("/trending/show/page/:page", tmdbController_1.getShowTrendingPage);
// get Airing Today Show Page
router.get("/show/airingtoday/:page", tmdbController_1.getShowAiringTodayPage);
// get Popular Show Page
router.get("/show/popular/:page", tmdbController_1.getShowPopularPage);
// get Top-Rated Show Page
router.get("/show/toprated/:page", tmdbController_1.getShowTopRatedPage);
// get On The Air Show Page
router.get("/show/ontheair/:page", tmdbController_1.getShowOnTheAirPage);
// get Show Details Page
router.get("/details/show/:id", tmdbController_1.getShowDetailsPage);
// get Show Episodes Details Page
router.get("/episodes/show/:id/:seasonnumber", tmdbController_1.getShowEpisodesPage);
// get movie reviews
router.get("/show/:id/reviews/:page", tmdbController_1.getShowReviews);
// get Show Genre Page
router.get("/show/genre/:genre/:page", tmdbController_1.getShowGenrePage);
// get Person Details Page
router.get("/person/:id", tmdbController_1.getPersonDetailsPage);
// get Search Page
router.get("/search/:query/:page", tmdbController_1.getSearchResults);
exports.default = router;
