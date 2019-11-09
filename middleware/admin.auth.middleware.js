module.exports.checkAuth = async (req, res, next) => {
   // TODO: add auth check
   console.log('Checking Admin Auth at: ', Date.now())
   next()
}