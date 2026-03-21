// Middleware 404 для неіснуючих маршрутів

export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
};
