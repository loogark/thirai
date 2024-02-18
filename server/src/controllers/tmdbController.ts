import axios from "axios";
import { Request, Response } from "express";
import env from "../utils/validateEnv";

// ENVIRONMENT VARIABLES
const { BASE_URL, API_KEY } = env;

// Get Trending
export const getTrending = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}trending/${req.params.type}/day?api_key=${API_KEY}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Single Trending Movie Data
export const singleMovieTrending = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${req.params.id}?api_key=${API_KEY}&append_to_response=videos,release_dates`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Single Trending Show Data
export const singleShowTrending = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/${req.params.id}?api_key=${API_KEY}&append_to_response=videos,content_ratings`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie List
export const getMovieList = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${req.params.type}?api_key=${API_KEY}&language=en-US&page=1`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie List
export const getShowList = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/${req.params.type}?api_key=${API_KEY}&language=en-US&page=1`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Trending Page
export const getMovieTrendingPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}trending/movie/day?api_key=${API_KEY}&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Trending Page
export const getMovieNowPlayingPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/now_playing?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Popular Page
export const getMoviePopularPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Popular Page
export const getMovieTopRatedPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Upcoming Page
export const getMovieUpcomingPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/upcoming?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Details Page
export const getMovieDetailsPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images,casts,external_ids,similar&include_image_language=en,null`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Movie Genre Page
export const getMovieGenrePage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${req.params.page}&with_genres=${req.params.genre}&with_watch_monetization_types=flatrate`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Trending Page
export const getShowTrendingPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}trending/tv/day?api_key=${API_KEY}&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Airing Today Page
export const getShowAiringTodayPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/airing_today?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Popular Page
export const getShowPopularPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/popular?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Top Rated Page
export const getShowTopRatedPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/top_rated?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show On The Air Page
export const getShowOnTheAirPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/on_the_air?api_key=${API_KEY}&language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Details Page
export const getShowDetailsPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=videos,images,credits,similar,external_ids,episode_groups&include_image_language=en,null`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Episodes
export const getShowEpisodesPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/${req.params.id}/season/${req.params.seasonnumber}?api_key=${API_KEY}&language=en-US`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Show Genre Page
export const getShowGenrePage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${req.params.page}&without_genres=${req.params.genre}&include_null_first_air_dates=false&with_watch_monetization_types=flatrate&with_status=0&with_type=0`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Person Details Page
export const getPersonDetailsPage = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}person/${req.params.id}?api_key=${API_KEY}&language=en-US&append_to_response=combined_credits,images,external_ids`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Get Search Results
export const getSearchResults = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}search/multi?api_key=${API_KEY}&language=en-US&query=${req.params.query}&page=${req.params.page}&include_adult=false`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getMovieReviews = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}movie/${req.params.id}/reviews?api_key=${API_KEY}&?language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getShowReviews = async (req: Request, res: Response) => {
  try {
    const request = await axios.get(
      `${BASE_URL}tv/${req.params.id}/reviews?api_key=${API_KEY}&?language=en-US&page=${req.params.page}`
    );
    res.status(200).json(request.data);
  } catch (error) {
    res.status(500).json(error);
  }
};
