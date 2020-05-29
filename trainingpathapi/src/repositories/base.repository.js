class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    async get(id) {
        return await this.model.findById(id);
    }
    async getAll(pageSize = 25, pageNum = 1) {
        const skips = pageSize * (pageNum - 1);
        return await this.model.find().skip(skips).limit(pageSize);
    }
    async create(entity) {
        return await this.model.create(entity);
    }
    async update(id, entity) {
        return await this.model.findByIdAndUpdate(id, entity, { new: true });
    }
    async delete(id) {
        await this.model.findByIdAndDelete(id);
        return true;
    }
    async bulkInsert(entitys) {
        return await this.model.insertMany(entitys);
    }
}

module.exports = BaseRepository;