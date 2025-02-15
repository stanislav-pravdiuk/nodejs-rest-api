const { Contact } = require('../models/contact');
const {
        HttpError,
        CtrlWrapper
} = require('../helpers');

async function getAll(req, res) {
        const { _id: owner } = req.user;
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;
        const result = await Contact.find({owner}, "-cratedAt -updatedAt", {skip, limit}).populate('owner', 'email subscription');
        res.json(result);
};

async function getById(req, res){
        const { id } = req.params;
        // const result = await Contact.findOne({ _id: id });
        const result = await Contact.findById(id);
        if (!result) {
                throw HttpError(404, "Not found");
        };
        res.json(result);
};

async function add(req, res) {
        const { _id: owner } = req.user;
        const result = await Contact.create({ ...req.body, owner });
        res.status(201).json(result);
};

async function update(req, res) {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true});
        if (!result) {
                throw HttpError(404, "Not found");
        };
        res.json(result);
};

async function updateFavorite(req, res) {
        const { id } = req.params;
        const result = await Contact.findByIdAndUpdate(id, req.body, { new: true});
        if (!result) {
                throw HttpError(404, "Not found");
        };
        res.json(result);
};

async function del(req, res) {
        const { id } = req.params;
        const result = await Contact.findByIdAndRemove(id);
        if (!result) {
                throw HttpError(404, "Not found");
        };
        res.json({ message: 'contact deleted' });
};

module.exports = {
        getAll: CtrlWrapper(getAll),
        getById: CtrlWrapper(getById),
        add: CtrlWrapper(add),
        update: CtrlWrapper(update),
        updateFavorite: CtrlWrapper(updateFavorite),
        del: CtrlWrapper(del),
};

