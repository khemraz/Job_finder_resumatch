const {check,validationResult}=require('express-validator')


exports.validate=(req,res,next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        //return res.status(400).json({error:errors.array().map(err=>err.msg)})
        return res.status(400).json({error:errors.array()[0].msg})
    }
    next()
}

exports.userCheck = [
    check("username", "User name is required").notEmpty().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
    
    check("email", "email is required").notEmpty().isEmail().withMessage("email format incorrect")
    //email milena bhane withMessage auxa
    ,
    check("password", "Password is  required").notEmpty().matches(/[a-z]/).withMessage("Password contain must 1 lowercase character ").matches(/[A-Z]/).withMessage("Password must contain at least 1 upper case character").isLength({ min: 8 }).withMessage("password must  be at least 8 characters")
      .not().matches(/[./\\]/).withMessage("password must not contain . or / or \\")
  ]

  exports.companyCheck=[
    check("companyname", "Company name is required").notEmpty().isLength({ min: 3 }).withMessage("Companyname must be at least 3 characters"),
    
    check("email", "email is required").notEmpty().isEmail().withMessage("email format incorrect")
    //email milena bhane withMessage auxa
    ,
    check("password", "Password is  required").notEmpty().matches(/[a-z]/).withMessage("Password contain must 1 lowercase character ").matches(/[A-Z]/).withMessage("Password must contain at least 1 upper case character").isLength({ min: 8 }).withMessage("password must  be at least 8 characters")
      .not().matches(/[./\\]/).withMessage("password must not contain . or / or \\")
  ]
