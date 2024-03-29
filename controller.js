

exports.initila=(req,res)=>{

    res.render('index');
}

exports.registerUser=(req,res)=>{

    
    const {exampleInputEmail1,exampleInputPassword1}=req.body;
    
}

exports.getLoginUser=(req,res)=>{
    res.render('login');


}


exports.loginUser=(req,res)=>{
    
    const {exampleInputEmail1,exampleInputPassword1}=req.body;


    console.log(exampleInputEmail1);

}