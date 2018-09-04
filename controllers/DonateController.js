const Donate		= require('./../models').Donate;
var moment 			= require('moment');
const DoctorService 	= require('../services/DoctorService');
const axios			= require('axios');

const Index = async function(req, res){
	let donations, userId = req.user.id;
	[err, donations] = await to(getAllDonates({
			userId: userId,
			status: 0
		}));
	if (err) return ReE(res, {message: err.message});
	
	return res.render('pending', {donations: donations,  linkLabel: 'Pending Donations'});
}
module.exports.Index = Index

const Get = async function(req, res){
	let donation, userId = req.user.id;
	[err, donation] = await to(Donate.findById(req.params.id));
	if (err) return res.render('error', {message: err.message});
	
	return res.render('view', donation.dataValues);
}
module.exports.Get = Get

const Submitted = async function(req, res){
	let donations, userId = req.user.id;
	[err, donations] = await to(getAllDonates({
			userId: userId,
			status: 1
		}));
	if (err) return ReE(res, {message: err.message});
	
	return res.render('pending', {donations: donations, linkLabel: 'Checking Donations'});	
}
module.exports.Submitted = Submitted

const Checked = async function(req, res){
	let donations, userId = req.user.id;
	[err, donations] = await to(getAllDonates({
			userId: userId,
			status: 2
		}));
	if (err) return ReE(res, {message: err.message});
	
	return res.render('pending', {donations: donations, linkLabel: 'Checking Donations'});	
}
module.exports.Checked = Checked

const Approved = async function(req, res){
	let donations, userId = req.user.id;
	[err, donations] = await to(getAllDonates({
			userId: userId,
			status: 3
		}));
	if (err) return ReE(res, {message: err.message});
	
	return res.render('pending', {donations: donations,  linkLabel: 'Approving Donations'});
}
module.exports.Approved = Approved

const ApprovedDonate = async function(req, res){
	let donation, id = req.body.appId;
	[err, donation] = await to(Donate.findById(id));
	if (err) return ReE(res, {message: err.message});

	await to(donation.updateAttributes({
		status: 4
	}));
	return ReS(res, {message: 'Successfully handshake'});
}
module.exports.ApprovedDonate = ApprovedDonate

const Finished = async function(req, res){
	let donations, userId = req.user.id;
	[err, donations] = await to(getAllDonates({
			userId: userId,
			status: 4
		}));
	if (err) return ReE(res, {message: err.message});
	
	return res.render('pending', {donations: donations,  linkLabel: 'Finished Donations'});
}
module.exports.Finished = Finished

const Create = async function(req, res){
	let donate, user = req.user;
	
	var donateInfo = req.body;
	if (!donateInfo) return ReE(res, {message: 'Please fill form data'});
	donateInfo.userId = user.id;
	donateInfo.status = 0;

	[err, donate] = await to(Donate.create(donateInfo));
	if (err) return res.render('error', {message: err.message});
	return res.redirect('/donate');
}
module.exports.Create = Create

const getAllDonates = function(where) {
	return new Promise(async function(resolve, reject) {
		let donations;
		[err, donations] = await to(Donate.findAll({
			where: where,
			order: [
				['created_dt', 'DESC'],
				['status', 'DESC']
			]
		}));
		if (err) reject(err);
		else {
			let results = [];
			donations.map(donationModel => {
				var row = {
					id: donationModel.dataValues.id,
					status: donationModel.dataValues.status,
					donateType: donationModel.dataValues.donateType=="BL"? "Blood": donationModel.dataValues.donateType=="TI"? "Tissues": "Organs",
					createdAt: moment(donationModel.dataValues.createdAt).format("YYYY/MM/DD"),
					checkedAt: donationModel.dataValues.customField1? moment(donationModel.dataValues.customField1).format("YYYY/MM/DD"): '',
					approvedAt: donationModel.dataValues.customField2? moment(donationModel.dataValues.customField2).format("YYYY/MM/DD"): '',
					finishedAt: donationModel.dataValues.customField3? moment(donationModel.dataValues.customField3).format("YYYY/MM/DD"): ''
				}
				results.push(row);
			});
			resolve(results);
		}		
	});	
}
module.exports.getAllDonates = getAllDonates;

const SendToDoctor = async function(req, res){
	let donate, doctor, user = req.user;
	
	var info = req.body;
	if (!info) return ReE(res, {message: 'Please fill form data'});
	[err, donate] = await to(Donate.findById(info.appId));
	if (err) return res.render('error', {message: err.message});
	if (!donate) return res.render('error', {message: 'Please select correct donation!'});
	
	info.donate = donate.dataValues;	
	[err, doctor] = await to(axios.post(`${CONFIG.dr_host}/api/create`, info));
	if (err) return res.render('error', {message: err.message});
	
	await to(donate.updateAttributes({
		status: 1
	}));	
	return res.redirect('/submitted');
}
module.exports.SendToDoctor = SendToDoctor

/** requested checkbody */
const RequestedCheckBody = async function(req, res) {
	let donation, id = req.body.appId;
	[err, donation] = await to(Donate.findById(id));
	if (err) return ReE(res, {message: err.message});

	await to(donation.updateAttributes({
		status: 2
	}));
	return ReS(res, {message: 'Successfully handshake'});
}
module.exports.RequestedCheckBody = RequestedCheckBody