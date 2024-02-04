// import { Schema, Document, model, Types } from "mongoose";

// type Like = {
//     likedBy: Types.ObjectId;
//     likeTo: Types.ObjectId;
// };

// type LikeDocument =  Like  & Document;


// const likeSchema = new Schema<LikeDocument>({
//     likedBy:{
//         type: Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     likeTo:{
//         type: Schema.Types.ObjectId,
//         ref: 'Tweet'
//     }
   
// });

// const Like = model<LikeDocument>("Like", likeSchema);
// export default Like;