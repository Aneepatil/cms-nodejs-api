import {Schema,model} from 'mongoose'

const academicSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    fromYear:{
        type:Date,
        required:true
    },
    toYear:{
        type:Date,
        required:true
    },
    isCurrent:{
        type:Boolean,
        default:true
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    },
    students:[{
        type:Schema.Types.ObjectId,
        ref:"Student",
    }],
    teachers:[{
        type:Schema.Types.ObjectId,
        ref:"Teacher",
    }],
},{timestamps:true}) 

export const AcademicYear = model('AcademicYear', academicSchema)