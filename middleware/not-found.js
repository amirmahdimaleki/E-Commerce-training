const notFound = (req, res) => res.status(404).send('Route does not exist')
// there is no next function because once we don't have a particular route, we are done
module.exports = notFound