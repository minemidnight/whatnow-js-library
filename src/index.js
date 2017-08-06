const baseURL = "https://whatnowapp.net/api/";
const superagent = require("superagent");

module.exports = {
	parties: token => {
		if(!token) throw new Error("No token provided");

		return {
			get: async (options = {}) => {
				if(typeof options === "object") {
					let data = Object.assign({ limit: 20, offset: 0, minprice: 0, maxprice: 100, premium: false }, options);
					try {
						let { body: { parties } } = await superagent.get(`${baseURL}/parties`)
							.set("Authorization", token)
							.send(data);
						return parties;
					} catch(err) {
						let error = new Error(err.response.message || err.message);
						error.responseCode = err.status;
						if(err.response && err.response.code) error.jsonCode = err.response.code;
						throw error;
					}
				} else {
					let id = options;

					try {
						let { body: { party } } = await superagent.get(`${baseURL}/parties/${id}`)
							.set("Authorization", token);
						return party;
					} catch(err) {
						let error = new Error(err.response.message || err.message);
						error.responseCode = err.status;
						if(err.response && err.response.code) error.jsonCode = err.response.code;
						throw error;
					}
				}
			},
			create: async options => {
				let data = Object.assign({ premium: false, price: 0 }, options);
				try {
					let { body: { party } } = await superagent.post(`${baseURL}/parties`)
						.set("Authorization", token)
						.send(data);
					return party;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			modify: async (id, data) => {
				try {
					let { body: { party } } = await superagent.patch(`${baseURL}/parties/${id}`)
						.set("Authorization", token)
						.send(data);
					return party;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			delete: async id => {
				try {
					let resp = await superagent.delete(`${baseURL}/parties/${id}`)
						.set("Authorization", token);
					return true;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			}
		};
	},
	users: token => {
		if(!token) throw new Error("No token provided");

		return {
			get: async (id = "@me") => {
				try {
					let { body: { user } } = await superagent.get(`${baseURL}/users/${id}`)
						.set("Authorization", token);
					return user;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			modify: async (id = "@me", data) => {
				try {
					let { body } = await superagent.patch(`${baseURL}/users/${id}`)
						.set("Authorization", token)
						.send(data);

					if(body.token) return body.token;
					else if(body.otpURL) return { otpURL: body.otpURL, user: body.user };
					else return body.user;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			delete: async (id = "@me") => {
				try {
					let resp = await superagent.delete(`${baseURL}/users/${id}`)
						.set("Authorization", token);
					return true;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			getParties: async (id = "@me") => {
				try {
					let { body: { parties } } = await superagent.get(`${baseURL}/users/${id}/parties`)
						.set("Authorization", token);
					return parties;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			verify: async id => {
				let key = token;

				try {
					let { body: { user } } = await superagent.post(`${baseURL}/users/${id}/verify`)
						.send({ key });
					return user;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			resend: async (id = "@me") => {
				try {
					let resp = await superagent.post(`${baseURL}/users/${id}/resend`)
						.set("Authorization", token);
					return true;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			}
		};
	}
};
