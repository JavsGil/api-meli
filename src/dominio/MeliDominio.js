const axiosInstance = require('../infraestructura/api/axiosIntance');

class MeliService {
    constructor() {
        this.instance = axiosInstance;
    }

    async getItemDataById(pId) {
        try {
          const itemPromise = this.instance.get(`items/${pId}`);
          const descriptionPromise = this.instance.get(`items/${pId}/description`);
      
          const [itemResponse, descriptionResponse] = await Promise.all([
            itemPromise,
            descriptionPromise
          ]);
      
          const item = itemResponse.data;
          const description = descriptionResponse.data;
      
          return { item, description };
        } catch (error) {
          throw error;
        }
      }

    async getCurrencyById(pCurrencyId) {
        try {
            const { data } = await this.instance.get(`currencies/${pCurrencyId}`);

            return data;
        }catch (pError) {
            throw pError
        }
    }

    async getItemsDataByQuery(q, limit = 5) {
        try {
          const { data: queryResult } = await this.instance.get(`/sites/MLA/search?q=${q}`, {
            params: {
                limit: limit
            }
        });

        return queryResult
        } catch (pError) {
          throw pError;
        }
      }
}

module.exports = new MeliService();
