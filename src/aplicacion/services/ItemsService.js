const MeliService = require("../../dominio/MeliDominio");
const author = require("../../infraestructura/utils/author");

class ItemsService {
  constructor() {}

  async getItemDataById(pId) {
    try {
      const { item, description } = await MeliService.getItemDataById(pId);


      const result = {author, item, description};
      
      return result;
    } catch (pError) {
      throw pError;
    }
  }

  async getItemsDataByQuery(q){
    try {
        const queryResult = await MeliService.getItemsDataByQuery(q);

    
        const { filters, results } = queryResult;
        
        const categories = filters[0]?.values[0]?.path_from_root.map((category) => category.name) || [];
        
        const items = await Promise.all(
          results.map(async (item) => {
            const currency = await MeliService.getCurrencyById(item.currency_id);
        
            return {
              id: item.id,
              title: item.title,
              price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: currency.decimal_places,
              },
              picture: item.thumbnail,
              condition: item.condition,
              free_shipping: item.shipping.free_shipping,
            };
          })
        );
        
        const result = {author,categories,items};
        
        return result;
    } catch (pError) {
      console.error(pError);
    }
  };
  
}

module.exports = new ItemsService();
