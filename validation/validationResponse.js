const validationResponse = () => {
    const res = {};
    res.status = jest.fn(() => res);
    res.send = jest.fn(value => value);
    return res;
  };
module.exports= validationResponse