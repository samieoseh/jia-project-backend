const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    role:{
        type: String,
        trim: true,
        default: "user",
        required: true
    },
    email: {
        type: String,
        unique:true,
        trim: true,
        lowercase: true,
        required: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
        trim: true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Invalid password')
            }
        }
    },
    tokens: [{
        token: {
             type:String,
            required: true
        }
    }]
})

userSchema.pre('save', async function (next) {
    const user = this
    if(user.isModified('password')){
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
    }
})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user._id.toString()}, 'love', {expiresIn: '7 days'})
    user.tokens.push({token})
    await user.save()
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('User', userSchema)

module.exports = User