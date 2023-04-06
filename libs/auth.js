


module.exports ={
    isLoggedin:(req,res,next)=>{
        let header=req.headers
        if(!req.headers.authorization){
            return res.status(401).json({message:"auth failed"})

        }
   // console.log('hhh',header.authorization); 
    let token= req.headers.authorization.split('')[1]
    console.log('token',token)
    var decoded = jwt.verify(token, 'insta',async function(err, decoded) {
        if(error){
            return res.status(401).json({message:"auth failed"})
        }
console.log(decoded) // bar
req.user = await User.findById(decoded.userId,'fullName userName email')
next()

    })
}
}