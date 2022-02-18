const amcore = jest.requireActual('@amcharts/amcharts4/core');

const create = function (id, chart) {
  return new chart();
};

module.exports = {
  __esModule: true,
  ...amcore,
  create,
};
