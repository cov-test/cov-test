import axios from 'axios';

const addResult = async (result) => {
  let returnObject = {};
  try {
    const response = await axios.post('/store_result', result);
    returnObject = response;
  } catch (e) {
    returnObject = e;
  }
  return returnObject;
};

export default addResult;
