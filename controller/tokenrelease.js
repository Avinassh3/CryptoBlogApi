const TokenRelease = require('../Models/tokenrelease');
const slugify = require('slugify');
const { errorHandler } = require('../helpers/dbErrorHandler');
const formidable = require('formidable');
const { json } = require('body-parser');
exports.create = (req, res) => {
let form = new formidable.IncomingForm();
form.keepExtensions=true;
form.parse(req,(err,fields)=>{
    if(err){
        return res.status(400).json({
            error:"Cannot Update TokenRelease event try back later"
        });
    }

    const{name,release,amountoftokens,percentageoftokens,description}=fields;
    if(!name){
        return res.status(400).json({
            error:"Name is required"
        });
    }
    if(!release)
    {
        return res.status(400).json({
            error:"release date is required"
        });
    }
    if(release.split("/").length ===2)
    {
        return res.status(400).json({
            error:"release date Must Be in the form mm-yyyy"
        });
    }
    if((!amountoftokens)&&(!percentageoftokens))
    {
        return res.status(400).json({
            error:"any one of these amountoftokens,percentageoftokens field is required"
        });
    }
    if(!description)
    {
        return res.status(400).json({
            error:"Description is required"
        });
    }

    let token= new TokenRelease();
    token.name= slugify(name).toLowerCase();
    token.release=release;
    token.description=description;

    //TODO: this step is used to check wether this entry is there or not 
    token.mix=token.name+"-"+token.release;
    if(!amountoftokens)
    {
        token.amountoftokens=null
        token.percentageoftokens=percentageoftokens
    }
    else{
        token.amountoftokens=amountoftokens
        token.percentageoftokens=null
    }

   
    token.save((err,result)=>{
        if(err){
            return res.status(400).json({
                error:errorHandler(err)
            });
        }

            res.json(result)
    });


});

};
exports.read = (req, res) => {
    const name = req.params.name.toLowerCase();
    const release = req.params.release;
    if(!name){
        return res.status(400).json({
            error:"Name is required"
        });
    }
    if(!release)
    {
        return res.status(400).json({
            error:"release date is required"
        });
    }
    if(release.split("/").length ===2)
    {
        return res.status(400).json({
            error:"release date Must Be in the form mm-yyyy"
        });
    }
    TokenRelease.findOne({ name,release })
        .select()
        .exec((err, data) => {
            if (err) {
                return res.json({
                    error: errorHandler(err)
                });
            }
            res.json(data);
        });
    
};

exports.remove = (req, res) => {
    const name=req.params.name.toLowerCase();
    const release = req.params.release;
        if(!name){
        return res.status(400).json({
            error:"Name is required"
        });
    }
    if(!release)
    {
        return res.status(400).json({
            error:"release date is required"
        });
    }
    if(release.split("/").length ===2)
    {
        return res.status(400).json({
            error:"release date Must Be in the form mm-yyyy"
        });
    }
    TokenRelease.findOneAndRemove({name,release})
    .exec((err,data)=>{
        if(err)
        {
            return res.json({
                error:errorHandler(err)
            })
        }
        res.json({
            message: "Event  removed "
        })
    })
    
};

exports.list = (req,res) => {
    TokenRelease.find({})
    .select()
    .exec((err,data)=>{
        if(err)
        {
            return res.json({
                error:errorHandler(err)
            })
        }
        res.json(data)
    })
};

