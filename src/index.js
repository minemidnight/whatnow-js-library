const baseURL = "https://whatnowapp.net/api/";
const superagent = require("superagent");

module.exports = {
	parties: async token => {
		if(!token) throw new Error("No token provided");

		return {
			get: async options => {
				if(typeof options === "object") {
					let data = Object.assign({ limit: 20, offset: 0, minprice: 0, maxprice: 100, premium: false }, options);
					try {
						let { body } = await superagent.get(`${baseURL}/parties`)
							.set("Authorization", token)
							.query(data);
						return body;
					} catch(err) {
						let error = new Error(err.response.message || err.message);
						error.responseCode = err.status;
						if(err.response && err.response.code) error.jsonCode = err.response.code;
						throw error;
					}
				} else {
					let id = options;

					try {
						let { body } = await superagent.get(`${baseURL}/parties/${id}`)
							.set("Authorization", token);
						return body;
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
					let { body } = await superagent.post(`${baseURL}/parties`)
						.set("Authorization", token)
						.send(data);
					return body;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			modify: async (id, data) => {
				try {
					let { body } = await superagent.patch(`${baseURL}/parties/${id}`)
						.set("Authorization", token)
						.send(data);
					return body;
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
	users: async token => {
		if(!token) throw new Error("No token provided");

		return {
			get: async id => {
				try {
					let { body } = await superagent.get(`${baseURL}/users/${id}`)
						.set("Authorization", token);
					return body;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			modify: async (id, data) => {
				try {
					let { body } = await superagent.patch(`${baseURL}/users/${id}`)
						.set("Authorization", token)
						.send(data);
					return body;
				} catch(err) {
					let error = new Error(err.response.message || err.message);
					error.responseCode = err.status;
					if(err.response && err.response.code) error.jsonCode = err.response.code;
					throw error;
				}
			},
			delete: async id => {
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
			getParties: async id => {
				try {
					let { body } = await superagent.get(`${baseURL}/users/${id}/parties`)
						.set("Authorization", token);
					return body;
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
