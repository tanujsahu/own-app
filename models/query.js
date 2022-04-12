module.exports = mongoose => {
    const Query = mongoose.model('query', mongoose.Schema({
        user_id: String,
        query: String,
        queryType: String,
        answerList: [{ ans_user_id: String, answer: String, ans_dateTime: Date }]
    }, { timestamps: true }))
    return Query;
}