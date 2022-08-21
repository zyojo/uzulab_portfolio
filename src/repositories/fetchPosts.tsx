import axios from 'axios'

export const fetchPosts = (url: string) =>
  axios
    .get(url, {
      withCredentials: true,
    })
    .then((res) => res.data)
