const mongoose = require('mongoose')


const pollSchema = new mongoose.Schema(
    {
        options: { type:Array, required:true},
        voters: { type:Array, required:false, default:[]},
    }, {timestamps:true}
)

const nestedCommentSchema = new mongoose.Schema(
    {
        body: { type:String, required:true },
        poster: { type:String, required:true },
        posterID: { type:String, required:true },
        status: { type:String, required:true, default:"active "},
        total_votes: { type:Number, required:true, default:0 },
        users_voted: { type:Array, required:true, default:[]},
        current_user_upvoted: { type: Boolean},
        current_user_admin: { type: Boolean},
    }, {timestamps:true}
)

const commentSchema = new mongoose.Schema(
    {
        body: { type:String, required:true },
        nested_comments: [nestedCommentSchema],
        poster: { type:String, required:true },
        posterID: { type:String, required:true },
        status: { type:String, required:true, default:"active "},
        total_votes: { type:Number, required:true, default:0 },
        users_voted: { type:Array, required:true, default:[]},
        current_user_upvoted: { type: Boolean},
        current_user_admin: { type: Boolean},
    }, {timestamps:true}
)

const postSchema = new mongoose.Schema(
    {
        type: { type:Number, required:true }, // 1=text, 2=link, 3=media 4=poll
        status: { type:String, required:true, default:"active"}, //active, deleted, removed
        title: { type:String, required:true },
        body: { type:String },
        poll_data:pollSchema,
        poster: { type:String, required:true},
        posterID: { type:String },
        posterAvatarSrc: { type:String, default:""},
        link: { type:String }, // only if type=2 or type=3
        topic: { type:String, default: "all"},
        date: { type: String, default: Date.now() },
        timestamp: { type: String },
        last_touched_timestamp: {type: String},
        total_votes: { type: Number, default: 0},
        upvotes: { type: Number, default: 0},
        downvotes: { type: Number, default: 0},
        users_upvoted: { type: Array},
        users_downvoted: { type: Array },
        current_user_upvoted: { type: Boolean},
        current_user_downvoted: { type: Boolean},
        current_user_admin: { type: Boolean},
        comments: [commentSchema],
        nsfw: { type:Boolean }
    },
    { collection: 'posts', timestamps:true}
)

const Post = mongoose.model('PostSchema', postSchema)


module.exports = Post
