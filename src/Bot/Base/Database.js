/**
 * Created by Sam on 15/04/2017.
 */
'use strict';

const {Model} = require('objection');
const Knex    = require('knex');
require('dotenv').config();

class Database {

	constructor()
	{
		// Initialize knex.
		this._knex = Knex({
			client           : 'mysql',
			useNullAsDefault : true,
			connection       : {
				database : process.env.DB_NAME,
				port     : process.env.DB_PORT,
				user     : process.env.DB_USER,
				password : process.env.DB_PASS,
				host     : process.env.DB_HOST
			}
		});

		// Give the knex object to objection.
		Model.knex(this._knex);
	}

	get knex()
	{
		return this._knex;
	}

}

module.exports = new Database;