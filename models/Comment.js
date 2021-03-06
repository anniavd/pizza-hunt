const { Schema, model, Types } = require('mongoose');
const moment = require('moment');



const ReplySchema = new Schema(
  {
    // set custom id to avoid confusion with parent comment's _id field
    replyId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    replyBody: {
      type: String,
      required:true,
      trim: true 
    },
    writtenBy: {
      type: String,
      required:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    }
  },
  {
    toJSON: {
      virtuals:true,
      getters: true
    }
  }
);


const CommentSchema = new Schema(
  {
    writtenBy: {
      type: String
    },
    commentBody: {
      type: String,
      required:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
    },
    // use ReplySchema to validate data for a reply
    replies: [ReplySchema]
  },
  {
    toJSON: {
      getters: true
    },
  }
);

CommentSchema.virtual('replyCount').get(function() {
  return this.replies.length;
});



//for replies comments

const Comment = model('Comment', CommentSchema);

module.exports = Comment;