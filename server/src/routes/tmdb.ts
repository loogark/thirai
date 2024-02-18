import express from "express";
import {
  getMovieDetailsPage,
  getMovieGenrePage,
  getMovieList,
  getMovieNowPlayingPage,
  getMoviePopularPage,
  getMovieReviews,
  getMovieTopRatedPage,
  getMovieTrendingPage,
  getMovieUpcomingPage,
  getPersonDetailsPage,
  getSearchResults,
  getShowAiringTodayPage,
  getShowDetailsPage,
  getShowEpisodesPage,
  getShowGenrePage,
  getShowList,
  getShowOnTheAirPage,
  getShowPopularPage,
  getShowReviews,
  getShowTopRatedPage,
  getShowTrendingPage,
  getTrending,
  singleMovieTrending,
  singleShowTrending,
} from "../controllers/tmdbController";

const router = express.Router();

// Route controller

// get Trending
router.get("/trending/:type", getTrending);

// single Trending Movie
router.get("/trending/movie/:id", singleMovieTrending);

// single Trending Show
router.get("/trending/show/:id", singleShowTrending);

// get Movie List
router.get("/list/movie/:type", getMovieList);

// get Show List
router.get("/list/show/:type", getShowList);

// get Trending Movie Page
router.get("/trending/movie/page/:page", getMovieTrendingPage);

// get Now Playing Movie Page
router.get("/movie/nowplaying/:page", getMovieNowPlayingPage);

// get Popular Movie Page
router.get("/movie/popular/:page", getMoviePopularPage);

// get Top-Rated Movie Page
router.get("/movie/toprated/:page", getMovieTopRatedPage);

// get Upcoming Movie Page
router.get("/movie/upcoming/:page", getMovieUpcomingPage);

// get Movie Details Page
router.get("/details/movie/:id", getMovieDetailsPage);

// get Movie Genre Page
router.get("/movie/genre/:genre/:page", getMovieGenrePage);

// get movie reviews
router.get("/movie/:id/reviews/:page", getMovieReviews);

// get Trending Show Page
router.get("/trending/show/page/:page", getShowTrendingPage);

// get Airing Today Show Page
router.get("/show/airingtoday/:page", getShowAiringTodayPage);

// get Popular Show Page
router.get("/show/popular/:page", getShowPopularPage);

// get Top-Rated Show Page
router.get("/show/toprated/:page", getShowTopRatedPage);

// get On The Air Show Page
router.get("/show/ontheair/:page", getShowOnTheAirPage);

// get Show Details Page
router.get("/details/show/:id", getShowDetailsPage);

// get Show Episodes Details Page
router.get("/episodes/show/:id/:seasonnumber", getShowEpisodesPage);

// get movie reviews
router.get("/show/:id/reviews/:page", getShowReviews);

// get Show Genre Page
router.get("/show/genre/:genre/:page", getShowGenrePage);

// get Person Details Page
router.get("/person/:id", getPersonDetailsPage);

// get Search Page
router.get("/search/:query/:page", getSearchResults);

export default router;
