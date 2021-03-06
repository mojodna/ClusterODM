/**
 *  ClusterODM - A reverse proxy, load balancer and task tracker for NodeODM
 *  Copyright (C) 2018-present MasseranoLabs LLC
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as
 *  published by the Free Software Foundation, either version 3 of the
 *  License, or (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const logger = require('./logger');

let cloudProvider = null;

module.exports = {
    initialize: function(providerName){
        providerName = providerName[0].toUpperCase() + providerName.slice(1, providerName.length);
        try{
            cloudProvider = new (require('./providers/' + providerName + 'CloudProvider.js'))();
        }catch(e){
            logger.error(`Invalid cloud provider: ${providerName}. ${e}`);
            process.exit(1);
        }
        return cloudProvider;
    },

    get: function(){
        return cloudProvider;
    }
};