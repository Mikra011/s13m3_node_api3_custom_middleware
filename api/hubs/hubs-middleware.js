const Hubs = require('./hubs-model.js');

async function checkHubId(req, res, next) {
    const { id } = req.params;
    try {
        const hub = await Hubs.findById(id);
        if (hub) {
            req.hub = hub;
            next();
        } else {
            next({ status: 404, message: `Hub ${id} not found` });
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    checkHubId,
};