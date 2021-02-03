exports.getPrivateData = (req, res, next) =>{
    res.status(200).json({acces: "Accessed private"});
}
