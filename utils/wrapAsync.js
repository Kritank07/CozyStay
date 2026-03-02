// This folder will contain all the extra code for example wrap async utility to handle try catch for async functions in express routes.

function wrapAsync(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch(err => next(err))
    }
}
module.exports = wrapAsync