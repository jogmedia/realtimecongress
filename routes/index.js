
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Voter Control', district: 'Stone Mountain' })
};