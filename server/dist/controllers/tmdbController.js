"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShowReviews = exports.getMovieReviews = exports.getSearchResults = exports.getPersonDetailsPage = exports.getShowGenrePage = exports.getShowEpisodesPage = exports.getShowDetailsPage = exports.getShowOnTheAirPage = exports.getShowTopRatedPage = exports.getShowPopularPage = exports.getShowAiringTodayPage = exports.getShowTrendingPage = exports.getMovieGenrePage = exports.getMovieDetailsPage = exports.getMovieUpcomingPage = exports.getMovieTopRatedPage = exports.getMoviePopularPage = exports.getMovieNowPlayingPage = exports.getMovieTrendingPage = exports.getShowList = exports.getMovieList = exports.singleShowTrending = exports.singleMovieTrending = exports.getTrending = void 0;
const axios_1 = __importDefault(require("axios"));
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
// ENVIRONMENT VARIABLES
const { BASE_URL, API_KEY } = validateEnv_1.default;
// Get Trending
const getTrending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}trending/${req.params.type}/day?api_key=${API_KEY}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getTrending = getTrending;
// Single Trending Movie Data
const singleMovieTrending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/${req.params.id}?api_key=${API_KEY}&append_to_response=videos,release_dates`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.singleMovieTrending = singleMovieTrending;
// Single Trending Show Data
const singleShowTrending = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/${req.params.id}?api_key=${API_KEY}&append_to_response=videos,content_ratings`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.singleShowTrending = singleShowTrending;
// Get Movie List
const getMovieList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/${req.params.type}?api_key=${API_KEY}&language=en-US&page=1`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieList = getMovieList;
// Get Movie List
const getShowList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/${req.params.type}?api_key=${API_KEY}&language=en-US&page=1`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowList = getShowList;
// Get Movie Trending Page
const getMovieTrendingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieTrendingPage = getMovieTrendingPage;
// Get Movie Trending Page
const getMovieNowPlayingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieNowPlayingPage = getMovieNowPlayingPage;
// Get Movie Popular Page
const getMoviePopularPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMoviePopularPage = getMoviePopularPage;
// Get Movie Popular Page
const getMovieTopRatedPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieTopRatedPage = getMovieTopRatedPage;
// Get Movie Upcoming Page
const getMovieUpcomingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieUpcomingPage = getMovieUpcomingPage;
// Get Movie Details Page
const getMovieDetailsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images,casts,external_ids,similar&include_image_language=en,null`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieDetailsPage = getMovieDetailsPage;
// Get Movie Genre Page
const getMovieGenrePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.params.page}&with_genres=${req.params.genre}&with_watch_monetization_types=flatrate`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieGenrePage = getMovieGenrePage;
// Get Show Trending Page
const getShowTrendingPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}trending/tv/day?api_key=${API_KEY}&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowTrendingPage = getShowTrendingPage;
// Get Show Airing Today Page
const getShowAiringTodayPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/airing_today?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowAiringTodayPage = getShowAiringTodayPage;
// Get Show Popular Page
const getShowPopularPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowPopularPage = getShowPopularPage;
// Get Show Top Rated Page
const getShowTopRatedPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowTopRatedPage = getShowTopRatedPage;
// Get Show On The Air Page
const getShowOnTheAirPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowOnTheAirPage = getShowOnTheAirPage;
// Get Show Details Page
const getShowDetailsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images,credits,similar,external_ids,episode_groups&include_image_language=en,null`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowDetailsPage = getShowDetailsPage;
// Get Show Episodes
const getShowEpisodesPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/${req.params.id}/season/${req.params.seasonnumber}?api_key=${API_KEY}&language=en-US`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowEpisodesPage = getShowEpisodesPage;
// Get Show Genre Page
const getShowGenrePage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${req.params.page}&without_genres=${req.params.genre}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowGenrePage = getShowGenrePage;
// Get Person Details Page
const getPersonDetailsPage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}person/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits,images,external_ids`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getPersonDetailsPage = getPersonDetailsPage;
// Get Search Results
const getSearchResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${req.params.query}&page=${req.params.page}&include_adult=false`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getSearchResults = getSearchResults;
const getMovieReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}movie/${req.params.id}/reviews?api_key=${API_KEY}&?language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getMovieReviews = getMovieReviews;
const getShowReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const request = yield axios_1.default.get(`${BASE_URL}tv/${req.params.id}/reviews?api_key=${API_KEY}&?language=en-US&page=${req.params.page}`);
        res.status(200).json(request.data);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getShowReviews = getShowReviews;
