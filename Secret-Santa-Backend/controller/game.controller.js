const responseCodes = require('../HttpResponse.js');

const createGame = async(req, res) => {

    const user = req.user;
    try {
        return res.status(responseCodes.CREATED).send(review);
    } catch (error) {
        return res.status(responseCodes.INTERNAL_SERVER_ERROR).send({error: error.message});
    }
}

module.exports = {
    createGame
}