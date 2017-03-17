import axios from 'axios';

let base = '';

export const getUserList = () => {return axios.get('./data/recording');}