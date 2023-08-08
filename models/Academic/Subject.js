import {Schema,model} from 'mongoose'

const subjectSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    teacher:{
        type:Schema.Types.ObjectId,
        ref:"Teacher"
    },
    academicTerm:{
        type:Schema.Types.ObjectId,
        ref:"Teacher",
        required:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    },
    duration:{
        type:String,
        required:true,
        default:'3 months'
    },
},{timestamps:true}) 

export const Subject = model('Subject', subjectSchema)